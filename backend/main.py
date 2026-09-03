from fastapi import FastAPI,HTTPException
from pydantic import BaseModel
import pandas as pd
import joblib
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="SupplyPrescript AI",
    description="AI-powered supply chain prediction and decision optimization system",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load trained ML components
model = joblib.load("ml/xgboost_delay_model.pkl")
preprocessor = joblib.load("ml/preprocessor.pkl")


# -----------------------------
# Request Models
# -----------------------------

class ShipmentData(BaseModel):
    supplier: str
    product: str
    distance_km: float
    order_quantity: float
    supplier_reliability: float
    historical_delay_rate: float
    lead_time_days: float
    inventory_level: float
    supplier_capacity: float
    shipping_cost: float
    weather_risk: float
    demand_forecast: float


class OptimizationRequest(ShipmentData):
    budget: float = 20000
    max_acceptable_delay: float = 7


# -----------------------------
# Basic Endpoints
# -----------------------------

@app.get("/")
def root():
    return {
        "message": "SupplyPrescript AI API is running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


# -----------------------------
# Prediction Endpoint
# -----------------------------

@app.post("/predict")
def predict_delay(shipment: ShipmentData):

    shipment_dict = shipment.model_dump()

    shipment_df = pd.DataFrame([shipment_dict])

    shipment_processed = preprocessor.transform(
        shipment_df
    )

    delay_probability = model.predict_proba(
        shipment_processed
    )[0, 1]

    if delay_probability >= 0.70:
        risk_level = "HIGH"
    elif delay_probability >= 0.40:
        risk_level = "MEDIUM"
    else:
        risk_level = "LOW"

    return {
        "delay_probability": round(
            float(delay_probability),
            4
        ),
        "delay_percentage": round(
            float(delay_probability * 100),
            2
        ),
        "risk_level": risk_level
    }

class RecommendationRequest(BaseModel):
    order_quantity: float
    shipping_cost: float
    delay_probability: float
    budget: float = 20000
    max_acceptable_delay: float = 7
@app.post("/recommend")
def recommend_action(request: RecommendationRequest):

    shipment = {
        "order_quantity": request.order_quantity,
        "shipping_cost": request.shipping_cost,
        "delay_probability": request.delay_probability
    }

    actions = pd.DataFrame({
        "action": [
            "Air Freight",
            "Secondary Supplier",
            "Delay Product Launch"
        ],

        "cost": [
            shipment["shipping_cost"] * 1.25,
            shipment["shipping_cost"] * 1.40,
            shipment["shipping_cost"] * 0.35
        ],

        "delay_days": [
            3,
            5,
            14
        ],

        "capacity": [
            2000,
            3000,
            shipment["order_quantity"]
        ],

        "risk_reduction": [
            0.75,
            0.55,
            0.10
        ]
    })


    # Calculate remaining risk

    actions["remaining_risk"] = (
        shipment["delay_probability"]
        * (1 - actions["risk_reduction"])
    )


    # Check constraints

    actions["budget_feasible"] = (
        actions["cost"] <= request.budget
    )

    actions["delay_feasible"] = (
        actions["delay_days"] <= request.max_acceptable_delay
    )

    actions["capacity_feasible"] = (
        actions["capacity"] >= shipment["order_quantity"]
    )


    # Filter feasible actions

    feasible_actions = actions[
        actions["budget_feasible"]
        & actions["delay_feasible"]
        & actions["capacity_feasible"]
    ].copy()


    # If no action satisfies all constraints

    if feasible_actions.empty:
        raise HTTPException(
            status_code=400,
            detail="No feasible recommendation found for the given constraints."
        )


    # Calculate optimization score

    cost_weight = 0.4
    risk_weight = 0.6

    feasible_actions["score"] = (
        cost_weight
        * (feasible_actions["cost"] / request.budget)
        +
        risk_weight
        * feasible_actions["remaining_risk"]
    )


    # Sort recommendations

    recommendations = (
        feasible_actions
        .sort_values("score")
        .reset_index(drop=True)
    )


    # Best recommendation

    best_action = recommendations.iloc[0]


    return {
        "recommended_action": best_action["action"],
        "estimated_cost": round(float(best_action["cost"]), 2),
        "expected_delay_days": int(best_action["delay_days"]),
        "remaining_delay_risk": round(
            float(best_action["remaining_risk"]),
            4
        ),

        "recommendations": [
            {
                "action": row["action"],
                "cost": round(float(row["cost"]), 2),
                "delay_days": int(row["delay_days"]),
                "remaining_risk": round(
                    float(row["remaining_risk"]),
                    4
                ),
                "score": round(
                    float(row["score"]),
                    4
                )
            }

            for _, row in recommendations.iterrows()
        ]
    }
# -----------------------------
# Optimization Logic
# -----------------------------

def generate_recommendations(
    shipment,
    delay_probability,
    budget=20000,
    max_acceptable_delay=7
):

    actions = pd.DataFrame({
        "action": [
            "Air Freight",
            "Secondary Supplier",
            "Delay Product Launch"
        ],

        "cost": [
            shipment["shipping_cost"] * 1.25,
            shipment["shipping_cost"] * 1.40,
            shipment["shipping_cost"] * 0.35
        ],

        "delay_days": [
            3,
            5,
            14
        ],

        "capacity": [
            2000,
            3000,
            shipment["order_quantity"]
        ],

        "risk_reduction": [
            0.75,
            0.55,
            0.10
        ]
    })

    # Calculate remaining delay risk
    actions["remaining_risk"] = (
        delay_probability
        * (1 - actions["risk_reduction"])
    )

    # Business constraints
    actions["budget_feasible"] = (
        actions["cost"] <= budget
    )

    actions["delay_feasible"] = (
        actions["delay_days"] <= max_acceptable_delay
    )

    actions["capacity_feasible"] = (
        actions["capacity"] >= shipment["order_quantity"]
    )

    # Keep only feasible actions
    feasible_actions = actions[
        actions["budget_feasible"]
        & actions["delay_feasible"]
        & actions["capacity_feasible"]
    ].copy()

    if feasible_actions.empty:
        return []

    # Decision score
    cost_weight = 0.4
    risk_weight = 0.6

    feasible_actions["score"] = (
        cost_weight
        * (feasible_actions["cost"] / budget)
        +
        risk_weight
        * feasible_actions["remaining_risk"]
    )

    # Rank recommendations
    recommendations = (
        feasible_actions
        .sort_values("score")
        .reset_index(drop=True)
        .head(3)
    )

    result = []

    for _, row in recommendations.iterrows():

        result.append({
            "action": row["action"],
            "cost": round(
                float(row["cost"]),
                2
            ),
            "expected_delay_days": int(
                row["delay_days"]
            ),
            "remaining_delay_risk": round(
                float(row["remaining_risk"]) * 100,
                2
            ),
            "score": round(
                float(row["score"]),
                4
            )
        })

    return result


# -----------------------------
# Optimization Endpoint
# -----------------------------

@app.post("/optimize")
def optimize_shipment(
    request: OptimizationRequest
):

    shipment_dict = request.model_dump()

    budget = shipment_dict.pop("budget")

    max_acceptable_delay = shipment_dict.pop(
        "max_acceptable_delay"
    )

    shipment_df = pd.DataFrame(
        [shipment_dict]
    )

    shipment_processed = preprocessor.transform(
        shipment_df
    )

    delay_probability = model.predict_proba(
        shipment_processed
    )[0, 1]

    recommendations = generate_recommendations(
        shipment=shipment_dict,
        delay_probability=delay_probability,
        budget=budget,
        max_acceptable_delay=max_acceptable_delay
    )

    return {
        "delay_probability": round(
            float(delay_probability),
            4
        ),

        "delay_percentage": round(
            float(delay_probability * 100),
            2
        ),

        "recommendations": recommendations
    }

from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.orm import declarative_base, sessionmaker

DATABASE_URL = "sqlite:///./supplyprescript.db"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()

class Decision(Base):
    __tablename__ = "decisions"

    id = Column(Integer, primary_key=True, index=True)

    supplier = Column(String)
    product = Column(String)

    delay_probability = Column(Float)

    selected_action = Column(String)

    action_cost = Column(Float)

    expected_delay_days = Column(Integer)

    remaining_delay_risk = Column(Float)
    actual_delay_days = Column(Integer, nullable=True)
    actual_cost = Column(Float, nullable=True)
    outcome_recorded = Column(Integer, default=0)
Base.metadata.create_all(bind=engine)

class DecisionRequest(BaseModel):
    supplier: str
    product: str

    delay_probability: float

    selected_action: str

    action_cost: float

    expected_delay_days: int

    remaining_delay_risk: float


@app.post("/decision")
def save_decision(decision: DecisionRequest):

    db = SessionLocal()

    new_decision = Decision(
        supplier=decision.supplier,
        product=decision.product,
        delay_probability=decision.delay_probability,
        selected_action=decision.selected_action,
        action_cost=decision.action_cost,
        expected_delay_days=decision.expected_delay_days,
        remaining_delay_risk=decision.remaining_delay_risk
    )

    db.add(new_decision)
    db.commit()
    db.refresh(new_decision)
    db.close()

    return {
        "message": "Decision saved successfully",
        "decision_id": new_decision.id
    }

@app.get("/decisions")
def get_decisions():

    db = SessionLocal()

    decisions = (
        db.query(Decision)
        .order_by(Decision.id.desc())
        .all()
    )

    db.close()

    return [
        {
            "id": decision.id,
            "supplier": decision.supplier,
            "product": decision.product,
            "delay_probability": decision.delay_probability,
            "selected_action": decision.selected_action,
            "action_cost": decision.action_cost,
            "expected_delay_days": decision.expected_delay_days,
            "remaining_delay_risk": decision.remaining_delay_risk
        }
        for decision in decisions
    ]

class OutcomeRequest(BaseModel):
    actual_delay_days: int
    actual_cost: float

@app.post("/decision/{decision_id}/outcome")
def record_outcome(
    decision_id: int,
    outcome: OutcomeRequest
):

    db = SessionLocal()

    decision = (
        db.query(Decision)
        .filter(Decision.id == decision_id)
        .first()
    )

    if decision is None:
        db.close()

        raise HTTPException(
        status_code=404,
        detail="Decision not found"
    )

    decision.actual_delay_days = (
        outcome.actual_delay_days
    )

    decision.actual_cost = (
        outcome.actual_cost
    )

    decision.outcome_recorded = 1

    db.commit()
    db.refresh(decision)
    db.close()

    return {
        "message": "Outcome recorded successfully",
        "decision_id": decision.id,
        "actual_delay_days": decision.actual_delay_days,
        "actual_cost": decision.actual_cost
    }

@app.get("/decision/{decision_id}/performance")
def get_performance(decision_id: int):

    db = SessionLocal()

    decision = (
        db.query(Decision)
        .filter(Decision.id == decision_id)
        .first()
    )

    if decision is None:
        db.close()

        raise HTTPException(
        status_code=404,
        detail="Decision not found"
    )

    if decision.outcome_recorded == 0:
        db.close()

        raise HTTPException(
        status_code=400,
        detail="Outcome has not been recorded yet"
    )

    cost_difference = (
        decision.action_cost
        - decision.actual_cost
    )

    delay_difference = (
        decision.expected_delay_days
        - decision.actual_delay_days
    )

    if decision.actual_delay_days <= decision.expected_delay_days:
        outcome_status = "Better than expected"
    else:
        outcome_status = "Worse than expected"

    db.close()

    return {
        "decision_id": decision.id,
        "selected_action": decision.selected_action,

        "predicted_delay_risk": round(
            decision.delay_probability * 100,
            2
        ),

        "expected_delay_days": (
            decision.expected_delay_days
        ),

        "actual_delay_days": (
            decision.actual_delay_days
        ),

        "expected_action_cost": round(
            decision.action_cost,
            2
        ),

        "actual_cost": round(
            decision.actual_cost,
            2
        ),

        "cost_difference": round(
            cost_difference,
            2
        ),

        "delay_difference_days": (
            delay_difference
        ),

        "outcome_status": outcome_status
    }

