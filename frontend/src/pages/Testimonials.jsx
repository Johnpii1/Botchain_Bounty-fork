import { useEffect, useRef, useState } from "react";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiCheckCircle,
  FiCode,
  FiCompass,
  FiDollarSign,
  FiGlobe,
  FiLayers,
  FiPenTool,
  FiShield,
  FiTarget,
  FiUsers,
  FiZap,
} from "react-icons/fi";

import dotLogo from "../assets/images/pok.png";
import botLogo from "../assets/images/bot.png";
import arcLogo from "../assets/images/arc.png";

const communityUseCases = [
  {
    icon: FiCode,
    role: "Bounty Creator",
    type: "For project builders",
    network: "MULTI-CHAIN",
    tag: "POST A BOUNTY",
    message:
      "Turn your project goals into clear, rewarding tasks. Define the requirements, set the reward, and invite contributors to bring your ideas to life.",
    footer: "Create opportunities",
    status: "Creator workflow",
    number: "01",
  },
  {
    icon: FiPenTool,
    role: "Bounty Contributor",
    type: "For independent talent",
    network: "REWARDS",
    tag: "EARN BY BUILDING",
    message:
      "Discover opportunities that match your skills, complete the work, submit your contribution, and earn rewards when your work is approved.",
    footer: "Put your skills to work",
    status: "Contributor workflow",
    number: "02",
  },
  {
    icon: FiLayers,
    role: "Web3 Developer",
    type: "For technical teams",
    network: "ON-CHAIN",
    tag: "BUILD TOGETHER",
    message:
      "Break ambitious ideas into focused tasks. Give contributors clear requirements and a straightforward path from submission to reward.",
    footer: "Build with clarity",
    status: "Task-based work",
    number: "03",
  },
  {
    icon: FiDollarSign,
    role: "Project Founder",
    type: "For growing projects",
    network: "FUNDING",
    tag: "REWARD GOOD WORK",
    message:
      "Define the work that needs to be done and the reward attached to it. Help contributors understand the opportunity before getting started.",
    footer: "Reward contributions",
    status: "Defined rewards",
    number: "04",
  },
  {
    icon: FiGlobe,
    role: "Global Contributor",
    type: "For remote collaboration",
    network: "GLOBAL",
    tag: "OPEN OPPORTUNITIES",
    message:
      "Find work beyond your immediate network. Connect your skills with projects and communities that need your contributions.",
    footer: "Work across communities",
    status: "Open participation",
    number: "05",
  },
  {
    icon: FiUsers,
    role: "Community Builder",
    type: "For Web3 communities",
    network: "COMMUNITY",
    tag: "GROW TOGETHER",
    message:
      "Turn community goals into actionable tasks. Give people a shared objective and meaningful reasons to participate and contribute.",
    footer: "Bring people together",
    status: "Community-driven",
    number: "06",
  },
  {
    icon: FiTarget,
    role: "Creative Contributor",
    type: "For creative projects",
    network: "CREATIVITY",
    tag: "MAKE AN IMPACT",
    message:
      "From content and design to research and social campaigns, turn creative skills into meaningful contributions for growing projects.",
    footer: "Create and contribute",
    status: "Flexible tasks",
    number: "07",
  },
  {
    icon: FiShield,
    role: "Independent Builder",
    type: "For transparent workflows",
    network: "TRANSPARENCY",
    tag: "CLEAR EXPECTATIONS",
    message:
      "Keep tasks, submission requirements, and rewards clear so creators and contributors can work together with greater confidence.",
    footer: "Keep work organized",
    status: "Clear requirements",
    number: "08",
  },
];

const networks = [
  {
    name: "Polkadot",
    symbol: "DOT",
    logo: dotLogo,
    alt: "Polkadot logo",
    tone: "border-purple-500/20",
    glow: "group-hover:shadow-[0_0_25px_rgba(230,0,122,0.10)]",
  },
  {
    name: "BOT Chain",
    symbol: "BOT",
    logo: botLogo,
    alt: "BOT Chain logo",
    tone: "border-[#00D6A0]/20",
    glow: "group-hover:shadow-[0_0_25px_rgba(0,214,160,0.10)]",
  },
  {
    name: "Arc",
    symbol: "ARC",
    logo: arcLogo,
    alt: "Arc network logo",
    tone: "border-blue-500/20",
    glow: "group-hover:shadow-[0_0_25px_rgba(59,130,246,0.10)]",
  },
];

