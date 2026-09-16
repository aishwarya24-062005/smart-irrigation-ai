from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import joblib

# ==================================================
# FASTAPI APP
# ==================================================

app = FastAPI(
    title="Smart Irrigation API",
    version="1.0.0",
    description="AI-based Smart Irrigation Prediction System"
)


# ==================================================
# LOAD TRAINED MODEL
# ==================================================

try:
    model = joblib.load("best_irrigation_model.pkl")
    print("Model loaded successfully!")

except Exception as e:
    model = None
    print("Error loading model:", e)


# ==================================================
# INPUT DATA
# ==================================================

class IrrigationInput(BaseModel):

    soil_moisture: float
    temperature: float
    humidity: float
    rainfall: float


# ==================================================
# HOME
# ==================================================

@app.get("/")
def home():

    return {
        "message": "Smart Irrigation API is running successfully!"
    }


# ==================================================
# PREDICTION
# ==================================================

@app.post("/predict")
def predict(data: IrrigationInput):

    if model is None:

        raise HTTPException(
            status_code=500,
            detail="Model is not loaded."
        )

    try:

        # --------------------------------------------------
        # Get the exact features used during model training
        # --------------------------------------------------

        if not hasattr(model, "feature_names_in_"):

            raise HTTPException(
                status_code=500,
                detail="Model does not contain feature names."
            )

        feature_names = list(model.feature_names_in_)

        # --------------------------------------------------
        # Create dataframe with all 35 model features
        # --------------------------------------------------

        input_data = pd.DataFrame(
            0.0,
            index=[0],
            columns=feature_names
        )

        # --------------------------------------------------
        # Insert the four values received from API
        # --------------------------------------------------

        if "Soil_Moisture" in input_data.columns:
            input_data["Soil_Moisture"] = data.soil_moisture

        if "Temperature_C" in input_data.columns:
            input_data["Temperature_C"] = data.temperature

        if "Humidity" in input_data.columns:
            input_data["Humidity"] = data.humidity

        if "Rainfall_mm" in input_data.columns:
            input_data["Rainfall_mm"] = data.rainfall

        # --------------------------------------------------
        # Prediction
        # --------------------------------------------------

        prediction = model.predict(input_data)[0]

        # --------------------------------------------------
        # Convert prediction to irrigation level
        # --------------------------------------------------

        irrigation_levels = {
            0: "High",
            1: "Low",
            2: "Medium"
        }

        irrigation_need = irrigation_levels.get(
            int(prediction),
            "Unknown"
        )

        # --------------------------------------------------
        # Prototype water recommendation
        # --------------------------------------------------

        water_quantity = {
            "High": 50,
            "Medium": 35,
            "Low": 20
        }

        irrigation_duration = {
            "High": 5,
            "Medium": 3,
            "Low": 2
        }

        water_required = water_quantity[irrigation_need]

        duration = irrigation_duration[irrigation_need]

        # --------------------------------------------------
        # Return result
        # --------------------------------------------------

        return {

            "irrigation_need": irrigation_need,

            "water_required_litres": water_required,

            "irrigation_duration_minutes": duration,

            "input_data": {

                "soil_moisture": data.soil_moisture,

                "temperature": data.temperature,

                "humidity": data.humidity,

                "rainfall": data.rainfall
            }
        }

    except HTTPException:
        raise

    except Exception as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )
