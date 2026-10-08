"use client";

import { useState } from "react";

type Farmer = {
  name: string;
  username: string;
  password?: string;
  location: string;
  fieldSize: string;
  cropType: string;
};

type LoginPageProps = {
  onLogin: (farmer: Farmer) => void;
};

export default function LoginPage({
  onLogin,
}: LoginPageProps) {
  const [isCreateAccount, setIsCreateAccount] =
    useState(false);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [location, setLocation] = useState("");
  const [fieldSize, setFieldSize] = useState("");
  const [cropType, setCropType] =
    useState("Rice");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* ================================
     LOGIN
  ================================= */

  function handleLogin(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setError("");
    setSuccess("");

    const savedAccount =
      localStorage.getItem(
        "farmerAccount"
      );

    if (!savedAccount) {
      setError(
        "No account found. Please create a new account first."
      );
      return;
    }

    try {
      const account: Farmer =
        JSON.parse(savedAccount);

      if (
        account.username === username &&
        account.password === password
      ) {
        onLogin(account);
      } else {
        setError(
          "Invalid username or password."
        );
      }
    } catch {
      setError(
        "Unable to read account details."
      );
    }
  }

  /* ================================
     CREATE ACCOUNT
  ================================= */

  function handleCreateAccount(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !name.trim() ||
      !username.trim() ||
      !password.trim() ||
      !location.trim() ||
      !fieldSize.trim()
    ) {
      setError(
        "Please fill in all fields."
      );
      return;
    }

    if (password.length < 4) {
      setError(
        "Password must contain at least 4 characters."
      );
      return;
    }

    const existingAccount =
      localStorage.getItem(
        "farmerAccount"
      );

    if (existingAccount) {
      try {
        const account: Farmer =
          JSON.parse(existingAccount);

        if (
          account.username.toLowerCase() ===
          username.toLowerCase()
        ) {
          setError(
            "This username already exists."
          );
          return;
        }
      } catch {
        // Continue if saved data is invalid.
      }
    }

    const newFarmer: Farmer = {
      name: name.trim(),
      username: username.trim(),
      password,
      location: location.trim(),
      fieldSize: fieldSize.trim(),
      cropType,
    };

    localStorage.setItem(
      "farmerAccount",
      JSON.stringify(newFarmer)
    );

    localStorage.setItem(
      "farmer",
      JSON.stringify(newFarmer)
    );

    setSuccess(
      "Account created successfully!"
    );

    setTimeout(() => {
      setIsCreateAccount(false);

      setUsername(
        newFarmer.username
      );

      setPassword("");

      setSuccess("");
    }, 1200);
  }

  /* ================================
     LOGIN PAGE
  ================================= */

  if (!isCreateAccount) {
    return (
      <main className="login-page">

        <div className="login-card">

          <div className="logo-box">
            🌱
          </div>

          <div className="brand">
            SMART FARM
          </div>

          <h1>
            Smart Irrigation
          </h1>

          <p className="subtitle">
            AI-powered smart farming
          </p>

          <form
            onSubmit={handleLogin}
            className="login-form"
          >

            <label>
              Username
            </label>

            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) =>
                setUsername(
                  e.target.value
                )
              }
            />

            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
            />

            {error && (
              <div className="error-message">
                ⚠️ {error}
              </div>
            )}

            <button
              type="submit"
              className="login-button"
            >
              Login
            </button>

          </form>

          <div className="divider">
            <span>OR</span>
          </div>

          <button
            className="create-button"
            onClick={() => {
              setIsCreateAccount(true);
              setError("");
              setSuccess("");
            }}
          >
            + Create New Account
          </button>

          <p className="footer-text">
            Farmer PWA • Smart Irrigation AI
          </p>

        </div>

        <style jsx>{`

          .login-page {
            min-height: 100vh;

            display: flex;

            align-items: center;
            justify-content: center;

            padding: 20px;

            background:
              radial-gradient(
                circle at top right,
                rgba(
                  34,
                  197,
                  94,
                  0.12
                ),
                transparent 40%
              ),
              #07110d;

            color: #f1f8f4;
          }

          .login-card {
            width: 100%;
            max-width: 410px;

            padding: 32px 24px;

            border-radius: 28px;

            background:
              linear-gradient(
                145deg,
                #102219,
                #0b1710
              );

            border:
              1px solid
              rgba(
                101,
                229,
                138,
                0.14
              );

            box-shadow:
              0 25px 80px
              rgba(
                0,
                0,
                0,
                0.35
              );

            text-align: center;
          }

          .logo-box {
            width: 72px;
            height: 72px;

            margin:
              0 auto 14px;

            display: flex;

            align-items: center;
            justify-content: center;

            border-radius: 22px;

            background:
              rgba(
                74,
                222,
                128,
                0.12
              );

            font-size: 36px;
          }

          .brand {
            color: #68e890;

            font-size: 10px;

            font-weight: 800;

            letter-spacing: 3px;
          }

          h1 {
            margin:
              8px 0 5px;

            font-size: 27px;

            font-weight: 800;
          }

          .subtitle {
            margin:
              0 0 25px;

            color: #82978a;

            font-size: 12px;
          }

          .login-form {
            display: flex;

            flex-direction: column;

            text-align: left;
          }

          label {
            margin:
              12px 0 7px;

            color: #a9b9ae;

            font-size: 11px;

            font-weight: 700;
          }

          input,
          select {
            width: 100%;

            padding:
              14px;

            border:
              1px solid
              rgba(
                255,
                255,
                255,
                0.09
              );

            border-radius: 13px;

            outline: none;

            background: #09150f;

            color: #f1f8f4;

            font-size: 13px;
          }

          input:focus,
          select:focus {
            border-color:
              #42b962;

            box-shadow:
              0 0 0 3px
              rgba(
                66,
                185,
                98,
                0.08
              );
          }

          input::placeholder {
            color: #596a60;
          }

          .login-button {
            width: 100%;

            margin-top: 20px;

            padding: 15px;

            border: 0;

            border-radius: 14px;

            background:
              linear-gradient(
                135deg,
                #35b85c,
                #218b43
              );

            color: white;

            font-size: 14px;

            font-weight: 800;

            cursor: pointer;

            box-shadow:
              0 10px 25px
              rgba(
                34,
                197,
                94,
                0.18
              );
          }

          .login-button:hover {
            filter:
              brightness(
                1.08
              );
          }

          .divider {
            display: flex;

            align-items: center;

            gap: 10px;

            margin:
              22px 0 16px;

            color: #53645a;

            font-size: 10px;
          }

          .divider::before,
          .divider::after {
            content: "";

            flex: 1;

            height: 1px;

            background:
              rgba(
                255,
                255,
                255,
                0.08
              );
          }

          .create-button {
            width: 100%;

            padding: 14px;

            border:
              1px solid
              rgba(
                74,
                222,
                128,
                0.3
              );

            border-radius: 14px;

            background:
              rgba(
                74,
                222,
                128,
                0.06
              );

            color: #68e890;

            font-size: 13px;

            font-weight: 800;

            cursor: pointer;
          }

          .create-button:hover {
            background:
              rgba(
                74,
                222,
                128,
                0.12
              );
          }

          .error-message {
            margin-top: 12px;

            padding: 11px;

            border-radius: 10px;

            background:
              rgba(
                239,
                68,
                68,
                0.1
              );

            border:
              1px solid
              rgba(
                239,
                68,
                68,
                0.18
              );

            color: #ff8c8c;

            font-size: 11px;

            line-height: 1.4;
          }

          .success-message {
            margin-top: 12px;

            padding: 11px;

            border-radius: 10px;

            background:
              rgba(
                74,
                222,
                128,
                0.1
              );

            color: #68e890;

            font-size: 11px;
          }

          .footer-text {
            margin:
              22px 0 0;

            color: #53645a;

            font-size: 9px;
          }

          @media (max-width: 430px) {

            .login-card {
              padding:
                28px 18px;
            }

          }

        `}</style>

      </main>
    );
  }

  /* ================================
     CREATE ACCOUNT PAGE
  ================================= */

  return (
    <main className="login-page">

      <div className="login-card">

        <div className="logo-box">
          🌾
        </div>

        <div className="brand">
          SMART FARM
        </div>

        <h1>
          Create Account
        </h1>

        <p className="subtitle">
          Register your farmer profile
        </p>

        <form
          onSubmit={
            handleCreateAccount
          }
          className="login-form"
        >

          <label>
            Farmer Name
          </label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
          />

          <label>
            Username
          </label>

          <input
            type="text"
            placeholder="Create username"
            value={username}
            onChange={(e) =>
              setUsername(
                e.target.value
              )
            }
          />

          <label>
            Password
          </label>

          <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          <label>
            Field Location
          </label>

          <input
            type="text"
            placeholder="Example: Chennai"
            value={location}
            onChange={(e) =>
              setLocation(
                e.target.value
              )
            }
          />

          <label>
            Field Size
          </label>

          <input
            type="text"
            placeholder="Example: 2 acres"
            value={fieldSize}
            onChange={(e) =>
              setFieldSize(
                e.target.value
              )
            }
          />

          <label>
            Crop Type
          </label>

          <select
            value={cropType}
            onChange={(e) =>
              setCropType(
                e.target.value
              )
            }
          >

            <option value="Rice">
              Rice
            </option>

            <option value="Wheat">
              Wheat
            </option>

            <option value="Maize">
              Maize
            </option>

            <option value="Cotton">
              Cotton
            </option>

            <option value="Tomato">
              Tomato
            </option>

          </select>

          {error && (
            <div className="error-message">
              ⚠️ {error}
            </div>
          )}

          {success && (
            <div className="success-message">
              ✓ {success}
            </div>
          )}

          <button
            type="submit"
            className="login-button"
          >
            Create Account
          </button>

        </form>

        <div className="divider">
          <span>ALREADY HAVE AN ACCOUNT?</span>
        </div>

        <button
          className="create-button"
          onClick={() => {
            setIsCreateAccount(false);
            setError("");
            setSuccess("");
          }}
        >
          ← Back to Login
        </button>

        <p className="footer-text">
          Smart Irrigation AI • Farmer PWA
        </p>

      </div>

      <style jsx>{`

        .login-page {
          min-height: 100vh;

          display: flex;

          align-items: center;
          justify-content: center;

          padding: 20px;

          background:
            radial-gradient(
              circle at top right,
              rgba(
                34,
                197,
                94,
                0.12
              ),
              transparent 40%
            ),
            #07110d;

          color: #f1f8f4;
        }

        .login-card {
          width: 100%;
          max-width: 410px;

          padding: 30px 24px;

          border-radius: 28px;

          background:
            linear-gradient(
              145deg,
              #102219,
              #0b1710
            );

          border:
            1px solid
            rgba(
              101,
              229,
              138,
              0.14
            );

          box-shadow:
            0 25px 80px
            rgba(
              0,
              0,
              0,
              0.35
            );

          text-align: center;
        }

        .logo-box {
          width: 64px;
          height: 64px;

          margin:
            0 auto 12px;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 20px;

          background:
            rgba(
              74,
              222,
              128,
              0.12
            );

          font-size: 31px;
        }

        .brand {
          color: #68e890;

          font-size: 10px;

          font-weight: 800;

          letter-spacing: 3px;
        }

        h1 {
          margin:
            7px 0 5px;

          font-size: 25px;

          font-weight: 800;
        }

        .subtitle {
          margin:
            0 0 18px;

          color: #82978a;

          font-size: 12px;
        }

        .login-form {
          display: flex;

          flex-direction: column;

          text-align: left;
        }

        label {
          margin:
            10px 0 6px;

          color: #a9b9ae;

          font-size: 11px;

          font-weight: 700;
        }

        input,
        select {
          width: 100%;

          padding:
            12px 13px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.09
            );

          border-radius: 12px;

          outline: none;

          background: #09150f;

          color: #f1f8f4;

          font-size: 12px;
        }

        input:focus,
        select:focus {
          border-color:
            #42b962;
        }

        input::placeholder {
          color: #596a60;
        }

        select option {
          background: #0e1d15;
          color: white;
        }

        .login-button {
          width: 100%;

          margin-top: 18px;

          padding: 14px;

          border: 0;

          border-radius: 14px;

          background:
            linear-gradient(
              135deg,
              #35b85c,
              #218b43
            );

          color: white;

          font-size: 13px;

          font-weight: 800;

          cursor: pointer;
        }

        .login-button:hover {
          filter:
            brightness(
              1.08
            );
        }

        .divider {
          display: flex;

          align-items: center;

          gap: 8px;

          margin:
            20px 0 14px;

          color: #53645a;

          font-size: 8px;
        }

        .divider::before,
        .divider::after {
          content: "";

          flex: 1;

          height: 1px;

          background:
            rgba(
              255,
              255,
              255,
              0.08
            );
        }

        .create-button {
          width: 100%;

          padding: 13px;

          border:
            1px solid
            rgba(
              74,
              222,
              128,
              0.3
            );

          border-radius: 13px;

          background:
            rgba(
              74,
              222,
              128,
              0.06
            );

          color: #68e890;

          font-size: 12px;

          font-weight: 800;

          cursor: pointer;
        }

        .create-button:hover {
          background:
            rgba(
              74,
              222,
              128,
              0.12
            );
        }

        .error-message {
          margin-top: 10px;

          padding: 10px;

          border-radius: 10px;

          background:
            rgba(
              239,
              68,
              68,
              0.1
            );

          color: #ff8c8c;

          font-size: 10px;
        }

        .success-message {
          margin-top: 10px;

          padding: 10px;

          border-radius: 10px;

          background:
            rgba(
              74,
              222,
              128,
              0.1
            );

          color: #68e890;

          font-size: 10px;
        }

        .footer-text {
          margin:
            18px 0 0;

          color: #53645a;

          font-size: 9px;
        }

        @media (max-width: 430px) {

          .login-card {
            padding:
              25px 18px;
          }

        }

      `}</style>

    </main>
  );
}