const valuePoints = [
  {
    icon: FiCompass,
    title: "Discover opportunities",
    description:
      "Explore tasks that match your interests, goals, and skills.",
  },
  {
    icon: FiZap,
    title: "Turn effort into value",
    description:
      "Complete meaningful work and pursue the rewards attached to it.",
  },
  {
    icon: FiShield,
    title: "Know what to expect",
    description:
      "Understand task requirements and reward details before you begin.",
  },
];

function Testimonials() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [dark, setDark] = useState(() => {
    if (typeof document === "undefined") return false;

    return document.documentElement.classList.contains("dark");
  });

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

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.08,
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const duplicatedUseCases = [
    ...communityUseCases,
    ...communityUseCases,
  ];

  return (
    <>
      <style>{`
        @keyframes hb-enter {
          from {
            opacity: 0;
            transform: translate3d(0, 26px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes hb-marquee {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @keyframes hb-float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        @keyframes hb-pulse {
          0%, 100% {
            opacity: .5;
            transform: scale(.85);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes hb-glow {
          0%, 100% {
            opacity: .35;
          }
          50% {
            opacity: .7;
          }
        }

        .hb-reveal {
          opacity: 0;
        }

        .hb-reveal.hb-visible {
          animation: hb-enter .8s cubic-bezier(.22, 1, .36, 1) forwards;
        }

        .hb-community-track {
          display: flex;
          width: max-content;
          animation: hb-marquee 75s linear infinite;
          will-change: transform;
        }

        .hb-community-marquee:hover .hb-community-track,
        .hb-community-marquee:focus-within .hb-community-track {
          animation-play-state: paused;
        }

        .hb-community-card {
          transition:
            transform .35s cubic-bezier(.2, .8, .2, 1),
            border-color .35s ease,
            box-shadow .35s ease,
            background-color .35s ease;
        }

        .hb-community-card:hover {
          transform: translateY(-7px);
          border-color: rgba(0, 214, 160, .38);
          box-shadow: 0 20px 55px rgba(0, 214, 160, .055);
        }

        .hb-community-icon {
          transition:
            transform .35s ease,
            background-color .35s ease,
            border-color .35s ease;
        }

        .hb-community-card:hover .hb-community-icon {
          transform: translateY(-2px) scale(1.04);
          background-color: rgba(0, 214, 160, .13);
          border-color: rgba(0, 214, 160, .35);
        }

        .hb-network-chip {
          transition:
            transform .3s ease,
            border-color .3s ease,
            box-shadow .3s ease;
        }

        .hb-network-chip:hover {
          transform: translateY(-3px);
        }

        .hb-network-logo {
          width: 29px;
          height: 29px;
          object-fit: contain;
          flex-shrink: 0;
        }

        .hb-status-dot {
          animation: hb-pulse 2.5s ease-in-out infinite;
        }

        .hb-background-glow {
          animation: hb-glow 8s ease-in-out infinite;
        }

        .hb-section-grid {
          background-image:
            linear-gradient(
              rgba(0, 214, 160, .035) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(0, 214, 160, .035) 1px,
              transparent 1px
            );
          background-size: 54px 54px;
          mask-image: linear-gradient(
            to bottom,
            black,
            transparent 85%
          );
          -webkit-mask-image: linear-gradient(
            to bottom,
            black,
            transparent 85%
          );
        }

        @media (max-width: 768px) {
          .hb-community-track {
            animation-duration: 65s;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hb-reveal,
          .hb-reveal.hb-visible {
            opacity: 1;
            animation: none !important;
            transform: none !important;
          }

          .hb-community-track {
            animation: none !important;
            transform: none !important;
          }

          .hb-community-marquee {
            overflow-x: auto;
            overscroll-behavior-x: contain;
            scrollbar-width: thin;
          }

          .hb-community-card,
          .hb-community-icon,
          .hb-network-chip,
          .hb-status-dot,
          .hb-background-glow {
            animation: none !important;
            transition: none !important;
          }

          .hb-community-card:hover,
          .hb-network-chip:hover {
            transform: none;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        aria-labelledby="hb-community-title"
        className={`relative z-10 mx-3 overflow-hidden rounded-[28px] border transition-colors duration-500 sm:mx-5 md:mx-8 md:rounded-[36px] lg:mx-12 ${
          dark
            ? "border-white/[0.07] bg-[#080908] text-white"
            : "border-black/[0.06] bg-[#f6f5ef] text-[#171916]"
        }`}
      >
        {/* Background effects */}
        <div
          aria-hidden="true"
          className="hb-section-grid pointer-events-none absolute inset-0"
        />

        <div
          aria-hidden="true"
          className="hb-background-glow pointer-events-none absolute -top-36 left-1/2 h-80 w-[min(85%,760px)] -translate-x-1/2 rounded-full bg-[#00D6A0]/[0.09] blur-[110px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-48 -right-20 h-80 w-80 rounded-full bg-[#00D6A0]/[0.045] blur-[100px]"
        />

        <div className="relative mx-auto w-full max-w-[1600px] py-14 sm:py-16 md:py-20 lg:py-24">
          {/* Main heading */}
          <header
            className={`hb-reveal ${
              isVisible ? "hb-visible" : ""
            } mx-auto mb-12 max-w-5xl px-5 text-center sm:mb-14 md:px-8 lg:mb-16`}
          >
            <div
              className={`mb-7 inline-flex max-w-full flex-wrap items-center justify-center gap-2.5 rounded-full border px-4 py-2 ${
                dark
                  ? "border-white/[0.09] bg-white/[0.035]"
                  : "border-black/[0.07] bg-white/75"
              }`}
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00D6A0] opacity-30" />
                <span className="relative h-2 w-2 rounded-full bg-[#00D6A0]" />
              </span>

              <span
                className={`text-[9px] font-bold uppercase tracking-[0.17em] sm:text-[10px] sm:tracking-[0.2em] ${
                  dark ? "text-white/65" : "text-[#686c64]"
                }`}
              >
                Built for people who build
              </span>

              <span
                className={`hidden h-3.5 w-px sm:block ${
                  dark ? "bg-white/15" : "bg-black/15"
                }`}
              />

              <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#00A87D] sm:text-[10px]">
                Happy Bounty
              </span>
            </div>

            <h2
              id="hb-community-title"
              className={`text-[clamp(2.3rem,6.3vw,5.3rem)] font-bold leading-[1.03] tracking-[-0.065em] ${
                dark ? "text-white" : "text-[#171916]"
              }`}
            >
              One community.
              <br />
              <span className="bg-gradient-to-r from-[#00A87D] via-[#00D6A0] to-[#00A87D] bg-clip-text text-transparent">
                Endless possibilities.
              </span>
            </h2>

            <p
              className={`mx-auto mt-6 max-w-2xl text-sm leading-7 sm:mt-7 sm:text-base sm:leading-8 ${
                dark ? "text-white/55" : "text-[#72756d]"
              }`}
            >
              Good ideas need great people. Happy Bounty brings project
              creators and talented contributors together through clear
              tasks, meaningful work, and rewards.
            </p>

            {/* Ecosystem selector chips */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-9">
              {networks.map((network, index) => (
                <div
                  key={network.symbol}
                  className={`hb-network-chip group inline-flex items-center gap-3 rounded-2xl border px-3.5 py-3 sm:px-4 ${
                    dark
                      ? `bg-white/[0.025] ${network.tone}`
                      : `bg-white/80 ${network.tone}`
                  } ${network.glow}`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
                      dark
                        ? "border-white/[0.07] bg-white/[0.035]"
                        : "border-black/[0.04] bg-[#f8f9f5]"
                    }`}
                  >
                    <img
                      src={network.logo}
                      alt={network.alt}
                      className="hb-network-logo"
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  </div>

                  <div className="text-left">
                    <p
                      className={`text-xs font-bold ${
                        dark ? "text-white/90" : "text-[#282d27]"
                      }`}
                    >
                      {network.name}
                    </p>

                    <p
                      className={`mt-1 text-[9px] font-semibold tracking-[0.15em] ${
                        dark ? "text-white/35" : "text-[#85897f]"
                      }`}
                    >
                      {network.symbol}
                    </p>
                  </div>

                  <FiArrowUpRight
                    aria-hidden="true"
                    className={`ml-1 h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
                      dark ? "text-white/30" : "text-black/30"
                    }`}
                  />
                </div>
              ))}
            </div>

            <p
              className={`mt-4 text-[10px] leading-5 ${
                dark ? "text-white/35" : "text-[#8a8d83]"
              }`}
            >
              Explore the ecosystems represented on Happy Bounty.
            </p>
          </header>

          {/* Section heading */}
          <div
            className={`hb-reveal ${
              isVisible ? "hb-visible" : ""
            } mb-6 flex items-end justify-between gap-4 px-5 sm:mb-7 sm:px-8 lg:px-12`}
            style={{ animationDelay: "120ms" }}
          >
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#00A87D] sm:text-[10px]">
                Explore the possibilities
              </p>

              <h3
                className={`mt-2 text-lg font-bold tracking-[-0.035em] sm:text-2xl ${
                  dark ? "text-white" : "text-[#242921]"
                }`}
              >
                Find your place in the ecosystem.
              </h3>

              <p
                className={`mt-2 max-w-xl text-xs leading-6 sm:text-sm ${
                  dark ? "text-white/45" : "text-[#777b72]"
                }`}
              >
                From posting your first bounty to delivering your next big
                contribution, there's a place for you here.
              </p>
            </div>

            <div
              className={`hidden shrink-0 items-center gap-2 pb-1 text-xs sm:flex ${
                dark ? "text-white/40" : "text-[#85897f]"
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#00D6A0]" />
              Hover to explore
            </div>
          </div>

          {/* Seamless moving cards */}
          <div className="hb-community-marquee relative w-full overflow-hidden">
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r to-transparent sm:w-14 lg:w-20 ${
                dark ? "from-[#080908]" : "from-[#f6f5ef]"
              }`}
            />

            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l to-transparent sm:w-14 lg:w-20 ${
                dark ? "from-[#080908]" : "from-[#f6f5ef]"
              }`}
            />

            <div className="hb-community-track">
              {duplicatedUseCases.map((item, index) => (
                <CommunityCard
                  key={`${item.number}-${index}`}
                  item={item}
                  dark={dark}
                  isDuplicate={index >= communityUseCases.length}
                />
              ))}
            </div>
          </div>

          {/* Value points */}
          <div
            className={`hb-reveal ${
              isVisible ? "hb-visible" : ""
            } mx-4 mt-12 grid grid-cols-1 gap-3 sm:mx-8 sm:mt-16 sm:grid-cols-3 sm:gap-4 lg:mx-12`}
            style={{ animationDelay: "220ms" }}
          >
            {valuePoints.map((point, index) => (
              <ValuePoint
                key={point.title}
                dark={dark}
                point={point}
                index={index}
              />
            ))}
          </div>

          {/* Closing statement */}
          <div
            className={`hb-reveal ${
              isVisible ? "hb-visible" : ""
            } mx-4 mt-7 flex flex-col items-center justify-between gap-5 rounded-3xl border p-5 sm:mx-8 sm:mt-9 sm:flex-row sm:p-7 lg:mx-12 ${
              dark
                ? "border-white/[0.075] bg-white/[0.025]"
                : "border-black/[0.06] bg-white/70"
            }`}
            style={{ animationDelay: "300ms" }}
          >
            <div className="flex w-full items-start gap-3.5 sm:w-auto">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#00D6A0]/20 bg-[#00D6A0]/[0.08] text-[#00A87D]">
                <FiUsers className="h-5 w-5" />
              </div>

              <div>
                <h3
                  className={`text-sm font-bold sm:text-base ${
                    dark ? "text-white" : "text-[#242921]"
                  }`}
                >
                  Your next opportunity starts here.
                </h3>

                <p
                  className={`mt-1.5 max-w-xl text-xs leading-6 sm:text-sm ${
                    dark ? "text-white/45" : "text-[#777b72]"
                  }`}
                >
                  Discover a task, share your expertise, or create a bounty
                  that moves your project forward.
                </p>
              </div>
            </div>

            <div className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#00D6A0]/20 bg-[#00D6A0]/[0.06] px-4 py-2.5 text-[10px] font-bold text-[#00A87D] sm:text-xs">
              <span className="hb-status-dot h-1.5 w-1.5 rounded-full bg-[#00D6A0]" />
              Built around meaningful work
              <FiArrowUpRight className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Bottom brand detail */}
          <div
            className={`mt-9 flex items-center justify-center gap-2 px-4 text-center text-[9px] font-medium tracking-wide sm:mt-12 sm:text-[10px] ${
              dark ? "text-white/25" : "text-[#989b91]"
            }`}
          >
            <span className="h-px w-7 bg-[#00D6A0]/30" />
            CREATE. CONTRIBUTE. EARN.
            <span className="h-px w-7 bg-[#00D6A0]/30" />
          </div>
        </div>
      </section>
    </>
  );
}

function CommunityCard({ item, dark, isDuplicate }) {
  const Icon = item.icon;

  return (
    <article
      aria-hidden={isDuplicate ? true : undefined}
      className={`hb-community-card group mx-2 flex w-[285px] shrink-0 flex-col rounded-[24px] border p-5 sm:mx-3 sm:w-[340px] sm:rounded-[28px] sm:p-7 ${
        dark
          ? "border-white/[0.075] bg-[#101310] shadow-[0_16px_50px_rgba(0,0,0,0.18)]"
          : "border-black/[0.065] bg-white shadow-[0_16px_45px_rgba(35,31,22,0.035)]"
      }`}
    >
      {/* Card top */}
      <div className="flex items-start justify-between gap-3">
        <div className="hb-community-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#00D6A0]/20 bg-[#00D6A0]/[0.07] text-[#00A87D] sm:h-14 sm:w-14">
          <Icon aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6" />
        </div>

        <span
          className={`rounded-full border px-2.5 py-1.5 text-[8px] font-bold tracking-[0.12em] sm:text-[9px] ${
            dark
              ? "border-white/[0.08] bg-white/[0.025] text-white/45"
              : "border-black/[0.06] bg-[#f8f9f5] text-[#74796f]"
          }`}
        >
          {item.network}
        </span>
      </div>

      {/* Card content */}
      <div className="mt-6 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex rounded-full border border-[#00D6A0]/20 bg-[#00D6A0]/[0.06] px-2.5 py-1.5 text-[8px] font-bold tracking-[0.13em] text-[#00A87D] sm:text-[9px]">
            {item.tag}
          </span>

          <span
            className={`text-[10px] font-semibold tabular-nums ${
              dark ? "text-white/20" : "text-black/20"
            }`}
          >
            /{item.number}
          </span>
        </div>

        <h4
          className={`mt-4 text-xl font-bold tracking-[-0.04em] sm:text-2xl ${
            dark ? "text-white" : "text-[#20241e]"
          }`}
        >
          {item.role}
        </h4>

        <p
          className={`mt-1.5 text-xs font-medium ${
            dark ? "text-white/40" : "text-[#85897f]"
          }`}
        >
          {item.type}
        </p>

        <p
          className={`mt-4 min-h-[140px] text-[13px] leading-7 sm:min-h-[140px] sm:text-sm ${
            dark ? "text-white/60" : "text-[#62665d]"
          }`}
        >
          {item.message}
        </p>
      </div>

      {/* Card footer */}
      <div
        className={`mt-5 flex items-center justify-between gap-2 border-t pt-4 ${
          dark ? "border-white/[0.07]" : "border-black/[0.06]"
        }`}
      >
        <span
          className={`text-[10px] font-medium sm:text-[11px] ${
            dark ? "text-white/40" : "text-[#85897f]"
          }`}
        >
          {item.footer}
        </span>

        <span className="flex shrink-0 items-center gap-1.5 text-[9px] font-semibold text-[#00A87D] sm:text-[10px]">
          <span className="hb-status-dot h-1.5 w-1.5 rounded-full bg-[#00D6A0]" />
          {item.status}
        </span>
      </div>
    </article>
  );
}

function ValuePoint({ dark, point, index }) {
  const Icon = point.icon;

  return (
    <div
      className={`group flex items-start gap-3.5 rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-1 sm:p-5 ${
        dark
          ? "border-white/[0.065] bg-white/[0.02] hover:border-[#00D6A0]/25 hover:bg-white/[0.035]"
          : "border-black/[0.055] bg-white/65 hover:border-[#00D6A0]/30 hover:bg-white"
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#00D6A0]/20 bg-[#00D6A0]/[0.07] text-[#00A87D] transition-transform duration-300 group-hover:scale-105">
        <Icon aria-hidden="true" className="h-5 w-5" />
      </div>

      <div>
        <h4
          className={`text-sm font-bold ${
            dark ? "text-white/90" : "text-[#292e27]"
          }`}
        >
          {point.title}
        </h4>

        <p
          className={`mt-1.5 text-xs leading-6 ${
            dark ? "text-white/45" : "text-[#7a7e75]"
          }`}
        >
          {point.description}
        </p>
      </div>

      <FiCheckCircle
        aria-hidden="true"
        className="ml-auto mt-1 h-4 w-4 shrink-0 text-[#00A87D]/50"
      />
    </div>
  );
}

export default Testimonials;