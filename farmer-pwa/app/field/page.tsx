"use client";

import { useState } from "react";

export default function Field() {
  const [message, setMessage] = useState("");

  return (
    <main className="app">
      {/* Header */}
      <header className="header">
        <div>
          <p className="small-text">SMART FARM</p>
          <h1>🌾 Field Details</h1>
        </div>

        <button
          className="icon-button"
          onClick={() => (window.location.href = "/")}
        >
          🏠
        </button>
      </header>

      {/* Field Overview */}
      <section className="welcome-card">
        <div>
          <p>Active Field</p>
          <h2>Green Field 🌱</h2>
          <p>Healthy crop condition</p>
        </div>

        <div className="plant-icon">🌾</div>
      </section>

      {/* Field Information */}
      <div className="section-title">
        <h2>Field Information</h2>
      </div>

      <section className="sensor-grid">
        <div className="sensor-card">
          <div className="sensor-icon">👨‍🌾</div>
          <p>Farmer Name</p>
          <h2>Farmer</h2>
        </div>

        <div className="sensor-card">
          <div className="sensor-icon">📍</div>
          <p>Location</p>
          <h2>Chennai</h2>
        </div>

        <div className="sensor-card">
          <div className="sensor-icon">📐</div>
          <p>Field Size</p>
          <h2>2 Acres</h2>
        </div>

        <div className="sensor-card">
          <div className="sensor-icon">🆔</div>
          <p>Sensor ID</p>
          <h2>SEN-001</h2>
        </div>
      </section>

      {/* Crop Details */}
      <div className="section-title">
        <h2>Crop Details</h2>
      </div>

      <section className="ai-card">
        <div className="ai-header">
          <div className="ai-icon">🌱</div>

          <div>
            <p className="small-text">CURRENT CROP</p>
            <h2>Rice</h2>
          </div>
        </div>

        <p className="ai-message">
          Your rice crop is currently in the vegetative growth stage.
        </p>

        <div className="schedule-card">
          <div className="schedule-info">
            <h3>🌾 Growth Stage</h3>
            <p>Vegetative</p>
          </div>
        </div>

        <div className="schedule-card" style={{ marginTop: "10px" }}>
          <div className="schedule-info">
            <h3>🌱 Soil Type</h3>
            <p>Loamy Soil</p>
          </div>
        </div>
      </section>

      {/* Current Conditions */}
      <div className="section-title">
        <h2>Current Conditions</h2>
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
      </section>

      {/* Navigation */}
      {message && <div className="notification">{message}</div>}

      <button
        className="primary-button"
        style={{ marginTop: "20px" }}
        onClick={() => (window.location.href = "/irrigation")}
      >
        💧 Go to Irrigation
      </button>

      <button
        className="primary-button"
  style={{ marginTop: "10px" }}
  onClick={() => (window.location.href = "/analytics")}
>
  📊 View Analytics
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