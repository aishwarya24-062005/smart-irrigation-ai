import joblib
import pandas as pd
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI(title="Smart Irrigation API")


# -------------------------------
# Input Data Model
# -------------------------------
class IrrigationInput(BaseModel):
    soil_moisture: float
    temperature: float
    humidity: float
    rainfall: float


# -------------------------------
# Load ML Model
# -------------------------------
try:
    model = joblib.load("api_irrigation_model.pkl")
    print("API model loaded successfully!")
except Exception as e:
    model = None
    print("Error loading model:", e)


# -------------------------------
# Home Endpoint
# -------------------------------
@app.get("/")
def home():
    return {
        "message": "Smart Irrigation API is running",
        "status": "success"
    }


# -------------------------------
# Prediction Endpoint
# -------------------------------
@app.post("/predict")
def predict(data: IrrigationInput):

    if model is None:
        raise HTTPException(
            status_code=500,
            detail="Model could not be loaded"
        )

    try:

        # Create input dataframe
        input_data = pd.DataFrame([{
            "Soil_Moisture": data.soil_moisture,
            "Temperature_C": data.temperature,
            "Humidity": data.humidity,
            "Rainfall_mm": data.rainfall
        }])

        # Prediction
        prediction = model.predict(input_data)[0]

        # Convert prediction number to label
        labels = {
            0: "High",
            1: "Low",
            2: "Medium"
        }

        irrigation_need = labels.get(
            int(prediction),
            "Unknown"
        )

        # Prototype water quantity
        water_quantity = {
            "High": 50,
            "Medium": 35,
            "Low": 20
        }

        water_required = water_quantity[irrigation_need]

        # Prototype duration
        duration = water_required // 10

        return {
            "status": "success",
            "irrigation_need": irrigation_need,
            "water_required_litres": water_required,
            "irrigation_duration_minutes": duration
        }

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )