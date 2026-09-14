from datetime import datetime, timedelta


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


# Test
schedule = create_schedule(
    "Field-01",
    "Rice",
    "Medium",
    35
)

print("\nIRRIGATION SCHEDULE")
for key, value in schedule.items():
    print(f"{key}: {value}")