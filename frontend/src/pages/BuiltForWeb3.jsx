
import { useEffect, useState } from "react";
import {
  FiArrowUpRight,
  FiCheckCircle,
  FiDollarSign,
  FiShield,
  FiZap,
  FiLayers,
  FiActivity,
  FiGlobe,
  FiLink,
} from "react-icons/fi";

import dotLogo from "../assets/images/pok.png";
import botLogo from "../assets/images/bot.png";
import arcLogo from "../assets/images/arc.png";

const networks = [
  {
    name: "DOT",
    fullName: "Portaldot ecosystem",
    logo: dotLogo,
    className: "network-dot",
  },
  {
    name: "BOT",
    fullName: "BOT Chain",
    logo: botLogo,
    className: "network-bot",
  },
  {
    name: "ARC",
    fullName: "Arc ecosystem",
    logo: arcLogo,
    className: "network-arc",
  },
];

const features = [
  {
    icon: FiLayers,
    number: "01",
    title: "Multi-chain opportunities",
    description:
      "Bring bounty creators and contributors together across supported blockchain ecosystems.",
    label: "NETWORK FLEXIBILITY",
  },
  {
    icon: FiDollarSign,
    number: "02",
    title: "Reward-driven work",
    description:
      "Create tasks with clearly stated rewards. Available reward assets depend on the bounty and its supported network.",
    label: "CLEAR REWARDS",
  },
  {
    icon: FiLink,
    number: "03",
    title: "Wallet connectivity",
    description:
      "Connect a compatible wallet to access the blockchain features and bounty interactions available to you.",
    label: "WEB3 ACCESS",
  },
  {
    icon: FiShield,
    number: "04",
    title: "Blockchain transparency",
    description:
      "Where transactions are recorded on-chain, users can inspect the relevant records using supported network tools.",
    label: "VERIFIABLE ACTIVITY",
  },
];

