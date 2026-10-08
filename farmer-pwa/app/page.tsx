"use client";

import { useEffect, useRef, useState } from "react";
import LoginPage from "./login/page";

type Page =
  | "home"
  | "irrigation"
  | "field"
  | "alerts"
  | "settings";

type Language =
  | "English"
  | "Tamil"
  | "Hindi"
  | "Kannada";

type Farmer = {
  name: string;
  username: string;
  password?: string;
  location: string;
  fieldSize: string;
  cropType: string;
};

type NotificationItem = {
  id: number;
  title: string;
  message: string;
  time: string;
};

type SensorHistory = {
  day: string;
  soil: number;
  water: number;
  temperature: number;
  humidity: number;
  rainfall: number;
};

const cropVarieties: Record<string, string[]> = {
  Rice: ["Basmati", "Ponni", "IR20", "ADT"],
  Wheat: ["HD 2967", "PBW 343", "Sharbati"],
  Maize: ["Hybrid", "Sweet Corn", "Dent Corn"],
  Cotton: ["BT Cotton", "Long Staple"],
  Tomato: ["Cherry", "Roma", "Hybrid"],
};

const translations: Record<Language, Record<string, string>> = {
  English: {
    home: "Home",
    irrigation: "Irrigation",
    field: "Field",
    alerts: "Alerts",
    settings: "Settings",
    welcome: "Welcome back",
    liveStatus: "Live Field Status",
    soilMoisture: "Soil Moisture",
    waterLevel: "Water Level",
    temperature: "Temperature",
    humidity: "Humidity",
    rainfall: "Rainfall",
    recommendation: "AI Recommendation",
    irrigationNeeded: "Irrigation Needed",
    weather: "Weather",
    schedule: "Today's Schedule",
    startIrrigation: "Start Irrigation",
    fieldDetails: "Field Details",
    selectCrop: "Select Crop",
    saveSettings: "Save Settings",
    logout: "Logout",
    noAlerts: "No active alerts",
  },

  Tamil: {
    home: "முகப்பு",
    irrigation: "நீர்ப்பாசனம்",
    field: "வயல்",
    alerts: "எச்சரிக்கைகள்",
    settings: "அமைப்புகள்",
    welcome: "மீண்டும் வரவேற்கிறோம்",
    liveStatus: "வயல் நிலை",
    soilMoisture: "மண் ஈரப்பதம்",
    waterLevel: "நீர் மட்டம்",
    temperature: "வெப்பநிலை",
    humidity: "ஈரப்பதம்",
    rainfall: "மழைப்பொழிவு",
    recommendation: "AI பரிந்துரை",
    irrigationNeeded: "நீர்ப்பாசனம் தேவை",
    weather: "வானிலை",
    schedule: "இன்றைய அட்டவணை",
    startIrrigation: "நீர்ப்பாசனம் தொடங்கு",
    fieldDetails: "வயல் விவரங்கள்",
    selectCrop: "பயிரை தேர்வு செய்க",
    saveSettings: "அமைப்புகளை சேமி",
    logout: "வெளியேறு",
    noAlerts: "செயலில் எச்சரிக்கைகள் இல்லை",
  },

  Hindi: {
    home: "होम",
    irrigation: "सिंचाई",
    field: "खेत",
    alerts: "अलर्ट",
    settings: "सेटिंग्स",
    welcome: "वापसी पर स्वागत है",
    liveStatus: "खेत की स्थिति",
    soilMoisture: "मिट्टी की नमी",
    waterLevel: "पानी का स्तर",
    temperature: "तापमान",
    humidity: "नमी",
    rainfall: "वर्षा",
    recommendation: "AI सुझाव",
    irrigationNeeded: "सिंचाई आवश्यक है",
    weather: "मौसम",
    schedule: "आज का कार्यक्रम",
    startIrrigation: "सिंचाई शुरू करें",
    fieldDetails: "खेत का विवरण",
    selectCrop: "फसल चुनें",
    saveSettings: "सेटिंग्स सेव करें",
    logout: "लॉगआउट",
    noAlerts: "कोई सक्रिय अलर्ट नहीं",
  },

  Kannada: {
    home: "ಮುಖಪುಟ",
    irrigation: "ನೀರಾವರಿ",
    field: "ಹೊಲ",
    alerts: "ಎಚ್ಚರಿಕೆಗಳು",
    settings: "ಸೆಟ್ಟಿಂಗ್ಸ್",
    welcome: "ಮತ್ತೆ ಸ್ವಾಗತ",
    liveStatus: "ಹೊಲದ ಸ್ಥಿತಿ",
    soilMoisture: "ಮಣ್ಣಿನ ತೇವಾಂಶ",
    waterLevel: "ನೀರಿನ ಮಟ್ಟ",
    temperature: "ತಾಪಮಾನ",
    humidity: "ತೇವಾಂಶ",
    rainfall: "ಮಳೆ",
    recommendation: "AI ಶಿಫಾರಸು",
    irrigationNeeded: "ನೀರಾವರಿ ಅಗತ್ಯವಿದೆ",
    weather: "ಹವಾಮಾನ",
    schedule: "ಇಂದಿನ ವೇಳಾಪಟ್ಟಿ",
    startIrrigation: "ನೀರಾವರಿ ಪ್ರಾರಂಭಿಸಿ",
    fieldDetails: "ಹೊಲದ ವಿವರಗಳು",
    selectCrop: "ಬೆಳೆ ಆಯ್ಕೆಮಾಡಿ",
    saveSettings: "ಸೆಟ್ಟಿಂಗ್ಸ್ ಉಳಿಸಿ",
    logout: "ಲಾಗ್ ಔಟ್",
    noAlerts: "ಸಕ್ರಿಯ ಎಚ್ಚರಿಕೆಗಳಿಲ್ಲ",
  },
};

