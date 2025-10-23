// Home page component
// Main landing page with light switch, rain effect, wind effect and animated background

import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  const [isOn, setIsOn] = useState(false);
  const [showRain, setShowRain] = useState(false);
  const [showWind, setShowWind] = useState(false);

  const lightStyle = isOn
    ? { filter: "drop-shadow(0 0 40px rgba(255,215,0,0.8))" }
    : {};

  // Trigger rain effect
  const triggerRain = () => {
    setShowRain(true);
    setTimeout(() => setShowRain(false), 4000);
  };

  // Trigger wind effect
  const triggerWind = () => {
    setShowWind(true);
    setTimeout(() => setShowWind(false), 5000);
  };

  // Random objects for wind effect (realistic + memes + nature)
  const windObjects = [
    // Realistic leaves
    "🍂",
    "🍁",
    "🌿",
    "🍃",
    // Nature
    "🌸",
    "🌼",
    "🦋",
    "🐝",
    "☁️",
    "⭐",
    "✨",
    // Memes/Fun
    "🦖",
    "🌮",
    "🍕",
    "🎮",
    "🚀",
    "⚡",
    "🎸",
    "🍩",
    "🎯",
    "🔥",
    "💎",
    "🎪",
  ];

  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center gap-6 overflow-hidden"
      style={{
        background: "linear-gradient(to bottom right, #eff6ff, #faf5ff)",
      }}
    >
      {/* Animated wind paths background */}
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="wind-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(147,197,253,0.3)" />
            <stop offset="50%" stopColor="rgba(196,181,253,0.3)" />
            <stop offset="100%" stopColor="rgba(147,197,253,0.3)" />
          </linearGradient>
        </defs>

        {/* Wind path 1 */}
        <path
          d="M-50,100 Q200,80 450,100 T950,100"
          fill="none"
          stroke="url(#wind-gradient)"
          strokeWidth="2"
          opacity="0.5"
        >
          <animate
            attributeName="d"
            dur="8s"
            repeatCount="indefinite"
            values="M-50,100 Q200,80 450,100 T950,100;
                    M-50,100 Q200,120 450,100 T950,100;
                    M-50,100 Q200,80 450,100 T950,100"
          />
        </path>

        {/* Wind path 2 */}
        <path
          d="M-50,200 Q250,180 500,200 T1000,200"
          fill="none"
          stroke="url(#wind-gradient)"
          strokeWidth="2"
          opacity="0.4"
        >
          <animate
            attributeName="d"
            dur="10s"
            repeatCount="indefinite"
            values="M-50,200 Q250,180 500,200 T1000,200;
                    M-50,200 Q250,220 500,200 T1000,200;
                    M-50,200 Q250,180 500,200 T1000,200"
          />
        </path>

        {/* Wind path 3 */}
        <path
          d="M-50,300 Q300,280 550,300 T1050,300"
          fill="none"
          stroke="url(#wind-gradient)"
          strokeWidth="2"
          opacity="0.3"
        >
          <animate
            attributeName="d"
            dur="12s"
            repeatCount="indefinite"
            values="M-50,300 Q300,280 550,300 T1050,300;
                    M-50,300 Q300,320 550,300 T1050,300;
                    M-50,300 Q300,280 550,300 T1050,300"
          />
        </path>

        {/* Wind path 4 */}
        <path
          d="M-50,400 Q350,380 600,400 T1100,400"
          fill="none"
          stroke="url(#wind-gradient)"
          strokeWidth="2"
          opacity="0.2"
        >
          <animate
            attributeName="d"
            dur="14s"
            repeatCount="indefinite"
            values="M-50,400 Q350,380 600,400 T1100,400;
                    M-50,400 Q350,420 600,400 T1100,400;
                    M-50,400 Q350,380 600,400 T1100,400"
          />
        </path>
      </svg>

      {/* Rain effect - Professional water drops */}
      {showRain && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="animate-confetti absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: "-10%",
                width: `${Math.random() * 2 + 3}px`,
                height: `${Math.random() * 8 + 12}px`,
                background: "linear-gradient(to bottom, #3b82f6, #60a5fa)",
                borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                opacity: Math.random() * 0.3 + 0.5,
                animationDelay: `${Math.random() * 0.3}s`,
                animationDuration: `${Math.random() * 1 + 1.5}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Wind effect - Random flying objects */}
      {showWind && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => {
            const randomObject =
              windObjects[Math.floor(Math.random() * windObjects.length)];
            return (
              <div
                key={i}
                className="animate-wind absolute text-2xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 0.5}s`,
                  animationDuration: `${Math.random() * 2 + 3}s`,
                }}
              >
                {randomObject}
              </div>
            );
          })}
        </div>
      )}

      {/* House icon with light effect - Responsive size */}
      <div
        className="relative z-10 transition-all duration-500 sm:text-8xl md:text-[10rem] lg:text-[12rem]"
        style={lightStyle}
      >
        {isOn ? "🏠" : "🏚️"}
      </div>

      <h1 className="relative z-10 text-center text-3xl font-bold capitalize sm:text-4xl md:text-5xl">
        {t("home.title")}
      </h1>

      <div className="card relative z-10 w-full max-w-lg text-center">
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            className="btn w-full sm:w-auto"
            onClick={() => setIsOn((on) => !on)}
          >
            {isOn ? t("home.lightOn") : t("home.lightOff")}
          </button>
          <button
            className="btn w-full bg-blue-500 hover:bg-blue-600 sm:w-auto"
            onClick={triggerRain}
          >
            {t("home.rain")}
          </button>
          <button
            className="btn w-full bg-green-500 hover:bg-green-600 sm:w-auto"
            onClick={triggerWind}
          >
            {t("home.wind")}
          </button>
        </div>
        <p className="mt-4 text-sm text-gray-600">{t("home.description")}</p>
      </div>
    </div>
  );
}
