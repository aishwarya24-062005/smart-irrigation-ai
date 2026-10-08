"use client";

import { useState } from "react";

export default function HomePage() {
  const [message, setMessage] = useState("");

  return (
    <main className="app">

      {/* Header */}
      <header className="header">
        <div>
          <p className="small-text">SMART FARM</p>
          <h1>Smart Irrigation 🌱</h1>
        </div>

        <button
          className="icon-button"
          onClick={() => setMessage("🔔 You have 1 new alert")}
        >
          🔔
        </button>
      </header>

      {/* Welcome */}
      <section className="welcome-card">
        <div>
          <p>Good morning, Farmer 👋</p>
          <h2>Your field is healthy</h2>
        </div>

        <div className="plant-icon">🌿</div>
      </section>

      {/* Notification */}
      {message && (
        <div className="notification">
          {message}
        </div>
      )}

      {/* Field Status */}
      <div className="section-title">
        <h2>Field Status</h2>
        <span>● Live</span>
      </div>

      <section className="sensor-grid">

        <div className="sensor-card">
          <div className="sensor-icon">💧</div>
          <p>Soil Moisture</p>
          <h2>42%</h2>
          <small>Good level</small>
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

          <div className="ai-icon">
            🤖
          </div>

          <div>
            <p className="small-text">
              AI RECOMMENDATION
            </p>

            <h2>
              Irrigation Needed
            </h2>
          </div>

        </div>

        <p className="ai-message">
          Your soil moisture is getting low.
          Water your field to keep the crops healthy.
        </p>

        <button
          className="primary-button"
          onClick={() =>
            setMessage("💧 Irrigation started successfully")
          }
        >
          💧 Start Irrigation
        </button>

      </section>

      {/* Weather */}
      <section className="weather-card">

        <div>
          <p className="small-text">
            TODAY'S WEATHER
          </p>

          <h2>
            ☀️ 28°C
          </h2>

          <p>
            Clear sky • No rain expected
          </p>
        </div>

        <div className="weather-icon">
          ☀️
        </div>

      </section>

      {/* Schedule */}
      <div className="section-title">

        <h2>
          Today's Schedule
        </h2>

        <button
          className="text-button"
          onClick={() =>
            (window.location.href = "/irrigation")
          }
        >
          View all
        </button>

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
          Pending
        </span>

      </section>

      {/* Alert */}
      <section className="alert-card">

        <div className="alert-icon">
          ⚠️
        </div>

        <div>
          <h3>
            Water Level Alert
          </h3>

          <p>
            Check your water tank before irrigation.
          </p>
        </div>

      </section>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">

        <button
          className="active"
          onClick={() =>
            (window.location.href = "/home")
          }
        >
          🏠
          <span>Home</span>
        </button>

        <button
          onClick={() =>
            (window.location.href = "/irrigation")
          }
        >
          💧
          <span>Irrigation</span>
        </button>

        <button
          onClick={() =>
            (window.location.href = "/field")
          }
        >
          📊
          <span>Field</span>
        </button>

        <button
          onClick={() =>
            (window.location.href = "/alerts")
          }
        >
          🔔
          <span>Alerts</span>
        </button>

        <button
          onClick={() =>
            (window.location.href = "/settings")
          }
        >
          ⚙️
          <span>Settings</span>
        </button>

      </nav>

    </main>
  );
}