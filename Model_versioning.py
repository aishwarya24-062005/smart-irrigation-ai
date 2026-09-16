import joblib
from datetime import datetime
import os

# Model file
model_file = "best_irrigation_model.pkl"

# Check model exists
if not os.path.exists(model_file):
    print("Model file not found!")
else:
    # Create version number
    version = "v1.0"

    # Create versioned filename
    versioned_file = f"best_irrigation_model_{version}.pkl"

    # Load model
    model = joblib.load(model_file)

    # Save versioned model
    joblib.dump(model, versioned_file)

    print("================================")
    print("MODEL VERSIONING")
    print("================================")
    print("Model:", model_file)
    print("Version:", version)
    print("Versioned Model:", versioned_file)
    print("Created:", datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    print("Model version saved successfully!")
