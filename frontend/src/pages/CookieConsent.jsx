
import { useEffect, useState } from "react";
import {
  FiSettings,
  FiX,
  FiCheck,
  FiShield,
  FiBarChart2,
  FiSliders,
  FiArrowUpRight,
} from "react-icons/fi";

import { useTheme } from "../context/ThemeContext";

const CONSENT_KEY = "happy-bounty-cookie-consent";

const DEFAULT_PREFERENCES = {
  necessary: true,
  preferences: false,
  analytics: false,
  marketing: false,
};

const COOKIE_TYPES = [
  {
    key: "necessary",
    title: "Essential cookies",
    description: "Required for security and core website functionality.",
    icon: FiShield,
    required: true,
  },
  {
    key: "preferences",
    title: "Preference cookies",
    description: "Remember your settings and preferences.",
    icon: FiSliders,
  },
  {
    key: "analytics",
    title: "Analytics cookies",
    description: "Help us understand how visitors use Happy Bounty.",
    icon: FiBarChart2,
  },
  {
    key: "marketing",
    title: "Marketing cookies",
    description: "Help measure campaigns and relevant promotions.",
    icon: FiArrowUpRight,
  },
];

function readConsent() {
  try {
    const stored = localStorage.getItem(CONSENT_KEY);

    if (!stored) return null;

    const parsed = JSON.parse(stored);

    if (
      !parsed ||
      !["all", "rejected", "custom"].includes(parsed.choice) ||
      !parsed.preferences ||
      typeof parsed.preferences !== "object"
    ) {
      return null;
    }

    return {
      ...parsed,
      preferences: {
        ...DEFAULT_PREFERENCES,
        ...parsed.preferences,
        necessary: true,
      },
    };
  } catch {
    return null;
  }
}

