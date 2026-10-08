"use client";

import { useState } from "react";

export default function Analytics() {
  const [message, setMessage] = useState("");

  return (
    <main className="app">

      {/* Header */}
      <header className="header">
        <div>
          <p className="small-text">SMART FARM</p>
          <h1>📊 Field Analytics</h1>
        </div>

        <button
          className="icon-button"
          onClick={() => (window.location.href = "/")}
        >
          🏠
        </button>
      </header>

      {/* Overview */}
      <section className="welcome-card">
        <div>
          <p>Green Field 🌱</p>
          <h2>Field Performance</h2>
          <p>Weekly farming summary</p>
        </div>

        <div className="plant-icon">📈</div>
      </section>

      {/* Key Statistics */}
      <div className="section-title">
        <h2>Weekly Summary</h2>
        <span>Last 7 Days</span>
      </div>

      <section className="sensor-grid">

        <div className="sensor-card">
          <div className="sensor-icon">💧</div>
          <p>Water Used</p>
          <h2>145 L</h2>
          <small>This week</small>
        </div>

        <div className="sensor-card">
          <div className="sensor-icon">🌱</div>
          <p>Soil Moisture</p>
          <h2>42%</h2>
          <small>Healthy</small>
        </div>

        <div className="sensor-card">
          <div className="sensor-icon">🌡️</div>
          <p>Avg Temperature</p>
          <h2>29°C</h2>
          <small>Normal</small>
        </div>

        <div className="sensor-card">
          <div className="sensor-icon">🌧️</div>
          <p>Rainfall</p>
          <h2>12 mm</h2>
          <small>This week</small>
        </div>

      </section>

      {/* Water Usage */}
      <div className="section-title">
        <h2>💧 Water Usage</h2>
      </div>

      <section className="ai-card">

        <div className="ai-header">
          <div className="ai-icon">💧</div>

          <div>
            <p className="small-text">WEEKLY WATER USAGE</p>
            <h2>145 Litres</h2>
          </div>
        </div>

        <p className="ai-message">
          Your field used 145 litres of water this week.
          Monitor irrigation to avoid unnecessary water usage.
        </p>

        {/* Simple Chart */}
        <div style={{ marginTop: "20px" }}>

          <div
            style={{
              display: "flex",
              alignItems: "end",
              justifyContent: "space-between",
              height: "150px",
              gap: "8px",
            }}
          >

            {[
              ["Mon", 35],
              ["Tue", 50],
              ["Wed", 30],
              ["Thu", 45],
              ["Fri", 25],
              ["Sat", 40],
              ["Sun", 20],
            ].map(([day, value]) => (
              <div
                key={day}
                style={{
                  flex: 1,
                  height: `${Number(value) * 3}px`,
                  background: "#22c55e",
                  borderRadius: "8px 8px 3px 3px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#041008",
                  fontSize: "10px",
                  fontWeight: "bold",
                }}
              >
                {value}L
              </div>
            ))}

          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "8px",
              color: "#91a69b",
              fontSize: "10px",
            }}
          >
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>

        </div>

      </section>

      {/* Soil Moisture */}
      <div className="section-title">
        <h2>🌱 Soil Moisture</h2>
        <span>● Live</span>
      </div>

      <section className="schedule-card">

        <div className="sensor-icon">💧</div>

        <div className="schedule-info">
          <h3>Current Moisture</h3>
          <p>42% • Good level for the crop</p>
        </div>

        <span className="status">Healthy</span>

      </section>

      {/* AI Insight */}
      <section className="ai-card">

        <div className="ai-header">
          <div className="ai-icon">🤖</div>

          <div>
            <p className="small-text">SMART INSIGHT</p>
            <h2>Water Saving Tip</h2>
          </div>
        </div>

        <p className="ai-message">
          Avoid irrigation when rainfall is expected.
          This can help reduce unnecessary water usage.
        </p>

        <button
          className="primary-button"
          onClick={() =>
            setMessage("💡 Tip saved for your field")
          }
        >
          💡 Got it
        </button>

      </section>

      {/* Notification */}
      {message && (
        <div className="notification">
          {message}
        </div>
      )}

      {/* Navigation Buttons */}
      <button
        className="primary-button"
        style={{ marginTop: "20px" }}
        onClick={() => (window.location.href = "/field")}
      >
        🌾 Back to Field
      </button>

      <button
        className="primary-button"
        style={{ marginTop: "10px" }}
        onClick={() => (window.location.href = "/irrigation")}
      >
        💧 Go to Irrigation
      </button>

      <button
        className="primary-button"
        style={{ marginTop: "10px" }}
        onClick={() => (window.location.href = "/")}
      >
        🏠 Back to Home
      </button>

    </main>
  );
}