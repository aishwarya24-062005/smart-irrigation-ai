"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] =
    useState(true);

  const [soilAlert, setSoilAlert] = useState(true);
  const [rainAlert, setRainAlert] = useState(true);
  const [irrigationAlert, setIrrigationAlert] =
    useState(true);
  const [sensorAlert, setSensorAlert] = useState(true);

  const [language, setLanguage] = useState("English");
  const [message, setMessage] = useState("");

  const savePreferences = () => {
    setMessage("✅ Settings saved successfully");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <main className="app">

      {/* HEADER */}
      <header className="header">
        <div>
          <p className="small-text">SMART FARM</p>
          <h1>Settings ⚙️</h1>
        </div>

        <button
          className="icon-button"
          onClick={() =>
            (window.location.href = "/")
          }
        >
          🏠
        </button>
      </header>


      {/* PROFILE */}
      <div className="section-title">
        <h2>Farmer Profile</h2>
      </div>

      <section className="welcome-card">

        <div>
          <p>Farmer</p>

          <h2>
            Smart Farmer 👨‍🌾
          </h2>

          <p>
            Green Field • Rice
          </p>
        </div>

        <div className="plant-icon">
          👨‍🌾
        </div>

      </section>


      {/* LANGUAGE */}
      <div className="section-title">
        <h2>Language</h2>
      </div>

      <section className="weather-card">

        <div className="weather-icon">
          🌐
        </div>

        <div style={{ flex: 1 }}>
          <h2>
            App Language
          </h2>

          <p>
            Select your preferred language
          </p>
        </div>

      </section>

      <select
        value={language}
        onChange={(e) =>
          setLanguage(e.target.value)
        }
        style={{
          width: "100%",
          padding: "14px",
          marginTop: "10px",
          borderRadius: "12px",
          border: "1px solid #33443b",
          background: "#18251f",
          color: "#ffffff",
          fontSize: "15px",
        }}
      >
        <option value="English">
          English
        </option>

        <option value="Hindi">
          हिंदी (Hindi)
        </option>

        <option value="Kannada">
          ಕನ್ನಡ (Kannada)
        </option>

        <option value="Tamil">
          தமிழ் (Tamil)
        </option>
      </select>


      {/* ALERT SOUND */}
      <div className="section-title">
        <h2>Alert Sound</h2>
      </div>

      <section className="weather-card">

        <div className="weather-icon">
          {soundEnabled
            ? "🔊"
            : "🔇"}
        </div>

        <div style={{ flex: 1 }}>
          <h2>
            Alert Sound
          </h2>

          <p>
            Play sound when an alert occurs
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() =>
            setSoundEnabled(
              !soundEnabled
            )
          }
          style={{
            width: "auto",
            padding: "10px 16px",
            marginTop: 0,
          }}
        >
          {soundEnabled
            ? "ON"
            : "OFF"}
        </button>

      </section>


      {/* NOTIFICATIONS */}
      <div className="section-title">
        <h2>Notifications</h2>
      </div>

      <section className="weather-card">

        <div className="weather-icon">
          🔔
        </div>

        <div style={{ flex: 1 }}>
          <h2>
            Notifications
          </h2>

          <p>
            Receive irrigation alerts
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() =>
            setNotificationsEnabled(
              !notificationsEnabled
            )
          }
          style={{
            width: "auto",
            padding: "10px 16px",
            marginTop: 0,
          }}
        >
          {notificationsEnabled
            ? "ON"
            : "OFF"}
        </button>

      </section>


      {/* ALERT PREFERENCES */}
      <div className="section-title">
        <h2>Alert Preferences</h2>
      </div>


      {/* LOW SOIL MOISTURE */}
      <section className="alert-card">

        <div className="alert-icon">
          💧
        </div>

        <div style={{ flex: 1 }}>
          <h3>
            Low Soil Moisture
          </h3>

          <p>
            Alert when soil moisture is low
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() =>
            setSoilAlert(!soilAlert)
          }
          style={{
            width: "auto",
            padding: "8px 12px",
            marginTop: 0,
          }}
        >
          {soilAlert
            ? "ON"
            : "OFF"}
        </button>

      </section>


      {/* HEAVY RAIN */}
      <section
        className="alert-card"
        style={{
          marginTop: "12px",
        }}
      >

        <div className="alert-icon">
          🌧️
        </div>

        <div style={{ flex: 1 }}>
          <h3>
            Heavy Rainfall
          </h3>

          <p>
            Alert during heavy rainfall
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() =>
            setRainAlert(!rainAlert)
          }
          style={{
            width: "auto",
            padding: "8px 12px",
            marginTop: 0,
          }}
        >
          {rainAlert
            ? "ON"
            : "OFF"}
        </button>

      </section>


      {/* IRRIGATION */}
      <section
        className="alert-card"
        style={{
          marginTop: "12px",
        }}
      >

        <div className="alert-icon">
          🚨
        </div>

        <div style={{ flex: 1 }}>
          <h3>
            Irrigation Reminder
          </h3>

          <p>
            Alert when irrigation is required
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() =>
            setIrrigationAlert(
              !irrigationAlert
            )
          }
          style={{
            width: "auto",
            padding: "8px 12px",
            marginTop: 0,
          }}
        >
          {irrigationAlert
            ? "ON"
            : "OFF"}
        </button>

      </section>


      {/* SENSOR FAILURE */}
      <section
        className="alert-card"
        style={{
          marginTop: "12px",
        }}
      >

        <div className="alert-icon">
          📡
        </div>

        <div style={{ flex: 1 }}>
          <h3>
            Sensor Failure
          </h3>

          <p>
            Alert when sensor data is missing
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() =>
            setSensorAlert(
              !sensorAlert
            )
          }
          style={{
            width: "auto",
            padding: "8px 12px",
            marginTop: 0,
          }}
        >
          {sensorAlert
            ? "ON"
            : "OFF"}
        </button>

      </section>


      {/* SAVE */}
      {message && (
        <div className="notification">
          {message}
        </div>
      )}

      <button
        className="primary-button"
        onClick={savePreferences}
        style={{
          marginTop: "20px",
        }}
      >
        💾 Save Preferences
      </button>


      {/* ALERT PAGE */}
      <button
        className="text-button"
        onClick={() =>
          (window.location.href =
            "/alerts")
        }
        style={{
          display: "block",
          margin: "20px auto",
        }}
      >
        🔔 View All Alerts
      </button>


      {/* HOME */}
      <button
        className="text-button"
        onClick={() =>
          (window.location.href = "/")
        }
        style={{
          display: "block",
          margin: "0 auto 90px",
        }}
      >
        ← Back to Home
      </button>


      {/* BOTTOM NAVIGATION */}
      <nav className="bottom-nav">

        <button
          onClick={() =>
            (window.location.href = "/")
          }
        >
          🏠
          <span>Home</span>
        </button>

        <button
          onClick={() =>
            (window.location.href =
              "/irrigation")
          }
        >
          💧
          <span>Irrigation</span>
        </button>

        <button
          onClick={() =>
            (window.location.href =
              "/field")
          }
        >
          📊
          <span>Field</span>
        </button>

        <button
          onClick={() =>
            (window.location.href =
              "/alerts")
          }
        >
          🔔
          <span>Alerts</span>
        </button>

        <button className="active">
          ⚙️
          <span>Settings</span>
        </button>

      </nav>

    </main>
  );
}