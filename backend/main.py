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


# Input schema
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