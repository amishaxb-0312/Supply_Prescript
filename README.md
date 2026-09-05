# SupplyPrescript AI

AI-powered supply chain risk prediction and decision optimization system.

## Overview

SupplyPrescript AI helps supply chain managers identify shipment delay risks and choose suitable mitigation strategies.

The system combines machine learning with optimization logic to:

- Predict shipment delay probability
- Classify shipment risk levels
- Recommend mitigation actions
- Compare cost, delay, capacity, and risk
- Save supply chain decisions
- Track actual outcomes
- Evaluate decision performance

## Features

### 1. Shipment Delay Prediction

The system uses an XGBoost machine learning model to predict the probability of shipment delay based on factors such as:

- Supplier reliability
- Historical delay rate
- Lead time
- Inventory level
- Supplier capacity
- Shipping cost
- Weather risk
- Demand forecast
- Order quantity
- Shipment distance

### 2. Decision Recommendations

The optimization module evaluates different mitigation strategies:

- Air Freight
- Secondary Supplier
- Delay Product Launch

Recommendations consider:

- Available budget
- Expected delay
- Supplier/product capacity
- Delay risk reduction
- Action cost

### 3. Decision History

Users can save recommended decisions and review previous supply chain decisions.

### 4. Performance Tracking

Actual delay and cost can be recorded after a decision is implemented.

The system compares:

- Predicted delay risk
- Expected delay
- Actual delay
- Expected action cost
- Actual cost

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Router

### Backend

- Python
- FastAPI
- SQLAlchemy
- SQLite

### Machine Learning

- XGBoost
- Scikit-learn
- Pandas
- NumPy
- Joblib

### Optimization

- SciPy

## Project Structure

```text
SupplyPrescript/
│
├── backend/
│   ├── main.py
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   └── pages/
│   └── package.json
│
├── ml/
│   ├── xgboost_delay_model.pkl
│   └── preprocessor.pkl
│
├── data/
├── notebooks/
├── requirements.txt
├── .gitignore
└── README.md