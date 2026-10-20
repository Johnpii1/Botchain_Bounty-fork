import { useEffect, useRef, useState } from "react";
import {
  FiArrowRight,
  FiCheck,
  FiCheckCircle,
  FiDollarSign,
  FiGlobe,
  FiLayers,
  FiShield,
  FiUsers,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { useNav } from "../hooks/useNav";

import ArcLogo from "../assets/images/arc.png";
import InjectiveLogo from "../assets/images/inj.png";
import BotchainLogo from "../assets/images/bot.png";
import PolkadotLogo from "../assets/images/pok.png";

const features = [
  {
    icon: FiDollarSign,
    number: "01",
    title: "USDC Rewards",
    description:
      "Create reward-backed tasks and earn USDC by completing bounties and getting your submissions approved.",
    footer: "REWARD-DRIVEN WORK",
  },
  {
    icon: FiGlobe,
    number: "02",
    title: "Multi-chain Ecosystem",
    description:
      "Discover bounty opportunities across supported blockchain communities and connect with Web3 contributors.",
    footer: "MULTI-CHAIN ECOSYSTEM",
  },
  {
    icon: FiShield,
    number: "03",
    title: "Transparent Activity",
    description:
      "Supported blockchain transactions can provide verifiable records of bounty funding and reward transfers.",
    footer: "ON-CHAIN ACTIVITY",
  },
  {
    icon: FiUsers,
    number: "04",
    title: "Work Together",
    description:
      "Post tasks, discover opportunities, submit your work, and collaborate with people across Web3.",
    footer: "COMMUNITY-POWERED",
  },
];

const networks = [
  {
    name: "Arc",
    logo: ArcLogo,
    description: "Arc ecosystem",
    color: "#00D6A0",
  },
  {
    name: "Injective",
    logo: InjectiveLogo,
    description: "Injective ecosystem",
    color: "#00A1FF",
  },
  {
    name: "Botchain",
    logo: BotchainLogo,
    description: "Botchain ecosystem",
    color: "#42A5F5",
  },
  {
    name: "Portaldot",
    logo: PolkadotLogo,
    description: "Portaldot ecosystem",
    color: "#C9B7FF",
  },
];

function Features() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const { handleNavigate } = useNav();

  const [dark, setDark] = useState(() =>
    typeof document !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : true,
  );

  // Detect the application's global theme.
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

  // Reveal the section when it enters the viewport.
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(section);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const palette = {
    background: dark ? "#080B0D" : "#F4F7F5",
    card: dark ? "#111614" : "#FFFFFF",
    text: dark ? "#F4F7F5" : "#171C19",
    muted: dark ? "#98A29C" : "#747D77",
    border: dark ? "rgba(255,255,255,0.085)" : "rgba(20,40,28,0.10)",
    subtle: dark ? "rgba(255,255,255,0.035)" : "rgba(20,40,28,0.035)",
  };

  return (
    <>
      <style>{`
        @keyframes featuresFadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes featuresFadeDown {
          from {
            opacity: 0;
            transform: translateY(-16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes featuresPulse {
          0%, 100% {
            opacity: .45;
          }
          50% {
            opacity: 1;
          }
        }

        .features-reveal {
          opacity: 0;
        }

        .features-reveal.visible {
          animation: featuresFadeUp .7s cubic-bezier(.22,1,.36,1) forwards;
        }

        .features-heading.visible {
          animation: featuresFadeDown .7s ease-out forwards;
        }

        .features-network,
        .features-benefit {
          transition:
            transform .3s ease,
            border-color .3s ease,
            background-color .3s ease,
            box-shadow .3s ease;
        }

        .features-network:hover,
        .features-benefit:hover {
          transform: translateY(-4px);
        }

        .network-logo {
          transition: transform .3s ease;
        }

        .features-network:hover .network-logo {
          transform: scale(1.07);
        }

        .network-arrow {
          transition: transform .3s ease;
        }

        .features-network:hover .network-arrow {
          transform: translateX(3px);
        }

        .features-live-dot {
          animation: featuresPulse 2s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .features-reveal,
          .features-reveal.visible,
          .features-heading.visible {
            opacity: 1;
            animation: none !important;
            transform: none !important;
          }

          .features-network,
          .features-benefit,
          .network-logo,
          .network-arrow,
          .features-live-dot {
            animation: none !important;
            transition: none !important;
          }

          .features-network:hover,
          .features-benefit:hover {
            transform: none;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="relative z-10 my-20 overflow-hidden px-5 py-16 transition-colors duration-500 sm:my-24 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
        style={{
          backgroundColor: palette.background,
          color: palette.text,
        }}
      >
        {/* Background grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(
                ${dark ? "rgba(0,214,160,0.025)" : "rgba(0,120,85,0.035)"} 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                ${dark ? "rgba(0,214,160,0.025)" : "rgba(0,120,85,0.035)"} 1px,
                transparent 1px
              )
            `,
            backgroundSize: "48px 48px",
            maskImage: "linear-gradient(to bottom, black, transparent 90%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black, transparent 90%)",
          }}
        />

        {/* Ambient green accent */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-72 w-[min(700px,100%)] -translate-x-1/2 rounded-full blur-[120px]"
          style={{
            backgroundColor: dark
              ? "rgba(0,214,160,0.055)"
              : "rgba(0,168,125,0.045)",
          }}
        />

        <div className="relative mx-auto max-w-7xl">
          {/* Heading */}
          <div
            className={`features-heading features-reveal ${
              isVisible ? "visible" : ""
            } mx-auto mb-12 max-w-3xl text-center sm:mb-16`}
          >
            <div
              className="mb-5 inline-flex items-center gap-2.5 rounded-full border px-4 py-2"
              style={{
                borderColor: palette.border,
                backgroundColor: palette.subtle,
              }}
            >
              <span className="features-live-dot h-2 w-2 rounded-full bg-[#00D6A0]" />

              <span
                className="text-[10px] font-semibold uppercase tracking-[0.16em] sm:text-[11px]"
                style={{ color: palette.muted }}
              >
                One platform. Multiple networks.
              </span>
            </div>

            <h2
              className="text-3xl font-bold leading-tight tracking-[-0.045em] sm:text-4xl md:text-5xl"
              style={{ color: palette.text }}
            >
              Everything you need to{" "}
              <span className="text-[#00A87D]">earn.</span>
            </h2>

            <p
              className="mx-auto mt-5 max-w-2xl text-sm leading-7 sm:text-base"
              style={{ color: palette.muted }}
            >
              Happy Bounty connects creators and contributors through
              reward-backed tasks, blockchain communities, and a multi-chain
              Web3 ecosystem.
            </p>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.number}
                  className={`features-benefit features-reveal ${
                    isVisible ? "visible" : ""
                  } group relative flex min-h-[275px] flex-col overflow-hidden rounded-2xl border p-5 sm:p-6`}
                  style={{
                    animationDelay: `${index * 120}ms`,
                    backgroundColor: palette.card,
                    borderColor: palette.border,
                    boxShadow: dark
                      ? "0 12px 36px rgba(0,0,0,0.16)"
                      : "0 12px 36px rgba(20,40,28,0.035)",
                  }}
                >
                  <div
                    aria-hidden="true"
                    className="absolute left-5 right-5 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, #00D6A0, transparent)",
                    }}
                  />

                  <div className="flex items-start justify-between">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl border"
                      style={{
                        color: "#00A87D",
                        backgroundColor: "rgba(0,214,160,0.07)",
                        borderColor: "rgba(0,214,160,0.19)",
                      }}
                    >
                      <Icon size={21} strokeWidth={1.8} />
                    </div>

                    <span
                      className="text-xs font-semibold tracking-widest"
                      style={{
                        color: dark
                          ? "rgba(255,255,255,0.23)"
                          : "rgba(20,40,28,0.27)",
                      }}
                    >
                      {feature.number}
                    </span>
                  </div>

                  <h3
                    className="mt-6 text-lg font-semibold tracking-tight"
                    style={{ color: palette.text }}
                  >
                    {feature.title}
                  </h3>

                  <p
                    className="mt-3 flex-1 text-[13px] leading-6"
                    style={{ color: palette.muted }}
                  >
                    {feature.description}
                  </p>

                  <div
                    className="mt-6 flex items-center gap-2 border-t pt-4"
                    style={{ borderColor: palette.border }}
                  >
                    <FiCheckCircle
                      size={13}
                      className="shrink-0 text-[#00A87D]"
                    />

                    <span
                      className="text-[9px] font-semibold uppercase tracking-[0.12em]"
                      style={{ color: palette.muted }}
                    >
                      {feature.footer}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Supported networks */}
          <div className="mt-16 sm:mt-20">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#00A87D]">
                  The ecosystem
                </p>

                <h3
                  className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl"
                  style={{ color: palette.text }}
                >
                  Built across networks.
                </h3>

                <p
                  className="mt-2 max-w-xl text-sm leading-6"
                  style={{ color: palette.muted }}
                >
                  A place to discover bounty opportunities across the blockchain
                  ecosystems connected to Happy Bounty.
                </p>
              </div>

              <div
                className="flex w-fit items-center gap-2 rounded-full border px-3 py-2"
                style={{
                  borderColor: palette.border,
                  backgroundColor: palette.subtle,
                }}
              >
                <FiLayers size={14} className="text-[#00A87D]" />

                <span
                  className="text-[10px] font-semibold uppercase tracking-wider"
                  style={{ color: palette.muted }}
                >
                  Multi-chain
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {networks.map((network, index) => (
                <div
                  key={network.name}
                  className={`features-network features-reveal ${
                    isVisible ? "visible" : ""
                  } flex items-center gap-4 rounded-2xl border p-4 sm:p-5`}
                  style={{
                    animationDelay: `${450 + index * 100}ms`,
                    backgroundColor: palette.card,
                    borderColor: palette.border,
                  }}
                >
                  <div
                    className="network-logo flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border p-2.5"
                    style={{
                      backgroundColor: `${network.color}12`,
                      borderColor: `${network.color}35`,
                    }}
                  >
                    <img
                      src={network.logo}
                      alt={`${network.name} logo`}
                      className="h-full w-full object-contain"
                      loading="lazy"
                      onError={(event) => {
                        console.error(
                          `Could not load ${network.name} logo:`,
                          network.logo,
                        );
                      }}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4
                      className="text-sm font-semibold"
                      style={{ color: palette.text }}
                    >
                      {network.name}
                    </h4>

                    <p
                      className="mt-1 text-[11px] leading-5"
                      style={{ color: palette.muted }}
                    >
                      {network.description}
                    </p>
                  </div>

                  <FiArrowRight
                    size={15}
                    className="network-arrow shrink-0"
                    style={{ color: network.color }}
                  />
                </div>
              ))}
            </div>

            <p
              className="mt-4 text-[11px] leading-5"
              style={{ color: palette.muted }}
            >
              Network availability depends on the integrations enabled in the
              application.
            </p>
          </div>

          {/* Transparency panel */}
          <div
            className={`features-reveal ${
              isVisible ? "visible" : ""
            } mt-8 overflow-hidden rounded-2xl border`}
            style={{
              animationDelay: "800ms",
              backgroundColor: palette.card,
              borderColor: palette.border,
            }}
          >
            <div
              className="h-px w-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(0,214,160,0.65), transparent)",
              }}
            />

            <div className="flex flex-col gap-5 p-5 sm:p-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border"
                  style={{
                    color: "#00A87D",
                    backgroundColor: "rgba(0,214,160,0.07)",
                    borderColor: "rgba(0,214,160,0.19)",
                  }}
                >
                  <FiShield size={20} />
                </div>

                <div>
                  <h3
                    className="text-sm font-semibold sm:text-base"
                    style={{ color: palette.text }}
                  >
                    Transparency at every step
                  </h3>

                  <p
                    className="mt-1.5 max-w-2xl text-xs leading-6 sm:text-sm"
                    style={{ color: palette.muted }}
                  >
                    Creators can post tasks, contributors can submit solutions,
                    and supported blockchain transactions provide verifiable
                    payment records.
                  </p>
                </div>
              </div>

              <div
                className="flex shrink-0 items-center gap-2 self-start rounded-full border px-3 py-2 md:self-center"
                style={{
                  borderColor: "rgba(0,214,160,0.22)",
                  backgroundColor: "rgba(0,214,160,0.055)",
                }}
              >
                <FiCheck size={13} className="text-[#00A87D]" />

                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#00A87D]">
                  Built for Web3
                </span>
              </div>
            </div>
          </div>

          {/* Ecosystem footer */}
          <div
            className={`features-reveal ${
              isVisible ? "visible" : ""
            } mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 border-t pt-6 sm:gap-x-5`}
            style={{
              animationDelay: "950ms",
              borderColor: palette.border,
            }}
          >
            {["ARC", "INJECTIVE", "BOTCHAIN", "PORTALDOT", "USDC REWARDS"].map(
              (label, index) => (
                <div key={label} className="flex items-center gap-4 sm:gap-5">
                  <span
                    className="text-[9px] font-semibold uppercase tracking-[0.15em]"
                    style={{
                      color: index === 0 ? "#00A87D" : palette.muted,
                    }}
                  >
                    {label}
                  </span>

                  {index < 4 && (
                    <span
                      className="h-1 w-1 rounded-full"
                      style={{
                        backgroundColor: dark
                          ? "rgba(255,255,255,0.18)"
                          : "rgba(20,40,28,0.20)",
                      }}
                    />
                  )}
                </div>
              ),
            )}
          </div>

          {/* Dashboard navigation */}
          <div className="mt-8 flex justify-center">
            <Link
              to="/dashboard"
              onClick={(event) => {
                event.preventDefault();
                handleNavigate("/dashboard");
              }}
              className="group inline-flex items-center gap-2.5 rounded-xl border px-5 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:border-[#00D6A0] hover:bg-[#00D6A0] hover:text-[#07110D] hover:shadow-[0_10px_30px_rgba(0,214,160,0.15)]"
              style={{
                color: dark ? "#00D6A0" : "#008B68",
                borderColor: "rgba(0,214,160,0.28)",
                backgroundColor: palette.card,
              }}
            >
              Explore Opportunities
              <FiArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Features;
