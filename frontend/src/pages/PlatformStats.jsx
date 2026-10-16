
import { useEffect, useRef, useState } from "react";
import {
  FiArrowUpRight,
  FiCheckCircle,
  FiCode,
  FiDollarSign,
  FiLayers,
  FiZap,
  FiTarget,
  FiUsers,
} from "react-icons/fi";

import dotLogo from "../assets/images/pok.png";
import botLogo from "../assets/images/bot.png";
import arcLogo from "../assets/images/arc.png";

const networks = [
  { name: "Polkadot", symbol: "DOT", image: dotLogo },
  { name: "BOT Chain", symbol: "BOT", image: botLogo },
  { name: "Arc", symbol: "ARC", image: arcLogo },
];

const platformHighlights = [
  {
    icon: FiLayers,
    value: "MULTI-CHAIN",
    label: "Network Flexibility",
    description:
      "A platform designed to bring bounty opportunities and blockchain communities together.",
  },
  {
    icon: FiDollarSign,
    value: "REWARDS",
    label: "Reward Opportunities",
    description:
      "Creators offer rewards for tasks, while contributors earn when their submitted work is approved.",
  },
  {
    icon: FiCode,
    value: "ON-CHAIN",
    label: "Web3 Workflows",
    description:
      "Connect your wallet and participate in bounty workflows built for the Web3 ecosystem.",
  },
  {
    icon: FiZap,
    value: "24/7",
    label: "Open Opportunities",
    description:
      "Discover tasks, share your skills, and find new opportunities to contribute.",
  },
];

