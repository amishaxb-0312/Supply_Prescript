from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib


app = FastAPI(
    title="SupplyPrescript AI",
    description="AI-powered supply chain prediction and decision optimization system",
    version="1.0.0"
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