export default function BuiltForWeb3() {
  const [dark, setDark] = useState(() =>
    typeof document !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : true
  );

  useEffect(() => {
    const root = document.documentElement;

    const updateTheme = () => {
      setDark(root.classList.contains("dark"));
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);

    observer.observe(root, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const colors = {
    background: dark ? "#080908" : "#f6f5ef",
    card: dark ? "#101311" : "#FFFFFF",
    text: dark ? "#F5F7F6" : "#171C19",
    muted: dark ? "#929D97" : "#747D77",
    border: dark
      ? "rgba(255,255,255,0.085)"
      : "rgba(20,40,28,0.10)",
    soft: dark
      ? "rgba(255,255,255,0.035)"
      : "rgba(20,40,28,0.035)",
    accent: "#00D6A0",
    accentText: dark ? "#00D6A0" : "#008A66",
  };

  return (
    <section
      className="web3-section relative isolate overflow-hidden px-4 py-20 transition-colors duration-500 sm:px-8 sm:py-24 lg:px-10 lg:py-28"
      style={{
        backgroundColor: colors.background,
        color: colors.text,
      }}
    >
      {/* Subtle animated background */}
      <div
        aria-hidden="true"
        className="web3-grid pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(
              ${
                dark
                  ? "rgba(0,214,160,0.035)"
                  : "rgba(0,120,85,0.035)"
              } 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              ${
                dark
                  ? "rgba(0,214,160,0.035)"
                  : "rgba(0,120,85,0.035)"
              } 1px,
              transparent 1px
            )
          `,
          backgroundSize: "48px 48px",
          maskImage: "linear-gradient(to bottom, black, transparent 90%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black, transparent 90%)",
        }}
      />

      <div
        aria-hidden="true"
        className="web3-ambient pointer-events-none absolute left-1/2 top-0 h-72 w-[min(700px,100%)] -translate-x-1/2 rounded-full blur-[120px]"
        style={{
          backgroundColor: dark
            ? "rgba(0,214,160,0.055)"
            : "rgba(0,168,125,0.055)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border px-3.5 py-2"
            style={{
              borderColor: colors.border,
              backgroundColor: colors.soft,
            }}
          >
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-30"
                style={{ backgroundColor: colors.accent }}
              />
              <span
                className="relative inline-flex h-2 w-2 rounded-full"
                style={{ backgroundColor: colors.accent }}
              />
            </span>

            <span
              className="text-[10px] font-semibold uppercase tracking-[0.18em] sm:text-[11px]"
              style={{ color: colors.muted }}
            >
              One platform. Multiple ecosystems.
            </span>
          </div>

          <h2
            className="text-3xl font-bold leading-[1.12] tracking-[-0.045em] sm:text-4xl md:text-5xl lg:text-[58px]"
            style={{ color: colors.text }}
          >
            Built for Web3.
            <br />
            <span style={{ color: colors.accentText }}>
              Open to opportunity.
            </span>
          </h2>

          <p
            className="mx-auto mt-5 max-w-2xl text-sm leading-7 sm:mt-6 sm:text-base"
            style={{ color: colors.muted }}
          >
            Happy Bounty connects people who need work done with contributors
            ready to do it. Explore bounty opportunities, contribute your
            skills, and earn rewards through supported blockchain integrations.
          </p>
        </div>

        {/* Network strip */}
        <div
          className="network-panel mx-auto mt-10 max-w-4xl rounded-2xl border p-4 sm:mt-12 sm:p-5"
          style={{
            backgroundColor: colors.card,
            borderColor: colors.border,
          }}
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 px-1">
            <span
              className="text-[10px] font-bold uppercase tracking-[0.17em]"
              style={{ color: colors.muted }}
            >
              Supported ecosystem highlights
            </span>

            <span
              className="flex items-center gap-1.5 text-[10px] font-medium"
              style={{ color: colors.accentText }}
            >
              <FiGlobe size={13} />
              Multi-chain vision
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {networks.map((network, index) => (
              <div
                key={network.name}
                className={`network-item ${network.className} group flex items-center gap-3 rounded-xl border p-3.5 transition-all duration-300 hover:-translate-y-1`}
                style={{
                  borderColor: colors.border,
                  backgroundColor: colors.soft,
                  animationDelay: `${index * 120}ms`,
                }}
              >
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border"
                  style={{
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                  }}
                >
                  <img
                    src={network.logo}
                    alt={`${network.name} logo`}
                    className="h-7 w-7 object-contain transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                </div>

                <div className="min-w-0">
                  <p
                    className="text-sm font-bold"
                    style={{ color: colors.text }}
                  >
                    {network.name}
                  </p>
                  <p
                    className="mt-1 text-[11px] leading-4"
                    style={{ color: colors.muted }}
                  >
                    {network.fullName}
                  </p>
                </div>

                <FiArrowUpRight
                  className="ml-auto shrink-0 opacity-40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                  style={{ color: colors.accentText }}
                  size={16}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Feature cards */}
        <div className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.number}
                className="web3-card group relative flex min-h-[265px] flex-col overflow-hidden rounded-2xl border p-5 transition-all duration-300 sm:p-6"
                style={{
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  boxShadow: dark
                    ? "0 12px 35px rgba(0,0,0,0.13)"
                    : "0 12px 35px rgba(20,40,28,0.035)",
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div
                  aria-hidden="true"
                  className="web3-card-top pointer-events-none absolute inset-x-5 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)`,
                  }}
                />

                <div className="flex items-start justify-between">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:-translate-y-0.5"
                    style={{
                      color: colors.accentText,
                      backgroundColor: dark
                        ? "rgba(0,214,160,0.075)"
                        : "rgba(0,168,125,0.07)",
                      borderColor: dark
                        ? "rgba(0,214,160,0.18)"
                        : "rgba(0,168,125,0.18)",
                    }}
                  >
                    <Icon size={21} strokeWidth={1.8} />
                  </div>

                  <span
                    className="pt-1 text-xs font-medium tracking-[0.12em]"
                    style={{
                      color: dark
                        ? "rgba(255,255,255,0.24)"
                        : "rgba(20,40,28,0.30)",
                    }}
                  >
                    {feature.number}
                  </span>
                </div>

                <h3
                  className="mt-6 text-lg font-semibold tracking-tight"
                  style={{ color: colors.text }}
                >
                  {feature.title}
                </h3>

                <p
                  className="mt-2 flex-1 text-[13px] leading-6"
                  style={{ color: colors.muted }}
                >
                  {feature.description}
                </p>

                <div
                  className="mt-6 flex items-center gap-2 border-t pt-4"
                  style={{ borderColor: colors.border }}
                >
                  <FiCheckCircle
                    size={13}
                    style={{ color: colors.accentText }}
                  />

                  <span
                    className="text-[9px] font-semibold uppercase tracking-[0.13em]"
                    style={{ color: colors.muted }}
                  >
                    {feature.label}
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        {/* Transparency panel */}
        <div
          className="web3-transparency relative mt-5 overflow-hidden rounded-2xl border"
          style={{
            backgroundColor: colors.card,
            borderColor: colors.border,
          }}
        >
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-0 top-0 w-1"
            style={{ backgroundColor: colors.accent }}
          />

          <div className="flex flex-col gap-6 p-5 sm:p-7 md:flex-row md:items-center md:justify-between md:gap-8">
            <div className="flex items-start gap-4">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border"
                style={{
                  color: colors.accentText,
                  backgroundColor: dark
                    ? "rgba(0,214,160,0.075)"
                    : "rgba(0,168,125,0.07)",
                  borderColor: dark
                    ? "rgba(0,214,160,0.18)"
                    : "rgba(0,168,125,0.18)",
                }}
              >
                <FiShield size={21} />
              </div>

              <div>
                <h3
                  className="text-base font-semibold sm:text-lg"
                  style={{ color: colors.text }}
                >
                  Transparency where it matters
                </h3>

                <p
                  className="mt-2 max-w-2xl text-sm leading-6"
                  style={{ color: colors.muted }}
                >
                  When bounty activity uses on-chain transactions, those
                  records can be checked on the relevant blockchain. Each
                  opportunity follows its own requirements and supported
                  integrations.
                </p>
              </div>
            </div>

            <div
              className="flex shrink-0 items-center gap-3 rounded-xl border px-4 py-3"
              style={{
                borderColor: colors.border,
                backgroundColor: colors.soft,
              }}
            >
              <FiActivity
                size={17}
                style={{ color: colors.accentText }}
              />

              <div>
                <p
                  className="text-xs font-semibold"
                  style={{ color: colors.text }}
                >
                  Connected Web3 experiences
                </p>
                <p
                  className="mt-1 text-[10px]"
                  style={{ color: colors.muted }}
                >
                  Based on supported integrations
                </p>
              </div>

              <FiArrowUpRight
                size={16}
                style={{ color: colors.accentText }}
              />
            </div>
          </div>
        </div>

        {/* Bottom information strip */}
        <div
          className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 border-t pt-6"
          style={{ borderColor: colors.border }}
        >
          {[
            { icon: FiLayers, label: "Multiple ecosystems" },
            { icon: FiDollarSign, label: "Bounty rewards" },
            { icon: FiZap, label: "Community powered" },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <span
                key={item.label}
                className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em]"
                style={{ color: colors.muted }}
              >
                <Icon size={13} style={{ color: colors.accentText }} />
                {item.label}
              </span>
            );
          })}
        </div>
      </div>

      <style>{`
        .web3-grid {
          animation: web3GridDrift 28s linear infinite;
        }

        .web3-ambient {
          animation: web3AmbientFloat 12s ease-in-out infinite alternate;
        }

        .network-item {
          animation: web3NetworkEnter 600ms cubic-bezier(.22, 1, .36, 1) both;
        }

        .web3-card {
          animation: web3CardEnter 650ms cubic-bezier(.22, 1, .36, 1) both;
        }

        .web3-card:hover {
          transform: translateY(-5px);
          border-color: rgba(0, 214, 160, 0.3) !important;
          box-shadow: 0 18px 42px rgba(0, 0, 0, 0.10);
        }

        .web3-transparency {
          transition:
            border-color 300ms ease,
            transform 300ms ease;
        }

        @keyframes web3GridDrift {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 48px 48px;
          }
        }

        @keyframes web3AmbientFloat {
          from {
            transform: translate(-50%, 0) scale(0.95);
          }
          to {
            transform: translate(calc(-50% + 16px), 18px) scale(1.06);
          }
        }

        @keyframes web3NetworkEnter {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes web3CardEnter {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 639px) {
          .web3-grid {
            background-size: 36px 36px;
          }

          .web3-ambient {
            filter: blur(80px);
          }

          .web3-card:hover {
            transform: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .web3-section *,
          .web3-section *::before,
          .web3-section *::after {
            animation: none !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }

          .web3-card:hover,
          .network-item:hover {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
