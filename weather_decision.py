def weather_adjustment(irrigation_need, rainfall, rain_probability):

    if rainfall > 10 or rain_probability >= 70:
        return "No Irrigation - Rain Expected"

    if irrigation_need == "High":
        return "Irrigation Required"

    if irrigation_need == "Medium":
        return "Moderate Irrigation Required"

    return "Low Irrigation Required"


# Test
result = weather_adjustment("Medium", 5, 40)

print("Weather-based Decision:", result)
