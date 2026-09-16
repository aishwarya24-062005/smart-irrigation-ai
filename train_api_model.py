import pandas as pd
import joblib
from sklearn.ensemble import GradientBoostingClassifier

# Load training dataset
df = pd.read_csv("train_ml_dataset.csv")

# Use the same 4 features that the API receives
features = [
    "Soil_Moisture",
    "Temperature_C",
    "Humidity",
    "Rainfall_mm"
]

X = df[features]
y = df["Irrigation_Need"]

# Train model
model = GradientBoostingClassifier(
    n_estimators=100,
    learning_rate=0.1,
    max_depth=3,
    random_state=42
)

model.fit(X, y)

# Save API model
joblib.dump(model, "api_irrigation_model.pkl")

print("API model trained successfully!")
print("Features:", features)
print("Model saved as api_irrigation_model.pkl")
