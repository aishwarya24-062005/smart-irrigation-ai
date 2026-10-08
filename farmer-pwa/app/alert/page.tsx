"use client";

import { useEffect, useRef, useState } from "react";

type AlertType =
  | "soil"
  | "water"
  | "rain"
  | "irrigation";

type AlertItem = {
  id: string;
  type: AlertType;
  title: string;
  message: string;
  icon: string;
  time: string;
  priority: "High" | "Medium" | "Info";
};

export default function AlertsPage() {
  // =========================================================
  // SENSOR VALUES
  // =========================================================

  const [soilMoisture, setSoilMoisture] = useState(42);
  const [waterLevel, setWaterLevel] = useState(75);
  const [rainfall, setRainfall] = useState(0);

  // =========================================================
  // ALERT STATE
  // =========================================================

  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [popup, setPopup] = useState<AlertItem | null>(null);

  const previousConditions = useRef({
    lowSoil: false,
    lowWater: false,
    heavyRain: false,
    irrigation: false,
  });

  // =========================================================
  // IRRIGATION CONDITION
  // =========================================================

  const irrigationNeeded =
    soilMoisture < 40 && rainfall < 20;

  // =========================================================
  // ALERT SOUND
  // =========================================================

  const playAlertSound = () => {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (
          window as typeof window & {
            webkitAudioContext?: typeof AudioContext;
          }
        ).webkitAudioContext;

      if (!AudioContextClass) {
        return;
      }

      const audioContext = new AudioContextClass();

      if (audioContext.state === "suspended") {
        audioContext.resume();
      }

      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.type = "sine";

      oscillator.frequency.setValueAtTime(
        880,
        audioContext.currentTime
      );

      oscillator.frequency.setValueAtTime(
        660,
        audioContext.currentTime + 0.2
      );

      gainNode.gain.setValueAtTime(
        0.0001,
        audioContext.currentTime
      );

      gainNode.gain.exponentialRampToValueAtTime(
        0.3,
        audioContext.currentTime + 0.05
      );

      gainNode.gain.exponentialRampToValueAtTime(
        0.0001,
        audioContext.currentTime + 0.4
      );

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.start();

      oscillator.stop(
        audioContext.currentTime + 0.45
      );

      setTimeout(() => {
        audioContext.close();
      }, 700);
    } catch (error) {
      console.log(
        "Unable to play alert sound:",
        error
      );
    }
  };

  // =========================================================
  // CREATE ALERT
  // =========================================================

  const createAlert = (
    type: AlertType,
    title: string,
    message: string,
    icon: string,
    priority: "High" | "Medium" | "Info"
  ): AlertItem => {
    return {
      id: `${type}-${Date.now()}`,
      type,
      title,
      message,
      icon,
      time: "Just now",
      priority,
    };
  };

  // =========================================================
  // AUTOMATIC ALERT DETECTION
  // =========================================================

  useEffect(() => {
    const lowSoil = soilMoisture < 30;
    const lowWater = waterLevel < 20;
    const heavyRain = rainfall >= 50;
    const irrigation = irrigationNeeded;

    const previous = previousConditions.current;

    // ---------------------------------------------------------
    // LOW SOIL MOISTURE
    // ---------------------------------------------------------

    if (lowSoil && !previous.lowSoil) {
      const newAlert = createAlert(
        "soil",
        "Low Soil Moisture",
        `Soil moisture is ${soilMoisture}%. Irrigation is recommended.`,
        "🌱",
        "High"
      );

      setAlerts((current) => [
        newAlert,
        ...current,
      ]);

      setPopup(newAlert);

      playAlertSound();

      setTimeout(() => {
        setPopup(null);
      }, 6000);
    }

    // ---------------------------------------------------------
    // LOW WATER LEVEL
    // ---------------------------------------------------------

    if (lowWater && !previous.lowWater) {
      const newAlert = createAlert(
        "water",
        "Low Water Level",
        `Water tank level is only ${waterLevel}%. Please refill the tank.`,
        "💧",
        "High"
      );

      setAlerts((current) => [
        newAlert,
        ...current,
      ]);

      setPopup(newAlert);

      playAlertSound();

      setTimeout(() => {
        setPopup(null);
      }, 6000);
    }

    // ---------------------------------------------------------
    // HEAVY RAINFALL
    // ---------------------------------------------------------

    if (heavyRain && !previous.heavyRain) {
      const newAlert = createAlert(
        "rain",
        "Heavy Rainfall",
        `Rainfall is ${rainfall} mm. Irrigation may not be required.`,
        "🌧️",
        "Medium"
      );

      setAlerts((current) => [
        newAlert,
        ...current,
      ]);

      setPopup(newAlert);

      playAlertSound();

      setTimeout(() => {
        setPopup(null);
      }, 6000);
    }

    // ---------------------------------------------------------
    // IRRIGATION NEEDED
    // ---------------------------------------------------------

    if (
      irrigation &&
      !previous.irrigation &&
      !heavyRain
    ) {
      const newAlert = createAlert(
        "irrigation",
        "Irrigation Needed",
        "AI recommends starting irrigation for your field.",
        "🚿",
        "High"
      );

      setAlerts((current) => [
        newAlert,
        ...current,
      ]);

      setPopup(newAlert);

      playAlertSound();

      setTimeout(() => {
        setPopup(null);
      }, 6000);
    }

    // ---------------------------------------------------------
    // SAVE CURRENT CONDITIONS
    // ---------------------------------------------------------

    previousConditions.current = {
      lowSoil,
      lowWater,
      heavyRain,
      irrigation,
    };
  }, [
    soilMoisture,
    waterLevel,
    rainfall,
    irrigationNeeded,
  ]);

  // =========================================================
  // CLEAR ALL ALERTS
  // =========================================================

  const clearAllAlerts = () => {
    setAlerts([]);
    setPopup(null);

    previousConditions.current = {
      lowSoil: false,
      lowWater: false,
      heavyRain: false,
      irrigation: false,
    };
  };

  // =========================================================
  // TEST ALERTS
  // =========================================================

  const testSoilAlert = () => {
    setSoilMoisture(25);
  };

  const testWaterAlert = () => {
    setWaterLevel(15);
  };

  const testRainAlert = () => {
    setRainfall(60);
  };

  const resetSensors = () => {
    setSoilMoisture(42);
    setWaterLevel(75);
    setRainfall(0);

    previousConditions.current = {
      lowSoil: false,
      lowWater: false,
      heavyRain: false,
      irrigation: false,
    };
  };

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <main className="alerts-page">

      {/* =====================================================
          POPUP
      ====================================================== */}

      {popup && (
        <div className="alert-popup-custom">

          <div className="popup-icon">
            {popup.icon}
          </div>

          <div className="popup-content">
            <strong>{popup.title}</strong>

            <p>{popup.message}</p>
          </div>

          <button
            onClick={() => setPopup(null)}
            aria-label="Close alert"
          >
            ×
          </button>

        </div>
      )}

      {/* =====================================================
          HEADER
      ====================================================== */}

      <section className="alerts-header">

        <div>
          <span className="small-label">
            SMART FARM
          </span>

          <h1>Alerts</h1>

          <p>
            Monitor important field conditions
          </p>
        </div>

        <div className="alert-count">
          <span>🔔</span>

          <strong>{alerts.length}</strong>
        </div>

      </section>

      {/* =====================================================
          CURRENT STATUS
      ====================================================== */}

      <section className="status-summary">

        <div
          className={
            soilMoisture < 30
              ? "summary-item danger"
              : "summary-item"
          }
        >
          <span>🌱</span>

          <div>
            <small>Soil Moisture</small>

            <strong>
              {soilMoisture}%
            </strong>
          </div>
        </div>

        <div
          className={
            waterLevel < 20
              ? "summary-item danger"
              : "summary-item"
          }
        >
          <span>💧</span>

          <div>
            <small>Water Level</small>

            <strong>
              {waterLevel}%
            </strong>
          </div>
        </div>

        <div
          className={
            rainfall >= 50
              ? "summary-item warning"
              : "summary-item"
          }
        >
          <span>🌧️</span>

          <div>
            <small>Rainfall</small>

            <strong>
              {rainfall} mm
            </strong>
          </div>
        </div>

      </section>

      {/* =====================================================
          ALERT STATUS
      ====================================================== */}

      {alerts.length === 0 ? (
        <section className="all-good-card">

          <div className="good-icon">
            ✓
          </div>

          <div>
            <h2>No Active Alerts</h2>

            <p>
              Your field conditions are currently
              normal.
            </p>
          </div>

        </section>
      ) : (
        <section className="alerts-section">

          <div className="section-heading-custom">

            <div>
              <h2>Active Alerts</h2>

              <span>
                {alerts.length} notification
                {alerts.length !== 1 ? "s" : ""}
              </span>
            </div>

            <button
              className="clear-button"
              onClick={clearAllAlerts}
            >
              Clear All
            </button>

          </div>

          <div className="alert-list-custom">

            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`alert-card-custom ${alert.priority.toLowerCase()}`}
              >

                <div className="alert-card-icon">
                  {alert.icon}
                </div>

                <div className="alert-card-content">

                  <div className="alert-card-top">

                    <h3>
                      {alert.title}
                    </h3>

                    <span
                      className={`priority ${alert.priority.toLowerCase()}`}
                    >
                      {alert.priority}
                    </span>

                  </div>

                  <p>
                    {alert.message}
                  </p>

                  <small>
                    {alert.time}
                  </small>

                </div>

              </div>
            ))}

          </div>

        </section>
      )}

      {/* =====================================================
          IRRIGATION RECOMMENDATION
      ====================================================== */}

      <section className="irrigation-alert-card">

        <div className="irrigation-alert-icon">
          🚿
        </div>

        <div className="irrigation-alert-content">

          <span className="small-label">
            AI RECOMMENDATION
          </span>

          <h2>
            {irrigationNeeded
              ? "Irrigation Needed"
              : "Irrigation Not Required"}
          </h2>

          <p>
            {irrigationNeeded
              ? "Soil moisture is below the recommended level. Start irrigation to maintain healthy crop growth."
              : "Current soil and weather conditions do not require immediate irrigation."}
          </p>

        </div>

      </section>

      {/* =====================================================
          TEST ALERTS
      ====================================================== */}

      <section className="test-card">

        <div className="section-heading-custom">

          <div>
            <h2>Alert Testing</h2>

            <span>
              Test automatic notifications
            </span>
          </div>

        </div>

        <p className="test-description">
          Use these buttons to test the popup and
          alert sound.
        </p>

        <div className="test-buttons">

          <button onClick={testSoilAlert}>
            🌱 Test Soil
          </button>

          <button onClick={testWaterAlert}>
            💧 Test Water
          </button>

          <button onClick={testRainAlert}>
            🌧️ Test Rain
          </button>

          <button onClick={resetSensors}>
            ↻ Reset
          </button>

        </div>

      </section>

      {/* =====================================================
          INFORMATION
      ====================================================== */}

      <section className="alert-info-card">

        <h2>Automatic Alert Rules</h2>

        <div className="rule">

          <span>🌱</span>

          <div>
            <strong>Low Soil Moisture</strong>

            <p>
              Alert when soil moisture falls
              below 30%.
            </p>
          </div>

        </div>

        <div className="rule">

          <span>💧</span>

          <div>
            <strong>Low Water Level</strong>

            <p>
              Alert when tank level falls
              below 20%.
            </p>
          </div>

        </div>

        <div className="rule">

          <span>🌧️</span>

          <div>
            <strong>Heavy Rainfall</strong>

            <p>
              Alert when rainfall reaches
              50 mm or more.
            </p>
          </div>

        </div>

        <div className="rule">

          <span>🚿</span>

          <div>
            <strong>Irrigation Needed</strong>

            <p>
              AI recommendation when soil
              moisture is below 40%.
            </p>
          </div>

        </div>

      </section>

      {/* =====================================================
          CSS
      ====================================================== */}

      <style jsx>{`

        .alerts-page {
          width: 100%;
          min-height: 100vh;
          padding: 20px 16px 30px;
          background: #0b1b14;
          color: #f1f8f4;
        }

        /* HEADER */

        .alerts-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          margin-bottom: 18px;
        }

        .small-label {
          color: #75c992;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.8px;
        }

        .alerts-header h1 {
          margin-top: 6px;
          font-size: 25px;
          font-weight: 800;
        }

        .alerts-header p {
          margin-top: 6px;
          color: #8da99a;
          font-size: 11px;
        }

        .alert-count {
          width: 54px;
          height: 54px;
          border-radius: 17px;
          background: #173b29;
          border: 1px solid #2b5b42;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 3px;
          flex-direction: column;
        }

        .alert-count span {
          font-size: 17px;
          line-height: 1;
        }

        .alert-count strong {
          color: #79d798;
          font-size: 11px;
        }

        /* POPUP */

        .alert-popup-custom {
          position: fixed;
          top: 18px;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 30px);
          max-width: 450px;
          min-height: 72px;
          padding: 12px;
          display: flex;
          align-items: center;
          gap: 11px;
          background: #173a29;
          border: 1px solid #4d9567;
          border-radius: 15px;
          box-shadow:
            0 12px 35px rgba(0, 0, 0, 0.45);
          z-index: 999;
          animation: popupIn 0.3s ease;
        }

        @keyframes popupIn {
          from {
            opacity: 0;
            transform:
              translateX(-50%)
              translateY(-15px);
          }

          to {
            opacity: 1;
            transform:
              translateX(-50%)
              translateY(0);
          }
        }

        .popup-icon {
          width: 42px;
          height: 42px;
          flex-shrink: 0;
          border-radius: 13px;
          background: #214b34;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }

        .popup-content {
          flex: 1;
          min-width: 0;
        }

        .popup-content strong {
          display: block;
          font-size: 12px;
        }

        .popup-content p {
          margin-top: 4px;
          color: #a9c4b5;
          font-size: 9px;
          line-height: 1.4;
        }

        .alert-popup-custom button {
          width: 28px;
          height: 28px;
          border: 0;
          border-radius: 8px;
          background: #0d2419;
          color: #a8c4b4;
          font-size: 18px;
          cursor: pointer;
        }

        /* SUMMARY */

        .status-summary {
          display: grid;
          grid-template-columns:
            repeat(3, minmax(0, 1fr));
          gap: 8px;
          margin-bottom: 15px;
        }

        .summary-item {
          min-width: 0;
          padding: 12px 8px;
          border-radius: 13px;
          border: 1px solid #1d4030;
          background: #10271d;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 6px;
        }

        .summary-item.danger {
          border-color: #79413b;
          background: #2b1b19;
        }

        .summary-item.warning {
          border-color: #725d32;
          background: #292315;
        }

        .summary-item > span {
          font-size: 18px;
        }

        .summary-item small {
          display: block;
          color: #789586;
          font-size: 8px;
        }

        .summary-item strong {
          display: block;
          margin-top: 3px;
          font-size: 13px;
        }

        /* GOOD */

        .all-good-card {
          padding: 22px 18px;
          border: 1px solid #25553b;
          border-radius: 17px;
          background: #102c20;
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .good-icon {
          width: 47px;
          height: 47px;
          flex-shrink: 0;
          border-radius: 15px;
          background: #1b4a30;
          color: #70db91;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 23px;
          font-weight: 800;
        }

        .all-good-card h2 {
          font-size: 14px;
        }

        .all-good-card p {
          margin-top: 5px;
          color: #89a695;
          font-size: 10px;
          line-height: 1.5;
        }

        /* SECTION */

        .alerts-section {
          margin-top: 15px;
        }

        .section-heading-custom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 11px;
        }

        .section-heading-custom h2 {
          font-size: 15px;
        }

        .section-heading-custom span {
          display: block;
          margin-top: 4px;
          color: #779485;
          font-size: 9px;
        }

        .clear-button {
          border: 1px solid #5e322e;
          border-radius: 9px;
          padding: 7px 10px;
          background: #2a1715;
          color: #e68b81;
          font-size: 9px;
          font-weight: 700;
          cursor: pointer;
        }

        /* ALERT LIST */

        .alert-list-custom {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .alert-card-custom {
          padding: 14px;
          display: flex;
          gap: 12px;
          border: 1px solid #294b3a;
          border-radius: 15px;
          background: #10271d;
        }

        .alert-card-custom.high {
          border-color: #68403b;
        }

        .alert-card-custom.medium {
          border-color: #665532;
        }

        .alert-card-custom.info {
          border-color: #2e5540;
        }

        .alert-card-icon {
          width: 42px;
          height: 42px;
          flex-shrink: 0;
          border-radius: 12px;
          background: #193c2b;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 19px;
        }

        .alert-card-content {
          min-width: 0;
          flex: 1;
        }

        .alert-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 7px;
        }

        .alert-card-content h3 {
          font-size: 12px;
        }

        .alert-card-content p {
          margin-top: 5px;
          color: #8fa99b;
          font-size: 10px;
          line-height: 1.5;
        }

        .alert-card-content small {
          display: block;
          margin-top: 7px;
          color: #607b6c;
          font-size: 8px;
        }

        .priority {
          flex-shrink: 0;
          padding: 4px 6px;
          border-radius: 6px;
          font-size: 7px !important;
          font-weight: 800;
        }

        .priority.high {
          background: #48231f;
          color: #f08c80;
        }

        .priority.medium {
          background: #453718;
          color: #d8bc72;
        }

        .priority.info {
          background: #193a29;
          color: #7bd498;
        }

        /* IRRIGATION */

        .irrigation-alert-card {
          margin-top: 15px;
          padding: 17px;
          display: flex;
          gap: 13px;
          border-radius: 17px;
          border: 1px solid #28553c;
          background: #102c20;
        }

        .irrigation-alert-icon {
          width: 44px;
          height: 44px;
          flex-shrink: 0;
          border-radius: 13px;
          background: #193f2b;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }

        .irrigation-alert-content {
          min-width: 0;
        }

        .irrigation-alert-content h2 {
          margin-top: 5px;
          font-size: 14px;
        }

        .irrigation-alert-content p {
          margin-top: 6px;
          color: #8da899;
          font-size: 10px;
          line-height: 1.6;
        }

        /* TEST */

        .test-card {
          margin-top: 15px;
          padding: 17px;
          border-radius: 17px;
          border: 1px solid #1d4030;
          background: #10271d;
        }

        .test-description {
          color: #7f9a8b;
          font-size: 9px;
          line-height: 1.5;
        }

        .test-buttons {
          margin-top: 12px;
          display: grid;
          grid-template-columns:
            repeat(2, minmax(0, 1fr));
          gap: 8px;
        }

        .test-buttons button {
          min-height: 39px;
          border: 1px solid #28543c;
          border-radius: 9px;
          background: #153426;
          color: #92dbaa;
          font-size: 9px;
          font-weight: 700;
          cursor: pointer;
        }

        .test-buttons button:hover {
          background: #1d4932;
        }

        /* INFO */

        .alert-info-card {
          margin-top: 15px;
          padding: 17px;
          border-radius: 17px;
          border: 1px solid #1d4030;
          background: #10271d;
        }

        .alert-info-card h2 {
          font-size: 14px;
          margin-bottom: 12px;
        }

        .rule {
          display: flex;
          align-items: flex-start;
          gap: 11px;
          padding: 11px 0;
          border-bottom: 1px solid #1b382b;
        }

        .rule:last-child {
          border-bottom: 0;
          padding-bottom: 0;
        }

        .rule > span {
          width: 32px;
          height: 32px;
          flex-shrink: 0;
          border-radius: 9px;
          background: #183827;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
        }

        .rule strong {
          font-size: 10px;
        }

        .rule p {
          margin-top: 4px;
          color: #789586;
          font-size: 9px;
          line-height: 1.4;
        }

        /* MOBILE */

        @media (max-width: 360px) {

          .alerts-page {
            padding-left: 12px;
            padding-right: 12px;
          }

          .status-summary {
            gap: 5px;
          }

          .summary-item {
            padding-left: 5px;
            padding-right: 5px;
          }

          .summary-item strong {
            font-size: 11px;
          }

          .alert-card-top {
            align-items: flex-start;
            flex-direction: column;
            gap: 5px;
          }

        }

      `}</style>

    </main>
  );
}