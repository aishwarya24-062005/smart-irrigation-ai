from datetime import datetime, timedelta
import pandas as pd


# Create irrigation schedule
def create_schedule(field_name, crop_type, irrigation_need, water_litres):
    start_time = datetime.now() + timedelta(hours=1)

    schedule = {
        "Field": field_name,
        "Crop": crop_type,
        "Irrigation_Need": irrigation_need,
        "Water_Required_Litres": water_litres,
        "Recommended_Time": start_time.strftime("%Y-%m-%d %H:%M")
    }

    return schedule


# Get recommended time slot
def get_time_slot(irrigation_need):
    if irrigation_need == "High":
        return "06:00 AM - 07:00 AM"
    elif irrigation_need == "Medium":
        return "06:00 AM - 06:30 AM"
    else:
        return "No Irrigation Required"


# Basic over-watering prevention
def prevent_overwatering(rainfall, previous_irrigation):
    if rainfall > 10:
        return "Irrigation Reduced - Rain Expected"

    elif previous_irrigation > 20:
        return "Irrigation Reduced - Previous Irrigation Was High"

    else:
        return "Normal Irrigation Allowed"


# Sample field details
field_name = "Field-01"
crop_type = "Rice"
irrigation_need = "Medium"
water_litres = 35

rainfall = 5
previous_irrigation = 10


# Create schedule
schedule = create_schedule(
    field_name,
    crop_type,
    irrigation_need,
    water_litres
)


# Get time slot
time_slot = get_time_slot(irrigation_need)


# Check over-watering
overwatering_decision = prevent_overwatering(
    rainfall,
    previous_irrigation
)


# Add time slot and prevention decision
schedule["Time_Slot"] = time_slot
schedule["Overwatering_Prevention"] = overwatering_decision


# Display result
print("\n================================")
print("     IRRIGATION SCHEDULE")
print("================================")

for key, value in schedule.items():
    print(f"{key}: {value}")


# Store schedule
schedule_df = pd.DataFrame([schedule])

schedule_df.to_csv(
    "irrigation_schedule.csv",
    index=False
)

print("\nIrrigation schedule saved successfully!")
print("File: irrigation_schedule.csv")