export default function PlatformStats() {
  const sectionRef = useRef(null);
  const [dark, setDark] = useState(() =>
    typeof document !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : true
  );
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      setDark(document.documentElement.classList.contains("dark"));
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const theme = dark
    ? {
        text: "text-white",
        muted: "text-white/50",
        card: "border-white/[0.09] bg-[#111411]",
        panel: "border-white/[0.09] bg-white/[0.025]",
        subtle: "border-white/[0.08] bg-white/[0.035]",
        divider: "border-white/[0.08]",
      }
    : {
        text: "text-[#171a18]",
        muted: "text-[#6c716d]",
        card: "border-black/[0.07] bg-white",
        panel: "border-black/[0.07] bg-white/80",
        subtle: "border-black/[0.07] bg-white/80",
        divider: "border-black/[0.08]",
      };

  return (
    <section
      ref={sectionRef}
      className={`platform-overview relative isolate w-full overflow-hidden ${
        dark ? "platform-overview-dark" : "platform-overview-light"
      }`}
    >
      <style>{`
        .platform-overview {
          --platform-accent: #00D6A0;
          --platform-accent-dark: #00A87D;
          transition: background 300ms ease, color 300ms ease;
        }

        .platform-overview-dark {
          background:
            radial-gradient(ellipse at 50% 0%, rgba(0,214,160,.09), transparent 38%),
            linear-gradient(180deg, #080908 0%, #0b0e0b 55%, #080908 100%);
          color: #fff;
        }

        .platform-overview-light {
          background:
            radial-gradient(ellipse at 50% 0%, rgba(0,214,160,.08), transparent 38%),
            linear-gradient(180deg, #f6f5ef 0%, #ffffff 55%, #f6f5ef 100%);
          color: #171a18;
        }

        .platform-overview-grid {
          background-image:
            linear-gradient(rgba(0,214,160,.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,214,160,.035) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: linear-gradient(to bottom, black, transparent 80%);
          -webkit-mask-image: linear-gradient(to bottom, black, transparent 80%);
        }

        .platform-overview-light .platform-overview-grid {
          background-image:
            linear-gradient(rgba(0,100,70,.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,100,70,.035) 1px, transparent 1px);
        }

        .platform-overview-inner {
          width: 100%;
          max-width: 1600px;
          margin-inline: auto;
          padding-inline: clamp(18px, 4.5vw, 72px);
        }

        .platform-overview-gradient {
          background: linear-gradient(100deg, #00A87D, #00D6A0 55%, #7BE8C9);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .platform-overview-card {
          position: relative;
          overflow: hidden;
          min-width: 0;
          transition:
            transform 300ms ease,
            border-color 300ms ease,
            box-shadow 300ms ease;
        }

        .platform-overview-card:hover {
          transform: translateY(-5px);
          border-color: rgba(0,214,160,.35);
          box-shadow: 0 20px 55px rgba(0,0,0,.12);
        }

        .platform-overview-dark .platform-overview-card:hover {
          box-shadow: 0 20px 55px rgba(0,0,0,.25);
        }

        .platform-overview-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 20px;
          right: 20px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,214,160,.6), transparent);
          opacity: .6;
        }

        .platform-overview-reveal {
          opacity: 0;
          transform: translateY(20px);
        }

        .platform-overview-reveal.is-visible {
          animation: platformOverviewReveal .7s cubic-bezier(.22,1,.36,1) forwards;
        }

        .platform-overview-reveal.is-visible:nth-child(2) {
          animation-delay: .08s;
        }

        .platform-overview-reveal.is-visible:nth-child(3) {
          animation-delay: .16s;
        }

        .platform-overview-reveal.is-visible:nth-child(4) {
          animation-delay: .24s;
        }

        @keyframes platformOverviewReveal {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .platform-network-track {
          display: flex;
          width: max-content;
          animation: platformNetworkScroll 28s linear infinite;
          will-change: transform;
        }

        .platform-network-group {
          display: flex;
          flex: none;
          align-items: center;
        }

        .platform-network-item {
          display: flex;
          flex: none;
          align-items: center;
          gap: 12px;
          padding: 0 28px;
          white-space: nowrap;
        }

        .platform-network-ticker:hover .platform-network-track {
          animation-play-state: paused;
        }

        @keyframes platformNetworkScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @media (min-width: 1024px) {
          .platform-network-item {
            gap: 16px;
            padding-inline: 42px;
          }
        }

        @media (max-width: 767px) {
          .platform-overview-reveal {
            opacity: 1;
            transform: none;
          }

          .platform-overview-reveal.is-visible {
            animation: none;
          }

          .platform-overview-card:hover {
            transform: none;
          }

          .platform-overview-grid {
            background-size: 40px 40px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .platform-network-track {
            animation: none;
          }

          .platform-overview-reveal,
          .platform-overview-reveal.is-visible {
            animation: none;
            opacity: 1;
            transform: none;
          }

          .platform-overview-card {
            transition: none;
          }
        }
      `}</style>

      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="platform-overview-grid absolute inset-0 opacity-70" />

        <div className="absolute -left-40 top-24 h-80 w-80 rounded-full bg-[#00D6A0]/[0.07] blur-[110px]" />

        <div className="absolute -right-40 top-[35%] h-96 w-96 rounded-full bg-[#00D6A0]/[0.05] blur-[120px]" />
      </div>

      <div className="platform-overview-inner relative py-16 sm:py-20 lg:py-28">
        {/* Hero */}
        <header className="mx-auto max-w-4xl text-center">
          <div
            className={`mx-auto mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 ${
              dark
                ? "border-[#00D6A0]/20 bg-[#00D6A0]/[0.06]"
                : "border-[#008A66]/20 bg-[#00D6A0]/[0.08]"
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00D6A0] opacity-40" />
              <span className="relative h-2 w-2 rounded-full bg-[#00D6A0]" />
            </span>

            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#00A87D] sm:text-xs">
              Happy Bounty Ecosystem
            </span>
          </div>

          <h2
            className={`text-3xl font-bold leading-[1.12] tracking-[-0.045em] sm:text-4xl md:text-5xl lg:text-6xl ${
              dark ? "text-white" : "text-[#171a18]"
            }`}
          >
            Good work deserves
            <br className="hidden sm:block" />{" "}
            <span className="platform-overview-gradient">
              great rewards.
            </span>
          </h2>

          <p
            className={`mx-auto mt-5 max-w-2xl text-sm leading-7 sm:mt-6 sm:text-base lg:text-lg ${
              dark ? "text-white/55" : "text-[#666c67]"
            }`}
          >
            Happy Bounty brings creators and contributors together to turn
            tasks into opportunities. Discover bounties, submit your work,
            and earn rewards across the Web3 ecosystem.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <div
              className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-medium ${
                theme.subtle
              }`}
            >
              <FiUsers className="text-[#00A87D]" size={15} />
              For creators and contributors
            </div>

            <div
              className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-medium ${
                theme.subtle
              }`}
            >
              <FiCheckCircle className="text-[#00A87D]" size={15} />
              Task-based rewards
            </div>
          </div>
        </header>

        {/* Network ticker */}
        <div className="mt-16 sm:mt-20 lg:mt-24">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#00A87D]">
                Network ecosystem
              </p>
              <h3
                className={`mt-2 text-lg font-bold sm:text-xl ${
                  dark ? "text-white" : "text-[#171a18]"
                }`}
              >
                Explore supported networks
              </h3>
            </div>

            <p className={`max-w-md text-xs leading-5 ${theme.muted}`}>
              Network availability depends on the integrations enabled in the
              platform.
            </p>
          </div>

          <div
            className={`platform-network-ticker relative overflow-hidden rounded-2xl border ${
              dark
                ? "border-white/[0.09] bg-white/[0.025]"
                : "border-black/[0.07] bg-white/70"
            }`}
            aria-label="Network logos: Polkadot, BOT Chain, and Arc"
          >
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-8 sm:w-16 ${
                dark
                  ? "bg-gradient-to-r from-[#0b0d0b] to-transparent"
                  : "bg-gradient-to-r from-[#f8f7f2] to-transparent"
              }`}
            />

            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-8 sm:w-16 ${
                dark
                  ? "bg-gradient-to-l from-[#0b0d0b] to-transparent"
                  : "bg-gradient-to-l from-[#f8f7f2] to-transparent"
              }`}
            />

            <div className="platform-network-track py-5 sm:py-6">
              {[0, 1].map((group) => (
                <div
                  key={group}
                  className="platform-network-group"
                  aria-hidden={group === 1 ? "true" : undefined}
                >
                  {networks.map((network) => (
                    <div
                      key={`${group}-${network.symbol}`}
                      className="platform-network-item"
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border p-2 sm:h-12 sm:w-12 ${
                          dark
                            ? "border-white/10 bg-white/[0.045]"
                            : "border-black/[0.07] bg-white"
                        }`}
                      >
                        <img
                          src={network.image}
                          alt={group === 0 ? `${network.name} logo` : ""}
                          className="h-full w-full object-contain"
                          loading="lazy"
                        />
                      </div>

                      <div>
                        <p
                          className={`text-sm font-bold ${
                            dark ? "text-white" : "text-[#171a18]"
                          }`}
                        >
                          {network.name}
                        </p>
                        <p className="mt-1 text-[10px] font-semibold tracking-[0.15em] text-[#00A87D]">
                          {network.symbol}
                        </p>
                      </div>

                      <span
                        aria-hidden="true"
                        className={`ml-2 h-1.5 w-1.5 rounded-full ${
                          dark ? "bg-white/20" : "bg-black/20"
                        }`}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="mt-16 sm:mt-20 lg:mt-24">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#00A87D]">
                Why Happy Bounty
              </p>
              <h3
                className={`mt-2 text-2xl font-bold tracking-tight sm:text-3xl ${
                  dark ? "text-white" : "text-[#171a18]"
                }`}
              >
                Everything starts with an opportunity.
              </h3>
            </div>

            <p className={`max-w-lg text-sm leading-6 ${theme.muted}`}>
              A straightforward way to publish work, find contributors, and
              reward completed tasks.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {platformHighlights.map((item, index) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.label}
                  className={`platform-overview-card platform-overview-reveal ${
                    isVisible ? "is-visible" : ""
                  } rounded-2xl border p-5 sm:p-6 lg:p-7 ${theme.card}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#00D6A0]/20 bg-[#00D6A0]/[0.08]">
                      <Icon size={20} className="text-[#00A87D]" />
                    </div>

                    <span
                      className={`text-[10px] font-bold tracking-[0.18em] ${
                        dark ? "text-white/25" : "text-black/25"
                      }`}
                    >
                      0{index + 1}
                    </span>
                  </div>

                  <p
                    className={`mt-7 break-words text-xl font-black tracking-[-0.035em] sm:text-2xl ${
                      index === 0 || index === 1
                        ? "text-[#00A87D]"
                        : dark
                          ? "text-white"
                          : "text-[#171a18]"
                    }`}
                  >
                    {item.value}
                  </p>

                  <h4
                    className={`mt-2 text-sm font-bold ${
                      dark ? "text-white" : "text-[#252925]"
                    }`}
                  >
                    {item.label}
                  </h4>

                  <p
                    className={`mt-3 text-xs leading-6 sm:text-sm ${
                      dark ? "text-white/50" : "text-[#6c716d]"
                    }`}
                  >
                    {item.description}
                  </p>

                  <div
                    className={`mt-6 flex items-center gap-2 border-t pt-4 ${
                      theme.divider
                    }`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00D6A0]" />
                    <span
                      className={`text-[9px] font-bold uppercase tracking-[0.13em] ${
                        dark ? "text-white/35" : "text-[#858a85]"
                      }`}
                    >
                      Happy Bounty
                    </span>

                    <FiArrowUpRight
                      size={13}
                      className="ml-auto text-[#00A87D]"
                    />
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Workflow panel */}
        <div className="mt-6">
          <div
            className={`relative overflow-hidden rounded-2xl border p-5 sm:p-7 lg:p-9 ${theme.panel}`}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-[#00D6A0]/[0.08] blur-[85px]"
            />

            <div className="relative grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-center">
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#00D6A0]/20 bg-[#00D6A0]/[0.08]">
                  <FiTarget size={20} className="text-[#00A87D]" />
                </div>

                <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#00A87D]">
                  How it works
                </p>

                <h3
                  className={`mt-2 text-2xl font-bold tracking-tight sm:text-3xl ${
                    dark ? "text-white" : "text-[#171a18]"
                  }`}
                >
                  From task to reward.
                </h3>

                <p className={`mt-3 max-w-lg text-sm leading-6 ${theme.muted}`}>
                  Create a bounty, let contributors submit their work, review
                  submissions, and reward approved contributions.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  {
                    number: "01",
                    title: "Create",
                    description: "Publish a task and set its reward.",
                  },
                  {
                    number: "02",
                    title: "Contribute",
                    description: "Complete the task and submit your work.",
                  },
                  {
                    number: "03",
                    title: "Get rewarded",
                    description: "Receive the reward after approval.",
                  },
                ].map((step) => (
                  <div
                    key={step.number}
                    className={`rounded-xl border p-4 sm:p-5 ${
                      dark
                        ? "border-white/[0.08] bg-black/20"
                        : "border-black/[0.07] bg-white/75"
                    }`}
                  >
                    <span className="text-xs font-black tracking-[0.16em] text-[#00A87D]">
                      {step.number}
                    </span>

                    <h4
                      className={`mt-4 text-sm font-bold ${
                        dark ? "text-white" : "text-[#171a18]"
                      }`}
                    >
                      {step.title}
                    </h4>

                    <p
                      className={`mt-2 text-xs leading-5 ${
                        dark ? "text-white/45" : "text-[#737873]"
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom message */}
        <footer
          className={`mt-8 flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between ${
            theme.divider
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#00D6A0]/20 bg-[#00D6A0]/[0.07]">
              <FiCheckCircle size={16} className="text-[#00A87D]" />
            </span>

            <div>
              <p
                className={`text-sm font-bold ${
                  dark ? "text-white" : "text-[#171a18]"
                }`}
              >
                Built for people who get things done.
              </p>
              <p className={`mt-1 text-xs ${theme.muted}`}>
                Discover work. Contribute skills. Earn rewards.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start rounded-full border border-[#00D6A0]/20 bg-[#00D6A0]/[0.06] px-3 py-2 sm:self-auto">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00D6A0]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#00A87D]">
              Happy Bounty Ecosystem
            </span>
          </div>
        </footer>
      </div>
    </section>
  );
}
