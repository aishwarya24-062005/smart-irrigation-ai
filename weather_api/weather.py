import streamlit as st
import os
import requests
from dotenv import load_dotenv

# Load .env file
load_dotenv()

API_KEY = os.getenv("OPENWEATHER_API_KEY")

BASE_URL = "https://api.openweathermap.org/data/2.5/weather"


def get_weather(latitude, longitude):

    params = {
        "lat": latitude,
        "lon": longitude,
        "appid": API_KEY,
        "units": "metric"
    }

    response = requests.get(BASE_URL, params=params)

    if response.status_code != 200:
        return None

    data = response.json()

    return {
        "temperature": data["main"]["temp"],
        "humidity": data["main"]["humidity"],
        "rainfall": data.get("rain", {}).get("1h", 0),
        "weather": data["weather"][0]["description"]
    }


# -----------------------------
# WEB PAGE
# -----------------------------

st.set_page_config(
    page_title="Smart Irrigation System",
    page_icon="🌱",
    layout="wide"
)

st.title("🌱 AI-Powered Smart Irrigation System")
st.subheader("🌦️ Weather Information")

# Chennai coordinates
latitude = 13.0827
longitude = 80.2707

weather = get_weather(latitude, longitude)

if weather:

    col1, col2, col3, col4 = st.columns(4)

    with col1:
        st.metric(
            "🌡️ Temperature",
            f"{weather['temperature']} °C"
        )

    with col2:
        st.metric(
            "💧 Humidity",
            f"{weather['humidity']} %"
        )

    with col3:
        st.metric(
            "🌧️ Rainfall",
            f"{weather['rainfall']} mm"
        )

    with col4:
        st.metric(
            "☁️ Weather",
            weather["weather"].title()
        )

    st.divider()

    st.write("### 📍 Field Location")

    st.write(
        f"Latitude: **{latitude}**  \n"
        f"Longitude: **{longitude}**"
    )

else:
    st.error("Unable to retrieve weather data.")