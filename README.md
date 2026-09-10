# SupplyPrescript AI 🚚📊

An AI-powered supply chain decision intelligence system that predicts shipment delays, assesses risk, and recommends optimized mitigation strategies.

SupplyPrescript combines Machine Learning, Optimization, FastAPI, React, and SQL to help supply chain managers make data-driven decisions before shipment delays become costly problems.

---

## 🚀 Overview

Supply chain delays can lead to increased transportation costs, inventory shortages, customer dissatisfaction, and operational losses.

SupplyPrescript addresses this problem through a complete decision-support pipeline:

**Shipment Data → Delay Prediction → Risk Assessment → Action Optimization → Decision Tracking → Performance Analysis**

The system uses an XGBoost machine learning model to estimate shipment delay probability and an optimization engine to recommend the most suitable mitigation action based on cost, delay, capacity, and risk constraints.

---

## ✨ Key Features

### 🤖 AI-Powered Delay Prediction
- Predicts the probability of shipment delay.
- Uses an XGBoost classification model.
- Considers shipment, supplier, inventory, demand, weather, and transportation-related factors.

### ⚠️ Risk Assessment
- Converts prediction results into actionable risk levels.
- Displays estimated delay probability.
- Helps identify potentially problematic shipments.

### 🧠 Decision Optimization
Evaluates possible mitigation strategies such as:

- ✈️ Air Freight
- 🏭 Secondary Supplier
- 📅 Delay Product Launch

Recommendations consider:

- Action cost
- Expected delay
- Remaining delay risk
- Budget constraints
- Capacity constraints
- Maximum acceptable delay

### 💾 Decision Tracking
- Saves selected decisions to a database.
- Maintains decision history.
- Records actual outcomes after shipment completion.

### 📈 Performance Analysis
Compares:

- Predicted vs actual delay
- Expected vs actual cost
- Cost difference
- Delay difference
- Overall decision outcome

This allows the system to evaluate how effective its recommendations were.

---

## 🏗️ System Architecture

```text
                    ┌─────────────────────┐
                    │     React Frontend  │
                    │   Dashboard & UI    │
                    └──────────┬──────────┘
                               │
                               │ REST API
                               ▼
                    ┌─────────────────────┐
                    │     FastAPI         │
                    │      Backend        │
                    └──────────┬──────────┘
                               │
                  ┌────────────┴────────────┐
                  │                         │
                  ▼                         ▼
        ┌──────────────────┐      ┌──────────────────┐
        │ XGBoost Model    │      │ Optimization     │
        │ Delay Prediction  │      │ Engine           │
        └──────────────────┘      └──────────────────┘
                  │                         │
                  └────────────┬────────────┘
                               ▼
                    ┌─────────────────────┐
                    │    SQLite Database  │
                    │  Decision History   │
                    └─────────────────────┘