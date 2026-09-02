from weather import get_weather
# Example location
latitude = 11.0168
longitude = 76.9558
try:
    weather = get_weather(latitude, longitude)
    print("\nWeather Information")
    print("-------------------------")
    print("Latitude:", weather["latitude"])
    print("Longitude:", weather["longitude"])
    print("Temperature:", weather["temperature"], "°C")
    print("Humidity:", weather["humidity"], "%")
    print("Rainfall:", weather["rainfall"], "mm")
    print("Weather:", weather["weather"])
except Exception as e:
    print("Error:", e)