export default function CookieConsent() {
  const { dark } = useTheme();

  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES);

  const colors = dark
    ? {
        panel: "#080908",
        card: "#121512",
        text: "#ffffff",
        muted: "#a3a3a3",
        subtle: "#737373",
        border: "#00D6A0",
        accent: "#00D6A0",
        accentHover: "#00efb3",
        accentText: "#06251b",
        secondary: "#151815",
        secondaryHover: "#202620",
        divider: "#292d29",
        input: "#00D6A0",
      }
    : {
        panel: "#f6f5ef",
        card: "#ffffff",
        text: "#171717",
        muted: "#626262",
        subtle: "#777777",
        border: "#008A66",
        accent: "#008A66",
        accentHover: "#006f52",
        accentText: "#ffffff",
        secondary: "#eeede5",
        secondaryHover: "#e4e3d9",
        divider: "#deded5",
        input: "#008A66",
      };

  useEffect(() => {
    const consent = readConsent();

    if (consent) {
      setPreferences(consent.preferences);
    } else {
      setVisible(true);
    }
  }, []);

  const saveConsent = (choice, selectedPreferences) => {
    const consent = {
      choice,
      preferences: {
        ...selectedPreferences,
        necessary: true,
      },
      updatedAt: new Date().toISOString(),
      version: 1,
    };

    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));

      setPreferences(consent.preferences);
      setVisible(false);
      setShowSettings(false);

      window.dispatchEvent(
        new CustomEvent("happy-bounty-consent-updated", {
          detail: consent,
        })
      );
    } catch {
      setVisible(true);
    }
  };

  const acceptAll = () => {
    saveConsent("all", {
      necessary: true,
      preferences: true,
      analytics: true,
      marketing: true,
    });
  };

  const rejectAll = () => {
    saveConsent("rejected", DEFAULT_PREFERENCES);
  };

  const togglePreference = (key) => {
    setPreferences((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  const openSettings = () => {
    const saved = readConsent();

    if (saved) {
      setPreferences(saved.preferences);
    }

    setShowSettings(true);
    setVisible(true);
  };

  const secondaryButtonStyle = {
    backgroundColor: colors.secondary,
    color: colors.text,
    borderColor: colors.divider,
  };

  const primaryButtonStyle = {
    backgroundColor: colors.accent,
    color: colors.accentText,
    borderColor: colors.accent,
  };

  return (
    <>
      <style>
        {`
          @keyframes hb-cookie-enter {
            from {
              opacity: 0;
              transform: translate3d(18px, 14px, 0);
            }
            to {
              opacity: 1;
              transform: translate3d(0, 0, 0);
            }
          }

          .hb-cookie-animate {
            animation: hb-cookie-enter 280ms ease-out both;
          }

          .hb-cookie-button {
            transition:
              background-color 180ms ease,
              border-color 180ms ease,
              color 180ms ease,
              transform 180ms ease;
          }

          .hb-cookie-button:focus-visible,
          .hb-cookie-settings:focus-visible {
            outline: 2px solid var(--hb-cookie-accent);
            outline-offset: 3px;
          }

          @media (prefers-reduced-motion: reduce) {
            .hb-cookie-animate,
            .hb-cookie-button {
              animation: none !important;
              transition: none !important;
            }
          }
        `}
      </style>

      {!visible && (
        <button
          type="button"
          onClick={openSettings}
          aria-label="Manage cookie preferences"
          title="Cookie settings"
          className="hb-cookie-settings fixed bottom-24 right-5 z-[9998] flex h-12 w-12 items-center justify-center rounded-full border shadow-xl hover:scale-105 sm:bottom-28 sm:right-7"
          style={{
            backgroundColor: colors.panel,
            color: colors.accent,
            borderColor: `${colors.border}80`,
            boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
            "--hb-cookie-accent": colors.accent,
          }}
        >
          <FiSettings size={20} />
        </button>
      )}

      {visible && (
        <section
          role="dialog"
          aria-modal="false"
          aria-labelledby="hb-cookie-title"
          aria-describedby="hb-cookie-description"
          className="hb-cookie-animate fixed bottom-4 right-4 z-[9999] max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-[440px] overflow-y-auto overscroll-contain rounded-2xl border p-5 shadow-2xl sm:bottom-6 sm:right-6 sm:p-6"
          style={{
            backgroundColor: colors.panel,
            color: colors.text,
            borderColor: `${colors.border}55`,
            boxShadow: "0 20px 60px rgba(0,0,0,0.28)",
            "--hb-cookie-accent": colors.accent,
          }}
        >
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-xl border"
                style={{
                  color: colors.accent,
                  backgroundColor: `${colors.border}12`,
                  borderColor: `${colors.border}40`,
                }}
              >
                <FiShield size={21} />
              </div>

              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-[0.16em]"
                  style={{ color: colors.accent }}
                >
                  Happy Bounty
                </p>
                <p
                  className="mt-0.5 text-xs"
                  style={{ color: colors.muted }}
                >
                  Your privacy matters
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={rejectAll}
              aria-label="Reject optional cookies and close"
              title="Reject optional cookies"
              className="hb-cookie-button flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-transparent"
              style={{ color: colors.muted }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.secondary;
                e.currentTarget.style.color = colors.text;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = colors.muted;
              }}
            >
              <FiX size={19} />
            </button>
          </div>

          <div className="mb-5">
            <h2
              id="hb-cookie-title"
              className="text-xl font-bold tracking-tight sm:text-2xl"
            >
              {showSettings
                ? "Your cookie preferences"
                : "A better experience starts here."}
            </h2>

            <p
              id="hb-cookie-description"
              className="mt-2 text-sm leading-6"
              style={{ color: colors.muted }}
            >
              {showSettings
                ? "Choose which optional cookies you're comfortable with. Essential cookies are always active."
                : "We use essential cookies to keep Happy Bounty secure and working. With your permission, optional cookies help us remember your preferences and improve your multi-chain experience."}
            </p>
          </div>

          {showSettings && (
            <div
              className="mb-5 divide-y rounded-xl border px-3"
              style={{
                backgroundColor: colors.card,
                borderColor: colors.divider,
                "--tw-divide-opacity": 1,
              }}
            >
              {COOKIE_TYPES.map((item) => {
                const Icon = item.icon;

                return (
                  <label
                    key={item.key}
                    className="flex cursor-pointer items-start gap-3 py-3.5"
                    style={{ borderColor: colors.divider }}
                  >
                    <span
                      className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                      style={{
                        backgroundColor: colors.secondary,
                        color: colors.accent,
                      }}
                    >
                      <Icon size={17} />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span
                        className="flex flex-wrap items-center gap-2 text-sm font-semibold"
                        style={{ color: colors.text }}
                      >
                        {item.title}

                        {item.required && (
                          <span
                            className="rounded-full border px-2 py-0.5 text-[10px] font-semibold"
                            style={{
                              color: colors.accent,
                              borderColor: `${colors.border}50`,
                              backgroundColor: `${colors.border}12`,
                            }}
                          >
                            Always on
                          </span>
                        )}
                      </span>

                      <span
                        className="mt-1 block text-xs leading-5"
                        style={{ color: colors.muted }}
                      >
                        {item.description}
                      </span>
                    </span>

                    <input
                      type="checkbox"
                      checked={preferences[item.key]}
                      disabled={item.required}
                      onChange={() => togglePreference(item.key)}
                      aria-label={item.title}
                      className="mt-1 h-4 w-4 shrink-0 disabled:cursor-not-allowed"
                      style={{ accentColor: colors.input }}
                    />
                  </label>
                );
              })}
            </div>
          )}

          <a
            href="/cookie-policy"
            className="mb-5 inline-flex items-center gap-1 text-xs font-semibold hover:underline focus-visible:outline-none"
            style={{
              color: colors.accent,
              "--hb-cookie-accent": colors.accent,
            }}
          >
            Read our Cookie Policy
            <FiArrowUpRight size={13} />
          </a>

          <div className="grid grid-cols-2 gap-2 sm:flex">
            {showSettings ? (
              <>
                <button
                  type="button"
                  onClick={rejectAll}
                  className="hb-cookie-button min-h-11 rounded-lg border px-3 py-2.5 text-xs font-semibold sm:flex-1"
                  style={secondaryButtonStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      colors.secondaryHover;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = colors.secondary;
                  }}
                >
                  Reject Optional
                </button>

                <button
                  type="button"
                  onClick={() => saveConsent("custom", preferences)}
                  className="hb-cookie-button min-h-11 rounded-lg border px-3 py-2.5 text-xs font-bold sm:flex-1"
                  style={primaryButtonStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      colors.accentHover;
                    e.currentTarget.style.borderColor = colors.accentHover;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = colors.accent;
                    e.currentTarget.style.borderColor = colors.accent;
                  }}
                >
                  Save Preferences
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setShowSettings(true)}
                  className="hb-cookie-button inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border px-3 py-2.5 text-xs font-semibold"
                  style={secondaryButtonStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      colors.secondaryHover;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = colors.secondary;
                  }}
                >
                  <FiSettings size={14} />
                  Customize
                </button>

                <button
                  type="button"
                  onClick={rejectAll}
                  className="hb-cookie-button min-h-11 rounded-lg border px-3 py-2.5 text-xs font-semibold"
                  style={secondaryButtonStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      colors.secondaryHover;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = colors.secondary;
                  }}
                >
                  Reject All
                </button>

                <button
                  type="button"
                  onClick={acceptAll}
                  className="hb-cookie-button col-span-2 inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border px-3 py-2.5 text-xs font-bold sm:col-span-1 sm:flex-1"
                  style={primaryButtonStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      colors.accentHover;
                    e.currentTarget.style.borderColor = colors.accentHover;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = colors.accent;
                    e.currentTarget.style.borderColor = colors.accent;
                  }}
                >
                  <FiCheck size={15} />
                  Accept All
                </button>
              </>
            )}
          </div>

          <p
            className="mt-4 text-center text-[10px] leading-4"
            style={{ color: colors.subtle }}
          >
            Your choice is saved on this device. You can update it anytime
            using the cookie settings button.
          </p>
        </section>
      )}
    </>
  );
}