const sensorHistory: SensorHistory[] = [
  {
    day: "Mon",
    soil: 48,
    water: 82,
    temperature: 27,
    humidity: 61,
    rainfall: 2,
  },
  {
    day: "Tue",
    soil: 46,
    water: 80,
    temperature: 28,
    humidity: 63,
    rainfall: 0,
  },
  {
    day: "Wed",
    soil: 44,
    water: 78,
    temperature: 29,
    humidity: 65,
    rainfall: 4,
  },
  {
    day: "Thu",
    soil: 41,
    water: 76,
    temperature: 29,
    humidity: 67,
    rainfall: 1,
  },
  {
    day: "Fri",
    soil: 39,
    water: 75,
    temperature: 30,
    humidity: 69,
    rainfall: 0,
  },
  {
    day: "Sat",
    soil: 40,
    water: 76,
    temperature: 28,
    humidity: 66,
    rainfall: 3,
  },
];

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [farmer, setFarmer] =
    useState<Farmer | null>(null);

  const [currentPage, setCurrentPage] =
    useState<Page>("home");

  const [language, setLanguage] =
    useState<Language>("English");

  const [soilMoisture, setSoilMoisture] =
    useState(42);

  const [temperature, setTemperature] =
    useState(28);

  const [humidity, setHumidity] =
    useState(65);

  const [rainfall, setRainfall] =
    useState(0);

  const [waterLevel, setWaterLevel] =
    useState(75);

  const [irrigationNeeded, setIrrigationNeeded] =
    useState(false);

  const [notifications, setNotifications] =
    useState<NotificationItem[]>([]);

  const [alertSound, setAlertSound] =
    useState(true);

  const [showAlertPopup, setShowAlertPopup] =
    useState(false);

  const [irrigationStarted, setIrrigationStarted] =
    useState(false);

  const [cropType, setCropType] =
    useState("Rice");

  const [variety, setVariety] =
    useState("Basmati");

  const [analyticsMetric, setAnalyticsMetric] =
    useState<
      | "soil"
      | "water"
      | "temperature"
      | "humidity"
      | "rainfall"
    >("soil");

  const [isListening, setIsListening] =
    useState(false);

  const [voiceQuestion, setVoiceQuestion] =
    useState("");

  const [assistantReply, setAssistantReply] =
    useState("");

  const previousAlertState =
    useRef<Record<string, boolean>>({});

  const recognitionRef =
    useRef<any>(null);

  const t = translations[language];

  /* =====================================================
     LOAD SAVED DATA
  ===================================================== */

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedLanguage =
      localStorage.getItem("language");

    const savedAlertSound =
      localStorage.getItem("alertSound");

    const savedLoggedIn =
      localStorage.getItem("loggedIn");

    const savedFarmer =
      localStorage.getItem("farmer");

    if (
      savedLanguage &&
      [
        "English",
        "Tamil",
        "Hindi",
        "Kannada",
      ].includes(savedLanguage)
    ) {
      setLanguage(savedLanguage as Language);
    }

    if (savedAlertSound !== null) {
      setAlertSound(
        savedAlertSound === "true"
      );
    }

    if (savedLoggedIn === "true") {
      setIsLoggedIn(true);
    }

    if (savedFarmer) {
      try {
        const parsed = JSON.parse(savedFarmer);

        setFarmer(parsed);

        if (parsed.cropType) {
          setCropType(parsed.cropType);
        }
      } catch {
        console.log(
          "Unable to load farmer data"
        );
      }
    }
  }, []);

  /* =====================================================
     AI IRRIGATION DECISION
  ===================================================== */

  useEffect(() => {
    if (
      soilMoisture < 30 &&
      rainfall < 50
    ) {
      setIrrigationNeeded(true);
    } else if (
      rainfall >= 50 ||
      soilMoisture >= 50
    ) {
      setIrrigationNeeded(false);
    }
  }, [
    soilMoisture,
    rainfall,
  ]);

  /* =====================================================
     ALERT SOUND
  ===================================================== */

  function playAlertSound() {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as any).webkitAudioContext;

      if (!AudioContextClass) return;

      const audioContext =
        new AudioContextClass();

      if (
        audioContext.state ===
        "suspended"
      ) {
        audioContext.resume();
      }

      const oscillator =
        audioContext.createOscillator();

      const gainNode =
        audioContext.createGain();

      oscillator.type = "sine";

      oscillator.frequency.setValueAtTime(
        700,
        audioContext.currentTime
      );

      oscillator.frequency.setValueAtTime(
        850,
        audioContext.currentTime + 0.25
      );

      gainNode.gain.setValueAtTime(
        0.001,
        audioContext.currentTime
      );

      gainNode.gain.exponentialRampToValueAtTime(
        0.25,
        audioContext.currentTime + 0.03
      );

      gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 0.7
      );

      oscillator.connect(gainNode);

      gainNode.connect(
        audioContext.destination
      );

      oscillator.start();

      oscillator.stop(
        audioContext.currentTime + 0.7
      );

      setTimeout(() => {
        audioContext.close();
      }, 1000);
    } catch {
      console.log(
        "Alert sound unavailable"
      );
    }
  }

  /* =====================================================
     AUTOMATIC ALERT SYSTEM
  ===================================================== */

  useEffect(() => {
    const conditions = {
      lowWater: waterLevel < 20,
      lowSoil: soilMoisture < 30,
      heavyRain: rainfall >= 50,
      irrigation: irrigationNeeded,
    };

    Object.entries(conditions).forEach(
      ([key, active]) => {
        const wasActive =
          previousAlertState.current[key] ||
          false;

        if (
          active &&
          !wasActive
        ) {
          let title = "";
          let message = "";

          if (key === "lowWater") {
            title =
              "Low Water Level";

            message =
              "Water tank level is below 20%. Please refill the tank.";
          }

          if (key === "lowSoil") {
            title =
              "Low Soil Moisture";

            message =
              "Soil moisture is below 30%. Irrigation is recommended.";
          }

          if (key === "heavyRain") {
            title =
              "Heavy Rainfall";

            message =
              "Heavy rainfall detected. Irrigation may not be required.";
          }

          if (key === "irrigation") {
            title =
              "Irrigation Needed";

            message =
              "AI recommends irrigation based on current field conditions.";
          }

          const notification: NotificationItem = {
            id:
              Date.now() +
              Math.random(),

            title,

            message,

            time:
              new Date().toLocaleTimeString(),
          };

          setNotifications(
            (prev) => [
              notification,
              ...prev,
            ]
          );

          setShowAlertPopup(true);

          if (alertSound) {
            playAlertSound();
          }

          setTimeout(() => {
            setShowAlertPopup(
              false
            );
          }, 5000);
        }

        previousAlertState.current[key] =
          active;
      }
    );
  }, [
    waterLevel,
    soilMoisture,
    rainfall,
    irrigationNeeded,
    alertSound,
  ]);

  /* =====================================================
     LOGIN
  ===================================================== */

  function handleLoginSuccess(
    loggedFarmer?: Farmer
  ) {
    setIsLoggedIn(true);

    localStorage.setItem(
      "loggedIn",
      "true"
    );

    setCurrentPage("home");

    if (loggedFarmer) {
      setFarmer(loggedFarmer);

      localStorage.setItem(
        "farmer",
        JSON.stringify(
          loggedFarmer
        )
      );

      if (
        loggedFarmer.cropType
      ) {
        setCropType(
          loggedFarmer.cropType
        );
      }
    }
  }

  /* =====================================================
     LOGOUT
  ===================================================== */

  function handleLogout() {
    localStorage.removeItem(
      "loggedIn"
    );

    setIsLoggedIn(false);
    setFarmer(null);
    setCurrentPage("home");

    setNotifications([]);
  }

  /* =====================================================
     CROP CHANGE
  ===================================================== */

  function handleCropChange(
    selectedCrop: string
  ) {
    setCropType(
      selectedCrop
    );

    const available =
      cropVarieties[
        selectedCrop
      ] || [];

    setVariety(
      available[0] || ""
    );
  }

  /* =====================================================
     IRRIGATION
  ===================================================== */

  function startIrrigation() {
    setIrrigationStarted(
      true
    );

    setTimeout(() => {
      setIrrigationStarted(
        false
      );
    }, 4000);
  }

  /* =====================================================
     VOICE ASSISTANT
  ===================================================== */

  const languageMap: Record<
    Language,
    string
  > = {
    English: "en-IN",
    Tamil: "ta-IN",
    Hindi: "hi-IN",
    Kannada: "kn-IN",
  };

  function speakReply(
    text: string
  ) {
    if (
      typeof window ===
        "undefined" ||
      !window.speechSynthesis
    ) {
      return;
    }

    window.speechSynthesis.cancel();

    const speech =
      new SpeechSynthesisUtterance(
        text
      );

    speech.lang =
      languageMap[language];

    speech.rate = 0.85;
    speech.pitch = 1;
    speech.volume = 1;

    window.speechSynthesis.speak(
      speech
    );
  }

  function askFarmerAssistant(
    question: string
  ): string {
    const q =
      question.toLowerCase();

    if (
      q.includes("moisture") ||
      q.includes("soil") ||
      q.includes("மண்") ||
      q.includes("नमी")
    ) {
      if (
        language === "Tamil"
      ) {
        return `உங்கள் மண் ஈரப்பதம் ${soilMoisture} சதவீதம். ${
          soilMoisture < 30
            ? "நீர்ப்பாசனம் தேவை."
            : "மண் ஈரப்பதம் தற்போது நன்றாக உள்ளது."
        }`;
      }

      if (
        language === "Hindi"
      ) {
        return `आपके खेत की मिट्टी की नमी ${soilMoisture} प्रतिशत है। ${
          soilMoisture < 30
            ? "सिंचाई की आवश्यकता है।"
            : "मिट्टी की नमी अभी अच्छी है।"
        }`;
      }

      if (
        language === "Kannada"
      ) {
        return `ನಿಮ್ಮ ಹೊಲದ ಮಣ್ಣಿನ ತೇವಾಂಶ ${soilMoisture} ಶೇಕಡಾ. ${
          soilMoisture < 30
            ? "ನೀರಾವರಿ ಅಗತ್ಯವಿದೆ."
            : "ಮಣ್ಣಿನ ತೇವಾಂಶ ಈಗ ಉತ್ತಮವಾಗಿದೆ."
        }`;
      }

      return `Your soil moisture is ${soilMoisture} percent. ${
        soilMoisture < 30
          ? "Irrigation is recommended."
          : "The soil moisture is currently healthy."
      }`;
    }

    if (
      q.includes("water") ||
      q.includes("tank") ||
      q.includes("நீர்") ||
      q.includes("पानी")
    ) {
      if (
        language === "Tamil"
      ) {
        return `உங்கள் நீர் தொட்டி ${waterLevel} சதவீதம் நிரம்பியுள்ளது.`;
      }

      if (
        language === "Hindi"
      ) {
        return `आपकी पानी की टंकी ${waterLevel} प्रतिशत भरी हुई है।`;
      }

      if (
        language === "Kannada"
      ) {
        return `ನಿಮ್ಮ ನೀರಿನ ಟ್ಯಾಂಕ್ ${waterLevel} ಶೇಕಡಾ ತುಂಬಿದೆ.`;
      }

      return `Your water tank is ${waterLevel} percent full.`;
    }

    if (
      q.includes("temperature") ||
      q.includes("weather") ||
      q.includes("வானிலை") ||
      q.includes("மழைநிலை") ||
      q.includes("मौसम")
    ) {
      if (
        language === "Tamil"
      ) {
        return `தற்போதைய வெப்பநிலை ${temperature} டிகிரி செல்சியஸ். ஈரப்பதம் ${humidity} சதவீதம்.`;
      }

      if (
        language === "Hindi"
      ) {
        return `वर्तमान तापमान ${temperature} डिग्री सेल्सियस है और नमी ${humidity} प्रतिशत है।`;
      }

      if (
        language === "Kannada"
      ) {
        return `ಪ್ರಸ್ತುತ ತಾಪಮಾನ ${temperature} ಡಿಗ್ರಿ ಸೆಲ್ಸಿಯಸ್ ಮತ್ತು ತೇವಾಂಶ ${humidity} ಶೇಕಡಾ.`;
      }

      return `The current temperature is ${temperature} degrees Celsius and humidity is ${humidity} percent.`;
    }

    if (
      q.includes("irrigation") ||
      q.includes("irrigate") ||
      q.includes("நீர்ப்பாசனம்") ||
      q.includes("सिंचाई")
    ) {
      if (
        language === "Tamil"
      ) {
        return irrigationNeeded
          ? "AI பரிந்துரைப்படி தற்போது நீர்ப்பாசனம் தேவைப்படுகிறது."
          : "தற்போது நீர்ப்பாசனம் தேவையில்லை.";
      }

      if (
        language === "Hindi"
      ) {
        return irrigationNeeded
          ? "AI सुझाव के अनुसार अभी सिंचाई की आवश्यकता है।"
          : "अभी सिंचाई की आवश्यकता नहीं है।";
      }

      if (
        language === "Kannada"
      ) {
        return irrigationNeeded
          ? "AI ಶಿಫಾರಸಿನ ಪ್ರಕಾರ ಈಗ ನೀರಾವರಿ ಅಗತ್ಯವಿದೆ."
          : "ಈಗ ನೀರಾವರಿ ಅಗತ್ಯವಿಲ್ಲ.";
      }

      return irrigationNeeded
        ? "According to the AI recommendation, irrigation is currently needed."
        : "Irrigation is not currently required.";
    }

    if (
      q.includes("rain") ||
      q.includes("rainfall") ||
      q.includes("மழை") ||
      q.includes("बारिश")
    ) {
      if (
        language === "Tamil"
      ) {
        return `இன்றைய மழைப்பொழிவு ${rainfall} மில்லிமீட்டர்.`;
      }

      if (
        language === "Hindi"
      ) {
        return `आज की वर्षा ${rainfall} मिलीमीटर है।`;
      }

      if (
        language === "Kannada"
      ) {
        return `ಇಂದಿನ ಮಳೆ ${rainfall} ಮಿಲಿಮೀಟರ್ ಆಗಿದೆ.`;
      }

      return `Today's rainfall is ${rainfall} millimeters.`;
    }

    if (
      q.includes("hello") ||
      q.includes("hi") ||
      q.includes("வணக்கம்") ||
      q.includes("नमस्ते")
    ) {
      if (
        language === "Tamil"
      ) {
        return "வணக்கம்! உங்கள் வயல் நிலையைப் பற்றி என்னிடம் கேட்கலாம்.";
      }

      if (
        language === "Hindi"
      ) {
        return "नमस्ते! आप अपने खेत की स्थिति के बारे में मुझसे पूछ सकते हैं।";
      }

      if (
        language === "Kannada"
      ) {
        return "ನಮಸ್ಕಾರ! ನಿಮ್ಮ ಹೊಲದ ಸ್ಥಿತಿಯ ಬಗ್ಗೆ ನನ್ನನ್ನು ಕೇಳಬಹುದು.";
      }

      return "Hello! You can ask me about your field, soil, water, weather or irrigation.";
    }

    if (
      language === "Tamil"
    ) {
      return "மண் ஈரப்பதம், நீர் மட்டம், வானிலை அல்லது நீர்ப்பாசனம் பற்றி கேளுங்கள்.";
    }

    if (
      language === "Hindi"
    ) {
      return "आप मिट्टी की नमी, पानी का स्तर, मौसम या सिंचाई के बारे में पूछ सकते हैं।";
    }

    if (
      language === "Kannada"
    ) {
      return "ಮಣ್ಣಿನ ತೇವಾಂಶ, ನೀರಿನ ಮಟ್ಟ, ಹವಾಮಾನ ಅಥವಾ ನೀರಾವರಿ ಬಗ್ಗೆ ಕೇಳಿ.";
    }

    return "You can ask me about soil moisture, water level, weather, rainfall or irrigation.";
  }

  function startVoiceAssistant() {
    if (
      typeof window ===
      "undefined"
    ) {
      return;
    }

    const SpeechRecognition =
      (window as any)
        .SpeechRecognition ||
      (window as any)
        .webkitSpeechRecognition;

    if (!SpeechRecognition) {
      const message =
        "Voice recognition is not supported in this browser. Please use Google Chrome.";

      setAssistantReply(
        message
      );

      speakReply(message);

      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.lang =
      languageMap[language];

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognitionRef.current =
      recognition;

    recognition.onstart =
      () => {
        setIsListening(true);
        setVoiceQuestion("");
      };

    recognition.onresult =
      (event: any) => {
        const transcript =
          event.results[0][0]
            .transcript;

        setVoiceQuestion(
          transcript
        );

        const reply =
          askFarmerAssistant(
            transcript
          );

        setAssistantReply(
          reply
        );

        setTimeout(() => {
          speakReply(reply);
        }, 300);
      };

    recognition.onerror =
      () => {
        setIsListening(false);

        const message =
          "I could not understand the voice. Please try again.";

        setAssistantReply(
          message
        );
      };

    recognition.onend =
      () => {
        setIsListening(false);
      };

    recognition.start();
  }

  function askQuickQuestion(
    question: string
  ) {
    setVoiceQuestion(
      question
    );

    const reply =
      askFarmerAssistant(
        question
      );

    setAssistantReply(
      reply
    );

    setTimeout(() => {
      speakReply(reply);
    }, 300);
  }

  /* =====================================================
     SENSOR TESTING
  ===================================================== */

  function testSoilAlert() {
    setSoilMoisture(25);
  }

  function testWaterAlert() {
    setWaterLevel(15);
  }

  function testRainAlert() {
    setRainfall(60);
  }

  function testIrrigationAlert() {
    setSoilMoisture(25);
    setRainfall(0);
  }

  function resetSensors() {
    setSoilMoisture(42);
    setWaterLevel(75);
    setRainfall(0);

    setIrrigationNeeded(false);

    previousAlertState.current = {};
  }

  /* =====================================================
     ANALYTICS
  ===================================================== */

  const analyticsData: SensorHistory[] =
    [
      ...sensorHistory,
      {
        day: "Today",
        soil: soilMoisture,
        water: waterLevel,
        temperature,
        humidity,
        rainfall,
      },
    ];

  const metricConfig = {
    soil: {
      title: "Soil Moisture",
      unit: "%",
      key: "soil" as const,
    },

    water: {
      title: "Water Level",
      unit: "%",
      key: "water" as const,
    },

    temperature: {
      title: "Temperature",
      unit: "°C",
      key: "temperature" as const,
    },

    humidity: {
      title: "Humidity",
      unit: "%",
      key: "humidity" as const,
    },

    rainfall: {
      title: "Rainfall",
      unit: "mm",
      key: "rainfall" as const,
    },
  };

  const currentMetric =
    metricConfig[
      analyticsMetric
    ];

  const metricValues =
    analyticsData.map(
      (item) =>
        item[
          currentMetric.key
        ]
    );

  const maxMetric =
    Math.max(
      ...metricValues,
      1
    );

  const averageMetric =
    metricValues.reduce(
      (sum, value) =>
        sum + value,
      0
    ) /
    metricValues.length;

  /* =====================================================
     DOWNLOAD REPORT
  ===================================================== */

  function downloadReport() {
    const farmerName =
      farmer?.name ||
      "Farmer";

    const location =
      farmer?.location ||
      "Field location";

    const fieldSize =
      farmer?.fieldSize ||
      "Not specified";

    const report = `
SMART IRRIGATION FARMER REPORT
================================

Farmer Name: ${farmerName}
Location: ${location}
Field Size: ${fieldSize}
Crop: ${cropType}
Variety: ${variety}

CURRENT SENSOR STATUS
--------------------------------
Soil Moisture: ${soilMoisture}%
Water Level: ${waterLevel}%
Temperature: ${temperature}°C
Humidity: ${humidity}%
Rainfall: ${rainfall} mm

AI RECOMMENDATION
--------------------------------
${
  irrigationNeeded
    ? "Irrigation is currently recommended."
    : "Irrigation is currently not required."
}

ANALYTICS
--------------------------------
Selected Metric: ${currentMetric.title}
Average: ${averageMetric.toFixed(
      2
    )} ${currentMetric.unit}

ALERTS
--------------------------------
Active Notifications: ${notifications.length}

Generated by Smart Irrigation AI
`;

    const blob =
      new Blob(
        [report],
        {
          type: "text/plain;charset=utf-8",
        }
      );

    const url =
      URL.createObjectURL(
        blob
      );

    const link =
      document.createElement(
        "a"
      );

    link.href = url;

    link.download =
      "smart-irrigation-report.txt";

    document.body.appendChild(
      link
    );

    link.click();

    document.body.removeChild(
      link
    );

    URL.revokeObjectURL(
      url
    );
  }

  /* =====================================================
     SAVE LANGUAGE
  ===================================================== */

  function changeLanguage(
    newLanguage: Language
  ) {
    setLanguage(
      newLanguage
    );

    localStorage.setItem(
      "language",
      newLanguage
    );
  }

  /* =====================================================
     ALERT SOUND SETTING
  ===================================================== */

  function changeAlertSound(
    enabled: boolean
  ) {
    setAlertSound(
      enabled
    );

    localStorage.setItem(
      "alertSound",
      String(enabled)
    );
  }

  /* =====================================================
     CLEAR ALERTS
  ===================================================== */

  function clearAlerts() {
    setNotifications([]);
    setShowAlertPopup(false);
  }

  /* =====================================================
     LOGIN SCREEN
  ===================================================== */

  if (!isLoggedIn) {
    return (
      <LoginPage
        onLogin={
          handleLoginSuccess
        }
      />
    );
  }

  /* =====================================================
     NAVIGATION ICONS
  ===================================================== */

  function NavIcon({
    page,
  }: {
    page: Page;
  }) {
    if (
      page === "home"
    ) {
      return (
        <span>⌂</span>
      );
    }

    if (
      page === "irrigation"
    ) {
      return (
        <span>💧</span>
      );
    }

    if (
      page === "field"
    ) {
      return (
        <span>🌾</span>
      );
    }

    if (
      page === "alerts"
    ) {
      return (
        <span>🔔</span>
      );
    }

    return (
      <span>⚙️</span>
    );
  }

  /* =====================================================
     HEADER
  ===================================================== */

  function Header({
    title,
  }: {
    title: string;
  }) {
    return (
      <header className="app-header">
        <div>
          <div className="brand-small">
            SMART FARM
          </div>

          <h1>
            {title}
          </h1>
        </div>

        <button
          className="header-alert-button"
          onClick={() =>
            setCurrentPage(
              "alerts"
            )
          }
          aria-label="Alerts"
        >
          🔔

          {notifications.length >
            0 && (
            <span className="notification-dot">
              {
                notifications.length
              }
            </span>
          )}
        </button>
      </header>
    );
  }

  /* =====================================================
     HOME PAGE
  ===================================================== */

  function HomePage() {
    const firstName =
      farmer?.name?.split(
        " "
      )[0] ||
      "Farmer";

    return (
      <div className="page">
        <Header title="Smart Irrigation" />

        <div className="content">

          <section className="welcome-card">
            <div>
              <p className="muted">
                {t.welcome}
              </p>

              <h2>
                Hello, {firstName} 👋
              </h2>

              <p>
                Monitor your field and
                manage irrigation easily.
              </p>
            </div>

            <div className="field-icon">
              🌱
            </div>
          </section>

          <section>
            <div className="section-title">
              <h2>
                {t.liveStatus}
              </h2>

              <span className="live-badge">
                ● LIVE
              </span>
            </div>

            <div className="sensor-grid">

              <SensorCard
                icon="🌱"
                title={
                  t.soilMoisture
                }
                value={`${soilMoisture}%`}
                status={
                  soilMoisture <
                  30
                    ? "Low"
                    : "Healthy"
                }
                danger={
                  soilMoisture <
                  30
                }
              />

              <SensorCard
                icon="💧"
                title={
                  t.waterLevel
                }
                value={`${waterLevel}%`}
                status={
                  waterLevel <
                  20
                    ? "Low"
                    : "Available"
                }
                danger={
                  waterLevel <
                  20
                }
              />

              <SensorCard
                icon="🌡️"
                title={
                  t.temperature
                }
                value={`${temperature}°C`}
                status="Normal"
              />

              <SensorCard
                icon="💨"
                title={t.humidity}
                value={`${humidity}%`}
                status="Normal"
              />

              <SensorCard
                icon="🌧️"
                title={t.rainfall}
                value={`${rainfall} mm`}
                status={
                  rainfall >=
                  50
                    ? "Heavy"
                    : "Normal"
                }
                danger={
                  rainfall >=
                  50
                }
              />

            </div>
          </section>

          <section className="recommendation-card">
            <div className="recommendation-icon">
              🤖
            </div>

            <div className="recommendation-content">
              <span className="small-label">
                {t.recommendation}
              </span>

              <h2>
                {irrigationNeeded
                  ? t.irrigationNeeded
                  : "Irrigation Not Required"}
              </h2>

              <p>
                {irrigationNeeded
                  ? "Based on current soil and weather conditions, irrigation is recommended."
                  : "Current field conditions indicate that irrigation is not required."}
              </p>
            </div>
          </section>

          <section className="weather-card">
            <div>
              <span className="small-label">
                {t.weather}
              </span>

              <h2>
                ☀️ {temperature}°C
              </h2>

              <p>
                Clear weather
              </p>
            </div>

            <div className="weather-details">
              <span>
                💨 {humidity}% humidity
              </span>

              <span>
                🌧️ {rainfall} mm rain
              </span>
            </div>
          </section>

          <section className="schedule-card">
            <div className="section-title">
              <h2>
                {t.schedule}
              </h2>

              <button
                className="text-button"
                onClick={() =>
                  setCurrentPage(
                    "irrigation"
                  )
                }
              >
                View
              </button>
            </div>

            <div className="schedule-row">
              <div className="schedule-time">
                06:00 AM
              </div>

              <div>
                <strong>
                  Morning Irrigation
                </strong>

                <p>
                  20 minutes • Field 1
                </p>
              </div>

              <span className="scheduled">
                Scheduled
              </span>
            </div>

            <div className="schedule-row">
              <div className="schedule-time">
                05:30 PM
              </div>

              <div>
                <strong>
                  Evening Check
                </strong>

                <p>
                  Soil moisture monitoring
                </p>
              </div>

              <span className="pending">
                Pending
              </span>
            </div>
          </section>

          {/* =================================================
              SENSOR TESTING
          ================================================= */}

          <section className="testing-card">

            <div className="section-title">
              <div>
                <h2>
                  🧪 Sensor Testing
                </h2>

                <p>
                  Test automatic alerts
                </p>
              </div>
            </div>

            <div className="testing-status">

              <div>
                <span>
                  Soil
                </span>

                <strong>
                  {soilMoisture}%
                </strong>
              </div>

              <div>
                <span>
                  Water
                </span>

                <strong>
                  {waterLevel}%
                </strong>
              </div>

              <div>
                <span>
                  Rain
                </span>

                <strong>
                  {rainfall} mm
                </strong>
              </div>

            </div>

            <div className="test-buttons">

              <button
                onClick={
                  testSoilAlert
                }
              >
                🌱 Test Soil Alert
              </button>

              <button
                onClick={
                  testWaterAlert
                }
              >
                💧 Test Water Alert
              </button>

              <button
                onClick={
                  testRainAlert
                }
              >
                🌧️ Test Rain Alert
              </button>

              <button
                onClick={
                  testIrrigationAlert
                }
              >
                🚿 Test Irrigation
              </button>

              <button
                className="reset-test"
                onClick={
                  resetSensors
                }
              >
                ↻ Reset Sensors
              </button>

            </div>

          </section>

          {/* =================================================
              FARMER ASSISTANT
          ================================================= */}

          <section className="assistant-card">

            <div className="assistant-top">

              <div>
                <span className="assistant-icon">
                  🤖
                </span>

                <div>
                  <h2>
                    Farmer Assistant
                  </h2>

                  <p>
                    Ask about your field
                  </p>
                </div>
              </div>

              <button
                className={
                  isListening
                    ? "mic-button listening"
                    : "mic-button"
                }
                onClick={
                  startVoiceAssistant
                }
              >
                {isListening
                  ? "⏹"
                  : "🎤"}
              </button>

            </div>

            {voiceQuestion && (
              <div className="voice-question">
                <strong>
                  You:
                </strong>{" "}
                {voiceQuestion}
              </div>
            )}

            {assistantReply && (
              <div className="assistant-reply">
                <strong>
                  AI:
                </strong>{" "}
                {assistantReply}
              </div>
            )}

            <div className="quick-questions">

              <button
                onClick={() =>
                  askQuickQuestion(
                    "What is my soil moisture?"
                  )
                }
              >
                🌱 Soil
              </button>

              <button
                onClick={() =>
                  askQuickQuestion(
                    "What is my water level?"
                  )
                }
              >
                💧 Water
              </button>

              <button
                onClick={() =>
                  askQuickQuestion(
                    "What is the weather?"
                  )
                }
              >
                ☀️ Weather
              </button>

              <button
                onClick={() =>
                  askQuickQuestion(
                    "Is irrigation needed?"
                  )
                }
              >
                🚿 Irrigation
              </button>

            </div>

          </section>

        </div>
      </div>
    );
  }

  /* =====================================================
     SENSOR CARD
  ===================================================== */

  function SensorCard({
    icon,
    title,
    value,
    status,
    danger,
  }: {
    icon: string;
    title: string;
    value: string;
    status: string;
    danger?: boolean;
  }) {
    return (
      <div
        className={
          danger
            ? "sensor-card danger"
            : "sensor-card"
        }
      >

        <div className="sensor-icon">
          {icon}
        </div>

        <div className="sensor-title">
          {title}
        </div>

        <div className="sensor-value">
          {value}
        </div>

        <div
          className={
            danger
              ? "sensor-status danger-text"
              : "sensor-status"
          }
        >
          ● {status}
        </div>

      </div>
    );
  }

  /* =====================================================
     IRRIGATION PAGE
  ===================================================== */

  function IrrigationPage() {
    return (
      <div className="page">

        <Header
          title={t.irrigation}
        />

        <div className="content">

          <section className="irrigation-main-card">

            <div className="water-drop-large">
              💧
            </div>

            <h2>
              Smart Irrigation Control
            </h2>

            <p>
              Control irrigation based
              on AI recommendations and
              current field conditions.
            </p>

            <div className="irrigation-status">

              <div>
                <span>
                  Soil Moisture
                </span>

                <strong>
                  {soilMoisture}%
                </strong>
              </div>

              <div>
                <span>
                  Water Level
                </span>

                <strong>
                  {waterLevel}%
                </strong>
              </div>

            </div>

            <button
              className={
                irrigationStarted
                  ? "primary-button running"
                  : "primary-button"
              }
              onClick={
                startIrrigation
              }
              disabled={
                irrigationStarted
              }
            >
              {irrigationStarted
                ? "💧 Irrigation Running..."
                : `💧 ${t.startIrrigation}`}
            </button>

            {irrigationStarted && (
              <div className="success-message">
                ✓ Irrigation started
                successfully.
              </div>
            )}

          </section>

          <section className="info-card">

            <h2>
              AI Decision
            </h2>

            <div className="decision-row">
              <span>
                Soil Condition
              </span>

              <strong>
                {soilMoisture <
                30
                  ? "Dry"
                  : "Healthy"}
              </strong>
            </div>

            <div className="decision-row">
              <span>
                Rainfall
              </span>

              <strong>
                {rainfall} mm
              </strong>
            </div>

            <div className="decision-row">

              <span>
                Irrigation
              </span>

              <strong
                className={
                  irrigationNeeded
                    ? "danger-text"
                    : "success-text"
                }
              >
                {irrigationNeeded
                  ? "Recommended"
                  : "Not Required"}
              </strong>

            </div>

          </section>

          <section className="schedule-card">

            <h2>
              Irrigation Schedule
            </h2>

            <div className="schedule-large">

              <div>
                <span>
                  Morning
                </span>

                <strong>
                  06:00 AM
                </strong>
              </div>

              <div>
                <span>
                  Duration
                </span>

                <strong>
                  20 min
                </strong>
              </div>

              <div>
                <span>
                  Status
                </span>

                <strong>
                  Scheduled
                </strong>
              </div>

            </div>

            <div className="schedule-large">

              <div>
                <span>
                  Evening
                </span>

                <strong>
                  05:30 PM
                </strong>
              </div>

              <div>
                <span>
                  Duration
                </span>

                <strong>
                  15 min
                </strong>
              </div>

              <div>
                <span>
                  Status
                </span>

                <strong>
                  Pending
                </strong>
              </div>

            </div>

          </section>

        </div>
      </div>
    );
  }

  /* =====================================================
     FIELD PAGE
  ===================================================== */

  function FieldPage() {
    const varieties =
      cropVarieties[
        cropType
      ] || [];

    return (
      <div className="page">

        <Header
          title={
            t.fieldDetails
          }
        />

        <div className="content">

          <section className="profile-card">

            <div className="profile-avatar">
              {farmer?.name
                ?.charAt(0)
                ?.toUpperCase() ||
                "F"}
            </div>

            <div>

              <h2>
                {farmer?.name ||
                  "Farmer"}
              </h2>

              <p>
                Farmer Profile
              </p>

            </div>

          </section>

          <section className="form-card">

            <label>
              Farmer Name
            </label>

            <input
              value={
                farmer?.name ||
                ""
              }
              readOnly
            />

            <label>
              Location
            </label>

            <input
              value={
                farmer?.location ||
                ""
              }
              readOnly
            />

            <label>
              Field Size
            </label>

            <input
              value={
                farmer?.fieldSize ||
                ""
              }
              readOnly
            />

            <label>
              {t.selectCrop}
            </label>

            <select
              value={cropType}
              onChange={(e) =>
                handleCropChange(
                  e.target.value
                )
              }
            >
              {Object.keys(
                cropVarieties
              ).map(
                (crop) => (
                  <option
                    key={crop}
                    value={crop}
                  >
                    {crop}
                  </option>
                )
              )}
            </select>

            <label>
              Crop Variety
            </label>

            <select
              value={variety}
              onChange={(e) =>
                setVariety(
                  e.target.value
                )
              }
            >
              {varieties.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                )
              )}
            </select>

            <button
              className="primary-button"
              onClick={() => {

                const updatedFarmer =
                  {
                    ...farmer,
                    cropType,
                  };

                setFarmer(
                  updatedFarmer as Farmer
                );

                localStorage.setItem(
                  "farmer",
                  JSON.stringify(
                    updatedFarmer
                  )
                );

              }}
            >
              ✓ Save Field Details
            </button>

          </section>

          <section className="info-card">

            <h2>
              Field Summary
            </h2>

            <div className="summary-grid">

              <div>
                <span>
                  Crop
                </span>

                <strong>
                  {cropType}
                </strong>
              </div>

              <div>
                <span>
                  Variety
                </span>

                <strong>
                  {variety}
                </strong>
              </div>

              <div>
                <span>
                  Moisture
                </span>

                <strong>
                  {soilMoisture}%
                </strong>
              </div>

              <div>
                <span>
                  Water
                </span>

                <strong>
                  {waterLevel}%
                </strong>
              </div>

            </div>

          </section>

        </div>
      </div>
    );
  }

  /* =====================================================
     ALERT PAGE
  ===================================================== */

  function AlertsPage() {
    return (
      <div className="page">

        <Header
          title={t.alerts}
        />

        <div className="content">

          <section className="alert-summary">

            <div className="alert-summary-icon">
              🔔
            </div>

            <div>
              <h2>
                {notifications.length}
              </h2>

              <p>
                Active Notifications
              </p>
            </div>

            {notifications.length >
              0 && (
              <button
                className="clear-button"
                onClick={
                  clearAlerts
                }
              >
                Clear
              </button>
            )}

          </section>

          {notifications.length ===
          0 ? (
            <section className="empty-card">

              <div>
                ✓
              </div>

              <h2>
                {t.noAlerts}
              </h2>

              <p>
                Your field currently has
                no active alerts.
              </p>

            </section>
          ) : (
            <div className="alert-list">

              {notifications.map(
                (
                  notification
                ) => (
                  <div
                    className="alert-item"
                    key={
                      notification.id
                    }
                  >

                    <div className="alert-icon">
                      ⚠️
                    </div>

                    <div className="alert-body">

                      <h3>
                        {
                          notification.title
                        }
                      </h3>

                      <p>
                        {
                          notification.message
                        }
                      </p>

                      <span>
                        {
                          notification.time
                        }
                      </span>

                    </div>

                  </div>
                )
              )}

            </div>
          )}

          <section className="info-card">

            <h2>
              Alert Conditions
            </h2>

            <div className="condition-row">
              <span>
                💧 Low Water
              </span>

              <strong>
                &lt; 20%
              </strong>
            </div>

            <div className="condition-row">
              <span>
                🌱 Low Soil Moisture
              </span>

              <strong>
                &lt; 30%
              </strong>
            </div>

            <div className="condition-row">
              <span>
                🌧️ Heavy Rain
              </span>

              <strong>
                ≥ 50 mm
              </strong>
            </div>

            <div className="condition-row">
              <span>
                🚿 Irrigation Needed
              </span>

              <strong>
                AI Based
              </strong>
            </div>

          </section>

        </div>
      </div>
    );
  }

  /* =====================================================
     SETTINGS PAGE
  ===================================================== */

  function SettingsPage() {
    return (
      <div className="page">

        <Header
          title={t.settings}
        />

        <div className="content">

          <section className="settings-profile">

            <div className="profile-avatar large">
              {farmer?.name
                ?.charAt(0)
                ?.toUpperCase() ||
                "F"}
            </div>

            <div>

              <h2>
                {farmer?.name ||
                  "Farmer"}
              </h2>

              <p>
                {farmer?.username ||
                  ""}
              </p>

            </div>

          </section>

          <section className="settings-card">

            <h2>
              Language
            </h2>

            <p>
              Choose your preferred
              language.
            </p>

            <select
              value={language}
              onChange={(e) =>
                changeLanguage(
                  e.target.value as Language
                )
              }
            >
              <option value="English">
                English
              </option>

              <option value="Tamil">
                தமிழ்
              </option>

              <option value="Hindi">
                हिन्दी
              </option>

              <option value="Kannada">
                ಕನ್ನಡ
              </option>
            </select>

          </section>

          <section className="settings-card">

            <div className="setting-row">

              <div>

                <h2>
                  Alert Sound
                </h2>

                <p>
                  Play sound when a critical
                  field alert occurs.
                </p>

              </div>

              <button
                className={
                  alertSound
                    ? "toggle active"
                    : "toggle"
                }
                onClick={() =>
                  changeAlertSound(
                    !alertSound
                  )
                }
              >
                <span />
              </button>

            </div>

          </section>

          <section className="settings-card">

            <h2>
              App Information
            </h2>

            <div className="info-line">

              <span>
                Application
              </span>

              <strong>
                Smart Irrigation AI
              </strong>

            </div>

            <div className="info-line">

              <span>
                Version
              </span>

              <strong>
                1.0.0
              </strong>

            </div>

            <div className="info-line">

              <span>
                System
              </span>

              <strong>
                Farmer PWA
              </strong>

            </div>

          </section>

          <button
            className="download-button"
            onClick={
              downloadReport
            }
          >
            📄 Download Field Report
          </button>

          <button
            className="logout-button"
            onClick={
              handleLogout
            }
          >
            🚪 {t.logout}
          </button>

        </div>
      </div>
    );
  }

  /* =====================================================
     ANALYTICS
  ===================================================== */

  function AnalyticsSection() {
    return (
      <section className="analytics-card">

        <div className="section-title">

          <div>

            <h2>
              Field Analytics
            </h2>

            <p>
              Last 7 readings
            </p>

          </div>

          <select
            value={
              analyticsMetric
            }
            onChange={(e) =>
              setAnalyticsMetric(
                e.target
                  .value as
                  | "soil"
                  | "water"
                  | "temperature"
                  | "humidity"
                  | "rainfall"
              )
            }
          >

            <option value="soil">
              Soil Moisture
            </option>

            <option value="water">
              Water Level
            </option>

            <option value="temperature">
              Temperature
            </option>

            <option value="humidity">
              Humidity
            </option>

            <option value="rainfall">
              Rainfall
            </option>

          </select>

        </div>

        <div className="average-box">

          <span>
            Average{" "}
            {
              currentMetric.title
            }
          </span>

          <strong>
            {averageMetric.toFixed(
              1
            )}
            {
              currentMetric.unit
            }
          </strong>

        </div>

        <div className="chart">

          {analyticsData.map(
            (item) => {

              const value =
                item[
                  currentMetric.key
                ];

              const height =
                Math.max(
                  8,
                  (value /
                    maxMetric) *
                    100
                );

              return (
                <div
                  className="chart-column"
                  key={
                    item.day
                  }
                >

                  <span className="chart-value">
                    {value}
                  </span>

                  <div className="bar-wrapper">

                    <div
                      className="chart-bar"
                      style={{
                        height:
                          `${height}%`,
                      }}
                    />

                  </div>

                  <span className="chart-label">
                    {item.day}
                  </span>

                </div>
              );
            }
          )}

        </div>

      </section>
    );
  }

  /* =====================================================
     MAIN PAGE CONTENT
  ===================================================== */

  function renderPage() {

    if (
      currentPage === "home"
    ) {
      return (
        <>
          <HomePage />

          <div className="content analytics-wrapper">
            <AnalyticsSection />
          </div>
        </>
      );
    }

    if (
      currentPage ===
      "irrigation"
    ) {
      return (
        <IrrigationPage />
      );
    }

    if (
      currentPage === "field"
    ) {
      return (
        <FieldPage />
      );
    }

    if (
      currentPage === "alerts"
    ) {
      return (
        <AlertsPage />
      );
    }

    return (
      <SettingsPage />
    );
  }

  /* =====================================================
     ALERT POPUP
  ===================================================== */

  const alertPopup =
    showAlertPopup &&
    notifications.length > 0
      ? notifications[0]
      : null;

  return (
    <main className="app-shell">

      {renderPage()}

      {alertPopup && (
        <div
          className="alert-popup"
          onClick={() =>
            setCurrentPage(
              "alerts"
            )
          }
        >

          <div className="popup-icon">
            ⚠️
          </div>

          <div>
            <strong>
              {
                alertPopup.title
              }
            </strong>

            <p>
              {
                alertPopup.message
              }
            </p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();

              setShowAlertPopup(
                false
              );
            }}
          >
            ×
          </button>

        </div>
      )}

      {/* =================================================
          BOTTOM NAVIGATION
      ================================================= */}

      <nav className="bottom-nav">

        <button
          className={
            currentPage === "home"
              ? "nav-item active"
              : "nav-item"
          }
          onClick={() =>
            setCurrentPage(
              "home"
            )
          }
        >
          <NavIcon page="home" />

          <span>
            {t.home}
          </span>
        </button>

        <button
          className={
            currentPage ===
            "irrigation"
              ? "nav-item active"
              : "nav-item"
          }
          onClick={() =>
            setCurrentPage(
              "irrigation"
            )
          }
        >
          <NavIcon
            page="irrigation"
          />

          <span>
            {t.irrigation}
          </span>
        </button>

        <button
          className={
            currentPage === "field"
              ? "nav-item active"
              : "nav-item"
          }
          onClick={() =>
            setCurrentPage(
              "field"
            )
          }
        >
          <NavIcon page="field" />

          <span>
            {t.field}
          </span>
        </button>

        <button
          className={
            currentPage === "alerts"
              ? "nav-item active"
              : "nav-item"
          }
          onClick={() =>
            setCurrentPage(
              "alerts"
            )
          }
        >

          <div className="nav-icon-wrapper">

            <NavIcon page="alerts" />

            {notifications.length >
              0 && (
              <span className="nav-badge">
                {
                  notifications.length
                }
              </span>
            )}

          </div>

          <span>
            {t.alerts}
          </span>

        </button>

        <button
          className={
            currentPage ===
            "settings"
              ? "nav-item active"
              : "nav-item"
          }
          onClick={() =>
            setCurrentPage(
              "settings"
            )
          }
        >

          <NavIcon page="settings" />

          <span>
            {t.settings}
          </span>

        </button>

      </nav>

      <style jsx global>{`

        * {
          box-sizing: border-box;
        }

        html,
        body {
          margin: 0;
          padding: 0;
          width: 100%;
          max-width: 100%;
          overflow-x: hidden;
          background: #07110d;
          color: #f1f8f4;
          font-family:
            Arial,
            Helvetica,
            sans-serif;
        }

        body {
          min-height: 100vh;
        }

        button,
        input,
        select {
          font: inherit;
        }

        button {
          cursor: pointer;
        }

        .app-shell {
          width: 100%;
          max-width: 100%;
          min-height: 100vh;

          /* Smart farming background image */
          background-image:
            linear-gradient(
              rgba(4, 14, 10, 0.78),
              rgba(4, 14, 10, 0.86)
            ),
            url('/smart-irrigation-bg.png');
          background-size: cover;
          background-position: center top;
          background-repeat: no-repeat;
          background-attachment: fixed;

          padding-bottom: 100px;
        }

        .page {
          min-height: 100vh;
          background: rgba(4, 14, 10, 0.08);
        }

        /* Modern glass UI for the dashboard */
        .welcome-card,
        .sensor-card,
        .recommendation-card,
        .weather-card,
        .schedule-card,
        .assistant-card,
        .analytics-card,
        .field-card,
        .settings-card,
        .test-card,
        .irrigation-card,
        .alert-card {
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }

        .app-header {
          position: sticky;
          top: 0;
          z-index: 20;

          display: flex;
          align-items: center;
          justify-content: space-between;

          padding:
            18px
            18px
            16px;

          background:
            rgba(
              7,
              17,
              13,
              0.94
            );

          backdrop-filter:
            blur(18px);

          border-bottom:
            1px solid
            rgba(
              255,
              255,
              255,
              0.07
            );
        }

        .app-header h1 {
          margin:
            4px 0 0;

          font-size: 21px;
          font-weight: 800;
          letter-spacing:
            -0.4px;
        }

        .brand-small {
          color: #65e58a;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 2px;
        }

        .header-alert-button {
          position: relative;

          width: 44px;
          height: 44px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.1
            );

          border-radius: 14px;

          background: #101e17;

          color: white;
          font-size: 19px;
        }

        .notification-dot {
          position: absolute;

          top: -4px;
          right: -4px;

          min-width: 20px;
          height: 20px;

          padding:
            0 5px;

          border-radius: 20px;

          display: flex;
          align-items: center;
          justify-content: center;

          background: #ef4444;
          color: white;

          font-size: 10px;
          font-weight: 800;

          border:
            2px solid
            #07110d;
        }

        .content {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 900px;

          margin: 0 auto;

          padding: 18px;
        }

        .welcome-card {
          display: flex;

          align-items: center;
          justify-content: space-between;

          gap: 16px;

          padding: 22px;

          border-radius: 24px;

          background:
            linear-gradient(
              135deg,
              #123e27,
              #0d261a
            );

          border:
            1px solid
            rgba(
              101,
              229,
              138,
              0.15
            );

          margin-bottom: 22px;

          box-shadow:
            0 18px 50px
            rgba(
              0,
              0,
              0,
              0.18
            );
        }

        .welcome-card h2 {
          margin:
            4px 0 8px;

          font-size: 25px;
        }

        .welcome-card p {
          margin: 0;

          color: #a9c1b1;

          line-height: 1.5;
        }

        .muted {
          font-size: 13px;
        }

        .field-icon {
          width: 64px;
          height: 64px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 20px;

          background:
            rgba(
              101,
              229,
              138,
              0.12
            );

          font-size: 32px;

          flex-shrink: 0;
        }

        .section-title {
          display: flex;

          align-items: center;
          justify-content: space-between;

          gap: 10px;

          margin-bottom: 12px;
        }

        .section-title h2 {
          margin: 0;
          font-size: 18px;
        }

        .live-badge {
          color: #68e890;

          font-size: 10px;
          font-weight: 800;

          letter-spacing: 1px;
        }

        .sensor-grid {
          display: grid;

          grid-template-columns:
            repeat(
              2,
              minmax(
                0,
                1fr
              )
            );

          gap: 10px;
        }

        .sensor-card {
          min-height: 150px;

          padding: 16px;

          border-radius: 20px;

          background: #0e1d15;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.07
            );

          transition:
            0.2s;
        }

        .sensor-card.danger {
          border-color:
            rgba(
              239,
              68,
              68,
              0.35
            );

          background:
            rgba(
              127,
              29,
              29,
              0.16
            );

          animation:
            alertGlow
            1.5s
            infinite;
        }

        @keyframes alertGlow {

          50% {
            box-shadow:
              0 0 25px
              rgba(
                239,
                68,
                68,
                0.15
              );
          }

        }

        .sensor-icon {
          font-size: 22px;
          margin-bottom: 12px;
        }

        .sensor-title {
          color: #9bb1a3;

          font-size: 12px;

          margin-bottom: 5px;
        }

        .sensor-value {
          font-size: 25px;
          font-weight: 800;
        }

        .sensor-status {
          margin-top: 8px;

          color: #63df87;

          font-size: 11px;
        }

        .danger-text {
          color: #ff7373 !important;
        }

        .success-text {
          color: #68e890 !important;
        }

        .recommendation-card {
          display: flex;

          gap: 14px;

          margin-top: 16px;

          padding: 20px;

          border-radius: 22px;

          background:
            linear-gradient(
              135deg,
              rgba(
                34,
                197,
                94,
                0.14
              ),
              rgba(
                16,
                185,
                129,
                0.05
              )
            );

          border:
            1px solid
            rgba(
              74,
              222,
              128,
              0.2
            );
        }

        .recommendation-icon {
          width: 48px;
          height: 48px;

          border-radius: 15px;

          display: flex;
          align-items: center;
          justify-content: center;

          background:
            rgba(
              74,
              222,
              128,
              0.12
            );

          font-size: 25px;

          flex-shrink: 0;
        }

        .recommendation-content h2 {
          margin:
            4px 0 6px;

          font-size: 18px;
        }

        .recommendation-content p {
          margin: 0;

          color: #a5b9ab;

          line-height: 1.5;

          font-size: 13px;
        }

        .small-label {
          color: #69df89;

          font-size: 10px;
          font-weight: 800;

          text-transform:
            uppercase;

          letter-spacing: 1px;
        }

        .weather-card {
          display: flex;

          align-items: center;
          justify-content: space-between;

          gap: 20px;

          margin-top: 16px;

          padding: 20px;

          border-radius: 22px;

          background: #101f17;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.07
            );
        }

        .weather-card h2 {
          margin:
            6px 0;

          font-size: 27px;
        }

        .weather-card p {
          margin: 0;

          color: #98ad9f;

          font-size: 13px;
        }

        .weather-details {
          display: flex;

          flex-direction:
            column;

          gap: 10px;

          color: #a9bcae;

          font-size: 12px;

          text-align: right;
        }

        .schedule-card,
        .info-card,
        .form-card,
        .settings-card,
        .analytics-card,
        .testing-card {
          margin-top: 16px;

          padding: 20px;

          border-radius: 22px;

          background: #0e1d15;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.07
            );
        }

        .text-button {
          border: 0;

          background:
            transparent;

          color: #68e890;

          font-size: 12px;
          font-weight: 700;
        }

        .schedule-row {
          display: grid;

          grid-template-columns:
            72px 1fr auto;

          gap: 12px;

          align-items: center;

          padding: 14px 0;

          border-top:
            1px solid
            rgba(
              255,
              255,
              255,
              0.06
            );
        }

        .schedule-row:first-of-type {
          border-top: 0;
        }

        .schedule-time {
          color: #68e890;

          font-weight: 800;

          font-size: 12px;
        }

        .schedule-row strong {
          display: block;

          font-size: 13px;
        }

        .schedule-row p {
          margin:
            4px 0 0;

          color: #82978a;

          font-size: 11px;
        }

        .scheduled,
        .pending {
          padding:
            5px 8px;

          border-radius: 8px;

          font-size: 9px;

          font-weight: 800;
        }

        .scheduled {
          color: #68e890;

          background:
            rgba(
              74,
              222,
              128,
              0.1
            );
        }

        .pending {
          color: #fbbf24;

          background:
            rgba(
              251,
              191,
              36,
              0.1
            );
        }

        /* =================================================
           SENSOR TESTING
        ================================================= */

        .testing-card {
          background:
            linear-gradient(
              145deg,
              #101f17,
              #0c1811
            );

          border:
            1px solid
            rgba(
              96,
              165,
              250,
              0.15
            );
        }

        .testing-card .section-title {
          margin-bottom: 15px;
        }

        .testing-card .section-title h2 {
          font-size: 16px;
        }

        .testing-card .section-title p {
          margin:
            4px 0 0;

          color: #82978a;

          font-size: 11px;
        }

        .testing-status {
          display: grid;

          grid-template-columns:
            repeat(
              3,
              1fr
            );

          gap: 8px;

          margin-bottom: 12px;
        }

        .testing-status > div {
          padding: 12px;

          border-radius: 13px;

          background: #122319;

          text-align: center;
        }

        .testing-status span {
          display: block;

          color: #82978a;

          font-size: 10px;

          margin-bottom: 5px;
        }

        .testing-status strong {
          font-size: 16px;
        }

        .test-buttons {
          display: grid;

          grid-template-columns:
            repeat(
              2,
              1fr
            );

          gap: 8px;
        }

        .test-buttons button {
          padding: 11px 8px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.08
            );

          border-radius: 12px;

          background: #15271c;

          color: #d4e2d8;

          font-size: 10px;

          font-weight: 700;

          transition:
            0.2s;
        }

        .test-buttons button:hover {
          border-color:
            #3e9f5d;

          transform:
            translateY(
              -1px
            );
        }

        .test-buttons .reset-test {
          grid-column:
            1 / -1;

          background:
            #241f14;

          color: #f4c95d;

          border-color:
            rgba(
              244,
              201,
              93,
              0.18
            );
        }

        /* =================================================
           ASSISTANT
        ================================================= */

        .assistant-card {
          margin-top: 16px;

          padding: 20px;

          border-radius: 22px;

          background:
            linear-gradient(
              135deg,
              #101f17,
              #0b1711
            );

          border:
            1px solid
            rgba(
              101,
              229,
              138,
              0.12
            );
        }

        .assistant-top {
          display: flex;

          align-items: center;

          justify-content:
            space-between;
        }

        .assistant-top >
        div:first-child {
          display: flex;

          align-items: center;

          gap: 12px;
        }

        .assistant-icon {
          width: 44px;
          height: 44px;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 14px;

          background:
            rgba(
              74,
              222,
              128,
              0.1
            );

          font-size: 23px;
        }

        .assistant-card h2 {
          margin: 0;

          font-size: 16px;
        }

        .assistant-card p {
          margin:
            3px 0 0;

          color: #82978a;

          font-size: 11px;
        }

        .mic-button {
          width: 48px;
          height: 48px;

          border: 0;

          border-radius: 50%;

          background: #1d6339;

          color: white;

          font-size: 21px;

          box-shadow:
            0 8px 25px
            rgba(
              34,
              197,
              94,
              0.15
            );
        }

        .mic-button.listening {
          background: #dc2626;

          animation:
            pulse
            1s
            infinite;
        }

        @keyframes pulse {

          50% {
            transform:
              scale(
                1.08
              );
          }

        }

        .voice-question,
        .assistant-reply {
          margin-top: 14px;

          padding: 12px;

          border-radius: 13px;

          font-size: 12px;

          line-height: 1.5;
        }

        .voice-question {
          background:
            rgba(
              255,
              255,
              255,
              0.04
            );

          color: #bdcbbf;
        }

        .assistant-reply {
          background:
            rgba(
              74,
              222,
              128,
              0.08
            );

          color: #c8e9d1;
        }

        .quick-questions {
          display: grid;

          grid-template-columns:
            repeat(
              2,
              1fr
            );

          gap: 8px;

          margin-top: 14px;
        }

        .quick-questions button {
          padding: 11px 8px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.08
            );

          border-radius: 12px;

          background: #122219;

          color: #c7d7cb;

          font-size: 11px;
        }

        .quick-questions button:hover {
          border-color:
            #3e9f5d;
        }

        .analytics-wrapper {
          padding-top: 0;
        }

        .analytics-card {
          margin-top: 0;
        }

        .analytics-card select {
          width: auto;

          max-width: 145px;
        }

        .analytics-card h2 {
          margin: 0;
        }

        .analytics-card p {
          margin:
            4px 0 0;

          color: #82978a;

          font-size: 11px;
        }

        select,
        input {
          width: 100%;

          padding:
            13px 14px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.1
            );

          border-radius: 12px;

          background: #09150f;

          color: #eaf4ed;

          outline: none;
        }

        select:focus,
        input:focus {
          border-color:
            #3da65c;
        }

        select option {
          background: #0e1d15;
          color: white;
        }

        .average-box {
          display: flex;

          justify-content:
            space-between;

          align-items: center;

          margin-top: 16px;

          padding: 14px;

          border-radius: 14px;

          background: #122319;
        }

        .average-box span {
          color: #8ea296;

          font-size: 11px;
        }

        .average-box strong {
          font-size: 19px;

          color: #68e890;
        }

        .chart {
          height: 230px;

          display: flex;

          align-items: flex-end;

          justify-content:
            space-around;

          gap: 8px;

          padding:
            20px 4px 0;
        }

        .chart-column {
          height: 100%;

          flex: 1;

          display: flex;

          flex-direction:
            column;

          align-items: center;

          justify-content:
            flex-end;

          gap: 5px;
        }

        .chart-value {
          font-size: 9px;

          color: #8ea296;
        }

        .bar-wrapper {
          height: 150px;

          width: 70%;

          display: flex;

          align-items:
            flex-end;
        }

        .chart-bar {
          width: 100%;

          min-height: 5px;

          border-radius:
            7px 7px 3px 3px;

          background:
            linear-gradient(
              to top,
              #185b34,
              #54dc7c
            );
        }

        .chart-label {
          font-size: 9px;

          color: #82978a;
        }

        /* =================================================
           IRRIGATION
        ================================================= */

        .irrigation-main-card {
          padding:
            28px 20px;

          border-radius: 25px;

          text-align: center;

          background:
            linear-gradient(
              145deg,
              #103721,
              #0d1e14
            );

          border:
            1px solid
            rgba(
              74,
              222,
              128,
              0.18
            );
        }

        .water-drop-large {
          width: 78px;
          height: 78px;

          margin:
            0 auto 16px;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background:
            rgba(
              56,
              189,
              248,
              0.1
            );

          font-size: 38px;
        }

        .irrigation-main-card h2 {
          margin:
            0 0 8px;
        }

        .irrigation-main-card > p {
          margin:
            0 auto 22px;

          max-width: 500px;

          color: #99afa0;

          font-size: 13px;

          line-height: 1.5;
        }

        .irrigation-status {
          display: grid;

          grid-template-columns:
            1fr 1fr;

          gap: 10px;

          margin-bottom: 18px;
        }

        .irrigation-status > div {
          padding: 15px;

          border-radius: 15px;

          background:
            rgba(
              0,
              0,
              0,
              0.18
            );
        }

        .irrigation-status span,
        .schedule-large span {
          display: block;

          color: #83998b;

          font-size: 10px;

          margin-bottom: 6px;
        }

        .irrigation-status strong {
          font-size: 20px;
        }

        .primary-button {
          width: 100%;

          border: 0;

          padding: 15px;

          border-radius: 14px;

          background:
            linear-gradient(
              135deg,
              #35b85c,
              #218b43
            );

          color: white;

          font-weight: 800;

          box-shadow:
            0 10px 25px
            rgba(
              34,
              197,
              94,
              0.18
            );
        }

        .primary-button:hover {
          filter:
            brightness(
              1.08
            );
        }

        .primary-button:disabled {
          opacity: 0.7;

          cursor:
            not-allowed;
        }

        .primary-button.running {
          background:
            #1f6c3a;
        }

        .success-message {
          margin-top: 14px;

          color: #68e890;

          font-size: 12px;
        }

        .decision-row,
        .condition-row,
        .info-line {
          display: flex;

          align-items: center;

          justify-content:
            space-between;

          gap: 12px;

          padding: 14px 0;

          border-bottom:
            1px solid
            rgba(
              255,
              255,
              255,
              0.06
            );

          font-size: 12px;
        }

        .decision-row:last-child,
        .condition-row:last-child,
        .info-line:last-child {
          border-bottom: 0;
        }

        .decision-row span,
        .condition-row span,
        .info-line span {
          color: #91a497;
        }

        .schedule-large {
          display: grid;

          grid-template-columns:
            repeat(
              3,
              1fr
            );

          gap: 10px;

          padding: 15px 0;

          border-top:
            1px solid
            rgba(
              255,
              255,
              255,
              0.06
            );
        }

        .schedule-large:first-of-type {
          border-top: 0;
        }

        .schedule-large strong {
          font-size: 12px;
        }

        /* =================================================
           FIELD
        ================================================= */

        .profile-card,
        .settings-profile {
          display: flex;

          align-items: center;

          gap: 14px;

          padding: 20px;

          border-radius: 22px;

          background:
            linear-gradient(
              135deg,
              #123520,
              #0e2116
            );

          border:
            1px solid
            rgba(
              74,
              222,
              128,
              0.13
            );
        }

        .profile-avatar {
          width: 56px;
          height: 56px;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 18px;

          background: #247c43;

          color: white;

          font-size: 22px;

          font-weight: 800;
        }

        .profile-avatar.large {
          width: 64px;
          height: 64px;
        }

        .profile-card h2,
        .settings-profile h2 {
          margin: 0;

          font-size: 18px;
        }

        .profile-card p,
        .settings-profile p {
          margin:
            5px 0 0;

          color: #8fa497;

          font-size: 12px;
        }

        .form-card {
          display: flex;

          flex-direction:
            column;
        }

        .form-card label {
          margin:
            13px 0 7px;

          color: #a8b8ad;

          font-size: 11px;

          font-weight: 700;
        }

        .form-card label:first-child {
          margin-top: 0;
        }

        .form-card .primary-button {
          margin-top: 20px;
        }

        .summary-grid {
          display: grid;

          grid-template-columns:
            repeat(
              2,
              1fr
            );

          gap: 10px;

          margin-top: 15px;
        }

        .summary-grid > div {
          padding: 14px;

          border-radius: 14px;

          background: #122319;
        }

        .summary-grid span {
          display: block;

          color: #82978a;

          font-size: 10px;

          margin-bottom: 6px;
        }

        .summary-grid strong {
          font-size: 13px;
        }

        /* =================================================
           ALERTS
        ================================================= */

        .alert-summary {
          display: flex;

          align-items: center;

          gap: 13px;

          padding: 20px;

          border-radius: 22px;

          background: #251818;

          border:
            1px solid
            rgba(
              239,
              68,
              68,
              0.18
            );
        }

        .alert-summary-icon {
          width: 50px;
          height: 50px;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 15px;

          background:
            rgba(
              239,
              68,
              68,
              0.1
            );

          font-size: 24px;
        }

        .alert-summary h2 {
          margin: 0;

          font-size: 24px;
        }

        .alert-summary p {
          margin:
            3px 0 0;

          color: #a99696;

          font-size: 11px;
        }

        .clear-button {
          margin-left: auto;

          border: 0;

          padding:
            8px 12px;

          border-radius: 10px;

          background:
            rgba(
              239,
              68,
              68,
              0.1
            );

          color: #ff8585;

          font-size: 11px;
        }

        .empty-card {
          margin-top: 16px;

          padding:
            40px 20px;

          border-radius: 22px;

          background: #0e1d15;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.07
            );

          text-align: center;
        }

        .empty-card > div {
          width: 60px;
          height: 60px;

          margin:
            0 auto 14px;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background:
            rgba(
              74,
              222,
              128,
              0.1
            );

          color: #68e890;

          font-size: 28px;
        }

        .empty-card h2 {
          margin:
            0 0 7px;

          font-size: 17px;
        }

        .empty-card p {
          margin: 0;

          color: #82978a;

          font-size: 12px;
        }

        .alert-list {
          display: flex;

          flex-direction:
            column;

          gap: 10px;

          margin-top: 16px;
        }

        .alert-item {
          display: flex;

          gap: 13px;

          padding: 17px;

          border-radius: 18px;

          background: #211817;

          border:
            1px solid
            rgba(
              239,
              68,
              68,
              0.15
            );
        }

        .alert-icon {
          font-size: 22px;
        }

        .alert-body h3 {
          margin:
            0 0 5px;

          font-size: 14px;
        }

        .alert-body p {
          margin:
            0 0 7px;

          color: #a89494;

          font-size: 11px;

          line-height: 1.5;
        }

        .alert-body span {
          color: #706868;

          font-size: 9px;
        }

        /* =================================================
           SETTINGS
        ================================================= */

        .settings-profile {
          margin-bottom: 0;
        }

        .settings-card h2 {
          margin:
            0 0 6px;

          font-size: 16px;
        }

        .settings-card > p {
          margin:
            0 0 13px;

          color: #83988b;

          font-size: 11px;

          line-height: 1.5;
        }

        .setting-row {
          display: flex;

          align-items: center;

          justify-content:
            space-between;

          gap: 15px;
        }

        .setting-row h2 {
          margin:
            0 0 5px;
        }

        .setting-row p {
          margin: 0;

          max-width: 270px;

          color: #83988b;

          font-size: 11px;

          line-height: 1.5;
        }

        .toggle {
          position: relative;

          width: 52px;
          height: 30px;

          padding: 0;

          border: 0;

          border-radius: 30px;

          background: #26372d;

          flex-shrink: 0;
        }

        .toggle span {
          position: absolute;

          top: 4px;
          left: 4px;

          width: 22px;
          height: 22px;

          border-radius: 50%;

          background: #9cac9f;

          transition:
            0.2s;
        }

        .toggle.active {
          background: #238345;
        }

        .toggle.active span {
          left: 26px;

          background: white;
        }

        .download-button,
        .logout-button {
          width: 100%;

          margin-top: 12px;

          padding: 14px;

          border-radius: 14px;

          font-weight: 700;
        }

        .download-button {
          border:
            1px solid
            rgba(
              74,
              222,
              128,
              0.25
            );

          background: #11271a;

          color: #6de88d;
        }

        .logout-button {
          border:
            1px solid
            rgba(
              239,
              68,
              68,
              0.2
            );

          background: #241615;

          color: #ff8585;
        }

        /* =================================================
           ALERT POPUP
        ================================================= */

        .alert-popup {
          position: fixed;

          left: 14px;
          right: 14px;
          top: 76px;

          z-index: 100;

          display: flex;

          align-items: flex-start;

          gap: 12px;

          padding: 15px;

          border-radius: 17px;

          background: #2a1818;

          border:
            1px solid
            rgba(
              248,
              113,
              113,
              0.4
            );

          box-shadow:
            0 20px 50px
            rgba(
              0,
              0,
              0,
              0.4
            );

          animation:
            popupIn
            0.25s
            ease-out;
        }

        @keyframes popupIn {

          from {
            opacity: 0;

            transform:
              translateY(
                -10px
              );
          }

          to {
            opacity: 1;

            transform:
              translateY(
                0
              );
          }

        }

        .popup-icon {
          font-size: 22px;
        }

        .alert-popup strong {
          display: block;

          font-size: 13px;

          color: #ffb0b0;
        }

        .alert-popup p {
          margin:
            4px 0 0;

          color: #c4a8a8;

          font-size: 10px;

          line-height: 1.4;
        }

        .alert-popup button {
          margin-left: auto;

          border: 0;

          background:
            transparent;

          color: #ad8989;

          font-size: 20px;
        }

        /* =================================================
           BOTTOM NAVIGATION
        ================================================= */

        .bottom-nav {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;

          width: 100%;
          max-width: 100%;
          box-sizing: border-box;

          z-index: 50;

          display: grid;
          grid-template-columns:
            repeat(
              5,
              minmax(
                0,
                1fr
              )
            );

          height: 82px;

          padding:
            8px 6px
            calc(
              8px +
              env(
                safe-area-inset-bottom
              )
            );

          background:
            rgba(
              8,
              18,
              13,
              0.98
            );

          backdrop-filter:
            blur(20px);

          border-top:
            1px solid
            rgba(
              255,
              255,
              255,
              0.08
            );

          overflow: hidden;
        }

        .nav-item {
          position: relative;

          width: 100%;
          min-width: 0;
          max-width: 100%;

          display: flex;

          flex-direction:
            column;

          align-items: center;
          justify-content: center;

          gap: 4px;

          padding:
            5px 2px;

          border: 0;

          background:
            transparent;

          color: #667a6d;

          font-size: 9px;

          font-weight: 700;

          box-sizing: border-box;
          overflow: hidden;
        }

        .nav-item > span,
        .nav-icon-wrapper {
          font-size: 20px;
          flex-shrink: 0;
        }

        .nav-item > span:last-child {
          display: block;
          width: 100%;

          font-size: 9px;
          line-height: 12px;

          text-align: center;

          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .nav-item.active {
          color: #68e890;
        }

        .nav-icon-wrapper {
          position: relative;

          width: 38px;
          height: 30px;

          display: flex;
          align-items: center;
          justify-content: center;

          flex-shrink: 0;
        }

        .nav-badge {
          position: absolute;

          top: -7px;
          right: -9px;

          min-width: 16px;
          height: 16px;

          padding:
            0 3px;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 20px;

          background: #ef4444;

          color: white;

          font-size: 8px;

          border:
            2px solid
            #08120d;
        }

        @media (min-width: 700px) {

          .sensor-grid {
            grid-template-columns:
              repeat(
                3,
                minmax(
                  0,
                  1fr
                )
              );
          }

          .bottom-nav {
            left: 50%;
            right: auto;

            width: 650px;

            transform:
              translateX(
                -50%
              );

            border-radius:
              22px
              22px
              0
              0;
          }

          .alert-popup {
            left: 50%;
            right: auto;

            width: 500px;

            transform:
              translateX(
                -50%
              );
          }

        }

        /* =================================================
           MOBILE BOTTOM NAVIGATION FIX
        ================================================= */

        @media (max-width: 699px) {
          .bottom-nav {
            left: 0;
            right: 0;

            width: 100vw;
            max-width: 100vw;

            transform: none;

            grid-template-columns:
              repeat(
                5,
                minmax(
                  0,
                  1fr
                )
              );

            padding-left: 4px;
            padding-right: 4px;

            border-radius: 0;
          }

          .nav-item {
            width: 100%;
            min-width: 0;
            max-width: 100%;

            padding-left: 1px;
            padding-right: 1px;
          }

          .nav-item > span:last-child {
            font-size: 9px;
          }
        }

        @media (max-width: 430px) {

          .content {
            padding: 14px;
          }

          .welcome-card {
            padding: 18px;
          }

          .welcome-card h2 {
            font-size: 22px;
          }

          .weather-card {
            align-items:
              flex-start;
          }

          .weather-details {
            text-align: left;
          }

          .schedule-row {
            grid-template-columns:
              65px 1fr;
          }

          .schedule-row > span {
            grid-column: 2;

            width:
              max-content;
          }

          .schedule-large {
            grid-template-columns:
              repeat(
                3,
                1fr
              );
          }

          .test-buttons {
            grid-template-columns:
              1fr;
          }

          .test-buttons .reset-test {
            grid-column:
              auto;
          }

        }

      `}</style>

    </main>
  );
}