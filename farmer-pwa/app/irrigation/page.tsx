"use client";

import { useState } from "react";

export default function Irrigation() {
  const [irrigating, setIrrigating] = useState(false);

  return (
    <main className="app">
      {/* Header */}
      <header className="header">
        <div>
          <p className="small-text">SMART FARM</p>
          <h1>💧 Irrigation</h1>
        </div>

        <button
          className="icon-button"
          onClick={() => window.location.href = "/"}
        >
          🏠
        </button>
      </header>

      {/* Field & Crop Details */}
      <section className="welcome-card">
        <div>
          <p>Current Field</p>
          <h2>Green Field 🌾</h2>
          <p>Crop: Rice • Vegetative Stage</p>
        </div>

        <div className="plant-icon">🌱</div>
      </section>

      {/* Current Status */}
      <div className="section-title">
        <h2>Current Status</h2>
        <span>● Live</span>
      </div>

      <section className="sensor-grid">
        <div className="sensor-card">
          <div className="sensor-icon">💧</div>
          <p>Soil Moisture</p>
          <h2>42%</h2>
          <small>Needs water</small>
        </div>

        <div className="sensor-card">
          <div className="sensor-icon">🌡️</div>
          <p>Temperature</p>
          <h2>28°C</h2>
          <small>Normal</small>
        </div>

        <div className="sensor-card">
          <div className="sensor-icon">💦</div>
          <p>Humidity</p>
          <h2>65%</h2>
          <small>Good level</small>
        </div>

        <div className="sensor-card">
          <div className="sensor-icon">🌧️</div>
          <p>Rainfall</p>
          <h2>0 mm</h2>
          <small>No rain</small>
        </div>
      </section>

      {/* AI Recommendation */}
      <section className="ai-card">
        <div className="ai-header">
          <div className="ai-icon">🤖</div>

          <div>
            <p className="small-text">AI RECOMMENDATION</p>
            <h2>Irrigation Needed</h2>
          </div>
        </div>

        <p className="ai-message">
          Soil moisture is below the preferred level. AI recommends
          watering the field.
        </p>

        <div className="schedule-card">
          <div className="schedule-info">
            <h3>💧 Recommended Water</h3>
            <p>25 litres • 20 minutes</p>
          </div>
        </div>

        <button
          className="primary-button"
          onClick={() => setIrrigating(true)}
        >
          💧 Start Irrigation
        </button>

        {irrigating && (
          <button
            className="primary-button"
            onClick={() => setIrrigating(false)}
            style={{ marginTop: "10px" }}
          >
            ⏹️ Stop Irrigation
          </button>
        )}
      </section>

      {/* Today's Schedule */}
      <div className="section-title">
        <h2>Today's Schedule</h2>
      </div>

      <section className="schedule-card">
        <div className="schedule-time">
          <strong>06:00 AM</strong>
          <span>Morning</span>
        </div>

        <div className="schedule-info">
          <h3>Field Irrigation</h3>
          <p>Recommended: 25 litres</p>
        </div>

        <span className="status">
          {irrigating ? "Running" : "Pending"}
        </span>
      </section>

      <section className="schedule-card" style={{ marginTop: "12px" }}>
        <div className="schedule-time">
          <strong>06:00 PM</strong>
          <span>Evening</span>
        </div>

        <div className="schedule-info">
          <h3>Field Irrigation</h3>
          <p>Recommended: 20 litres</p>
        </div>

        <span className="status">Scheduled</span>
      </section>

      {/* Weather Check */}
      <div className="section-title">
        <h2>Weather Check</h2>
      </div>

      <section className="weather-card">
        <div>
          <p className="small-text">TODAY'S WEATHER</p>
          <h2>☀️ 28°C</h2>
          <p>Humidity: 65% • Rain: 0 mm</p>
        </div>

        <div className="weather-icon">☀️</div>
      </section>

      {/* Water Usage */}
      <div className="section-title">
        <h2>Water Usage</h2>
      </div>

      <section className="sensor-grid">
        <div className="sensor-card">
          <div className="sensor-icon">💧</div>
          <p>Today</p>
          <h2>25 L</h2>
        </div>

        <div className="sensor-card">
          <div className="sensor-icon">📊</div>
          <p>This Week</p>
          <h2>145 L</h2>
        </div>
      </section>

      {/* Alert */}
      <section className="alert-card">
        <div className="alert-icon">⚠️</div>

        <div>
          <h3>Water Level Alert</h3>
          <p>Check your water tank before starting irrigation.</p>
        </div>
      </section>

      {/* Back to Home */}
      <button
        className="primary-button"
        style={{ marginTop: "20px" }}
        onClick={() => window.location.href = "/"}
      >
        🏠 Back to Home
      </button>
    </main>
  );
}