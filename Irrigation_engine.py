import pandas as pd
import joblib
# Load trained model
model = joblib.load("best_irrigation_model.pkl")
# Load test data
data = pd.read_csv("test_ml_dataset.csv")
# Separate features
X = data.drop(columns="Irrigation_Need")
# Predict irrigation need
prediction = model.predict(X.iloc[[0]])[0]
# Target mapping
need = {
    0: "High",
    1: "Low",
    2: "Medium"
}
print("Irrigation Need:", need[prediction])
# -----------------------------
# Weather consideration
# -----------------------------
rainfall = X.iloc[0]["Rainfall_mm"]
if rainfall > 10:
    print("Weather Decision: Rain expected - Reduce irrigation")
else:
    print("Weather Decision: Normal weather")
# -----------------------------
# Crop Type consideration
# -----------------------------
crop_columns = [
    col for col in X.columns
    if col.startswith("Crop_Type_")
]
if crop_columns:
    crop_values = X.iloc[0][crop_columns]
    crop_column = crop_values.idxmax()
    crop_type = crop_column.replace("Crop_Type_", "")
    print("Crop Type:", crop_type)
else:
    print("Crop Type: Not available")
# -----------------------------
# Crop Growth Stage consideration
# -----------------------------
stage_columns = [
    col for col in X.columns
    if col.startswith("Crop_Growth_Stage_")
]
if stage_columns:
    stage_values = X.iloc[0][stage_columns]
stage_column = stage_values.idxmax()
growth_stage = stage_column.replace("Crop_Growth_Stage_", "")
print("Growth Stage:", growth_stage)
# -----------------------------
# Previous irrigation history
# -----------------------------
previous_irrigation = X.iloc[0]["Previous_Irrigation_mm"]

print("Previous Irrigation:", previous_irrigation, "mm")

if previous_irrigation > 20:
    print("History Decision: Previous irrigation was high - Reduce irrigation")
else:
    print("History Decision: Previous irrigation was normal")
    # -----------------------------
# Field-specific irrigation schedule
# -----------------------------
field_area = X.iloc[0]["Field_Area_hectare"]
# Prototype water requirement per hectare
water_rate = {
    0: 50,   # High
    1: 20,   # Low
    2: 35    # Medium
}
water_per_hectare = water_rate[prediction]
total_water = field_area * water_per_hectare
if prediction == 0:
    schedule = "Morning and evening"
elif prediction == 2:
    schedule = "Morning"
else:
    schedule = "No irrigation / monitor"
print("Field Area:", field_area, "hectare")
print("Recommended Water:", round(total_water, 2), "litres")
print("Irrigation Schedule:", schedule)
# -----------------------------
# Time-slotted irrigation recommendation
# -----------------------------
if prediction == 0:
    time_slot = "06:00 AM - 07:00 AM"
elif prediction == 2:
    time_slot = "06:00 AM - 06:30 AM"
else:
    time_slot = "No irrigation required"
print("Recommended Time Slot:", time_slot)
# -----------------------------
# Over-watering prevention
# -----------------------------
if rainfall > 10 or previous_irrigation > 20:
    print("Over-watering Prevention: Irrigation reduced to prevent over-watering")
else:
    print("Over-watering Prevention: Normal irrigation allowed")
# -----------------------------
# Store irrigation schedule
# -----------------------------
schedule_data = {
    "Irrigation_Need": [need[prediction]],
    "Rainfall_mm": [rainfall],
    "Previous_Irrigation_mm": [previous_irrigation],
    "Field_Area_hectare": [field_area],
    "Recommended_Water_Litres": [round(total_water, 2)],
    "Time_Slot": [time_slot]
}
schedule_df = pd.DataFrame(schedule_data)
schedule_df.to_csv("irrigation_schedule.csv", index=False)
print("Irrigation schedule saved successfully!")
