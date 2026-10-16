
import { useEffect, useRef, useState } from "react";
import {
  FiArrowUpRight,
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
      "Turn your project goals into clear, rewarding tasks. Set the requirements, define the reward, and invite contributors to help bring your ideas to life.",
    footer: "Create opportunities",
    status: "Creator workflow",
  },
  {
    icon: FiPenTool,
    role: "Bounty Contributor",
    type: "For independent talent",
    network: "REWARDS",
    tag: "EARN BY BUILDING",
    message:
      "Discover opportunities that match your skills, complete the requested work, submit your contribution, and earn rewards when your work is approved.",
    footer: "Put your skills to work",
    status: "Contributor workflow",
  },
  {
    icon: FiLayers,
    role: "Web3 Developer",
    type: "For technical teams",
    network: "ON-CHAIN",
    tag: "BUILD TOGETHER",
    message:
      "Break bigger ideas into focused tasks. Make requirements easier to understand and give contributors a clear path from submission to reward.",
    footer: "Build with clarity",
    status: "Task-based work",
  },
  {
    icon: FiDollarSign,
    role: "Project Founder",
    type: "For growing projects",
    network: "FUNDING",
    tag: "REWARD GOOD WORK",
    message:
      "Define what needs to be done and the reward attached to it. Give contributors a straightforward way to understand the opportunity before getting started.",
    footer: "Reward contributions",
    status: "Defined rewards",
  },
  {
    icon: FiGlobe,
    role: "Global Contributor",
    type: "For remote collaboration",
    network: "GLOBAL",
    tag: "OPEN OPPORTUNITIES",
    message:
      "Find work beyond your immediate network. Bounties help connect people with useful skills to projects that need their contributions.",
    footer: "Work across communities",
    status: "Open participation",
  },
  {
    icon: FiUsers,
    role: "Community Builder",
    type: "For Web3 communities",
    network: "COMMUNITY",
    tag: "GROW TOGETHER",
    message:
      "Encourage people to contribute to community goals through clearly defined tasks and rewards that give everyone a shared objective.",
    footer: "Bring people together",
    status: "Community-driven",
  },
  {
    icon: FiTarget,
    role: "Creative Contributor",
    type: "For creative projects",
    network: "CREATIVITY",
    tag: "MAKE AN IMPACT",
    message:
      "From content and design to research and social campaigns, create opportunities for people to turn creative skills into meaningful contributions.",
    footer: "Create and contribute",
    status: "Flexible tasks",
  },
  {
    icon: FiShield,
    role: "Independent Builder",
    type: "For transparent workflows",
    network: "TRANSPARENCY",
    tag: "CLEAR EXPECTATIONS",
    message:
      "Keep the task, submission requirements, and reward expectations easy to understand so creators and contributors can work with greater clarity.",
    footer: "Keep work organized",
    status: "Clear requirements",
  },
];

const networks = [
  {
    name: "Polkadot",
    symbol: "DOT",
    logo: dotLogo,
    tone: "border-pink-500/25",
    alt: "Polkadot logo",
  },
  {
    name: "BOT Chain",
    symbol: "BOT",
    logo: botLogo,
    tone: "border-[#00D6A0]/25",
    alt: "BOT Chain logo",
  },
  {
    name: "Arc",
    symbol: "ARC",
    logo: arcLogo,
    tone: "border-blue-500/25",
    alt: "Arc network logo",
  },
];

function Testimonials() {
  const testimonialsRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [dark, setDark] = useState(() => {
    if (typeof document === "undefined") return false;
    return document.documentElement.classList.contains("dark");
  });

  useEffect(() => {
    const root = document.documentElement;

    const observer = new MutationObserver(() => {
      setDark(root.classList.contains("dark"));
    });

    observer.observe(root, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = testimonialsRef.current;
    if (!section) return;

    if (typeof IntersectionObserver === "undefined") {
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
      { threshold: 0.08 },
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
        @keyframes hb-section-enter {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes hb-community-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @keyframes hb-soft-float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        @keyframes hb-status-pulse {
          0%, 100% {
            opacity: .55;
            transform: scale(.9);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .hb-community-heading {
          opacity: 0;
        }

        .hb-community-heading.hb-visible {
          animation: hb-section-enter .75s cubic-bezier(.22, 1, .36, 1) forwards;
        }

        .hb-community-track {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: hb-community-scroll 70s linear infinite;
        }

        .hb-community-track:hover {
          animation-play-state: paused;
        }

        .hb-community-card {
          transition:
            transform .35s ease,
            border-color .35s ease,
            box-shadow .35s ease;
        }

        .hb-community-card:hover {
          transform: translateY(-6px);
          border-color: rgba(0, 214, 160, .42);
        }

        .hb-community-icon {
          animation: hb-soft-float 5s ease-in-out infinite;
        }

        .hb-community-status-dot {
          animation: hb-status-pulse 2.4s ease-in-out infinite;
        }

        .hb-network-logo {
          width: 30px;
          height: 30px;
          object-fit: contain;
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .hb-community-track {
            animation-duration: 58s;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hb-community-heading,
          .hb-community-heading.hb-visible {
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
          .hb-community-status-dot {
            animation: none !important;
            transition: none !important;
          }

          .hb-community-card:hover {
            transform: none;
          }
        }
      `}</style>

      <section
        ref={testimonialsRef}
        aria-labelledby="hb-community-title"
        className={`relative z-10 mx-3 overflow-hidden rounded-[28px] border transition-colors duration-300 sm:mx-5 md:mx-8 md:rounded-[36px] lg:mx-12 ${
          dark
            ? "border-white/[0.06] bg-[#080908] text-white"
            : "border-black/[0.05] bg-[#f6f5ef] text-[#171916]"
        }`}
      >
        {/* Background grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(
                ${dark ? "rgba(0,214,160,0.045)" : "rgba(50,70,52,0.045)"} 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                ${dark ? "rgba(0,214,160,0.035)" : "rgba(50,70,52,0.035)"} 1px,
                transparent 1px
              )
            `,
            backgroundSize: "56px 56px",
            maskImage: "linear-gradient(to bottom, black, transparent 78%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black, transparent 78%)",
          }}
        />

        {/* Accent glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-36 left-1/2 h-72 w-[min(80%,700px)] -translate-x-1/2 rounded-full bg-[#00D6A0]/[0.08] blur-[100px]"
        />

        <div className="relative mx-auto w-full max-w-[1600px] py-14 sm:py-16 md:py-20 lg:py-24">
          {/* Header */}
          <header
            className={`hb-community-heading ${
              isVisible ? "hb-visible" : ""
            } mx-auto mb-10 max-w-4xl px-4 text-center sm:mb-14 md:px-8`}
          >
            <div
              className={`mb-6 inline-flex max-w-full flex-wrap items-center justify-center gap-2.5 rounded-full border px-3.5 py-2 sm:px-4 ${
                dark
                  ? "border-white/[0.09] bg-white/[0.035]"
                  : "border-black/[0.08] bg-white/75"
              }`}
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00D6A0] opacity-30" />
                <span className="relative h-2 w-2 rounded-full bg-[#00D6A0]" />
              </span>

              <span
                className={`text-[9px] font-bold uppercase tracking-[0.16em] sm:text-[10px] sm:tracking-[0.2em] ${
                  dark ? "text-white/65" : "text-[#686c64]"
                }`}
              >
                One platform. More possibilities.
              </span>

              <span
                className={`hidden h-3.5 w-px sm:block ${
                  dark ? "bg-white/15" : "bg-black/15"
                }`}
              />

              <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#00A87D] sm:text-[10px]">
                Happy Bounty
              </span>
            </div>

            <h2
              id="hb-community-title"
              className={`text-3xl font-bold leading-[1.12] tracking-[-0.045em] sm:text-4xl md:text-5xl lg:text-6xl ${
                dark ? "text-white" : "text-[#171916]"
              }`}
            >
              Great work starts with{" "}
              <span className="text-[#00A87D]">
                the right opportunity.
              </span>
            </h2>

            <p
              className={`mx-auto mt-5 max-w-2xl text-sm leading-7 sm:mt-6 sm:text-base ${
                dark ? "text-white/55" : "text-[#72756d]"
              }`}
            >
              Whether you're posting a task or bringing an idea to life,
              Happy Bounty connects creators and contributors through
              clearly defined work and rewards.
            </p>

            {/* Network logos */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              {networks.map((network) => (
                <div
                  key={network.symbol}
                  className={`inline-flex items-center gap-3 rounded-xl border px-4 py-2.5 transition-transform duration-300 hover:-translate-y-1 ${
                    dark
                      ? `bg-white/[0.025] ${network.tone}`
                      : `bg-white/80 ${network.tone}`
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

                  <span
                    className={`text-xs font-semibold ${
                      dark ? "text-white/75" : "text-[#51564d]"
                    }`}
                  >
                    {network.name}
                  </span>
                </div>
              ))}
            </div>

            <p
              className={`mt-3 text-[10px] leading-5 ${
                dark ? "text-white/35" : "text-[#8a8d83]"
              }`}
            >
              Network support depends on the integrations available in your
              platform.
            </p>
          </header>

          {/* Use-case section label */}
          <div className="mb-5 flex items-center justify-between gap-3 px-5 sm:px-8 lg:px-12">
            <div>
              <p
                className={`text-[10px] font-bold uppercase tracking-[0.2em] ${
                  dark ? "text-white/40" : "text-[#888b81]"
                }`}
              >
                Explore the possibilities
              </p>

              <h3
                className={`mt-1 text-base font-semibold sm:text-lg ${
                  dark ? "text-white/90" : "text-[#282d27]"
                }`}
              >
                Made for people who make things happen
              </h3>
            </div>

            <span
              className={`hidden items-center gap-2 text-xs sm:flex ${
                dark ? "text-white/40" : "text-[#85897f]"
              }`}
            >
              <FiArrowUpRight className="text-[#00A87D]" />
              Scroll to explore
            </span>
          </div>

          {/* Moving cards */}
          <div className="hb-community-marquee relative w-full">
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
                  key={`${item.role}-${index}`}
                  item={item}
                  dark={dark}
                  isDuplicate={index >= communityUseCases.length}
                />
              ))}
            </div>
          </div>

          {/* Bottom value points */}
          <div className="mx-4 mt-10 grid grid-cols-1 gap-3 sm:mx-8 sm:mt-14 sm:grid-cols-3 lg:mx-12">
            <ValuePoint
              dark={dark}
              icon={<FiCompass />}
              title="Discover opportunities"
              description="Explore tasks that fit your interests and skills."
            />

            <ValuePoint
              dark={dark}
              icon={<FiZap />}
              title="Turn effort into value"
              description="Complete work and pursue the rewards attached to it."
            />

            <ValuePoint
              dark={dark}
              icon={<FiShield />}
              title="Know what to expect"
              description="Start with clearer requirements and reward details."
            />
          </div>

          {/* Closing statement */}
          <div
            className={`mx-4 mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border px-5 py-5 text-center sm:mx-8 sm:flex-row sm:px-6 sm:text-left lg:mx-12 ${
              dark
                ? "border-white/[0.07] bg-white/[0.025]"
                : "border-black/[0.06] bg-white/55"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#00D6A0]/20 bg-[#00D6A0]/[0.08] text-[#00A87D]">
                <FiUsers className="h-5 w-5" />
              </div>

              <div>
                <p
                  className={`text-sm font-semibold ${
                    dark ? "text-white/90" : "text-[#242921]"
                  }`}
                >
                  Your skills have somewhere to go.
                </p>

                <p
                  className={`mt-1 text-xs leading-5 ${
                    dark ? "text-white/45" : "text-[#777b72]"
                  }`}
                >
                  Find a task, post your own bounty, and help good ideas move
                  forward.
                </p>
              </div>
            </div>

            <div className="inline-flex shrink-0 items-center gap-2 text-xs font-semibold text-[#00A87D]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00D6A0]" />
              Built around meaningful work
              <FiArrowUpRight className="h-4 w-4" />
            </div>
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
      aria-hidden={isDuplicate ? "true" : undefined}
      className={`hb-community-card group mx-2.5 flex w-[290px] shrink-0 flex-col rounded-[24px] border p-5 sm:mx-3 sm:w-[350px] sm:rounded-[28px] sm:p-7 ${
        dark
          ? "border-white/[0.08] bg-[#111411] shadow-[0_18px_55px_rgba(0,0,0,0.20)]"
          : "border-black/[0.07] bg-white shadow-[0_18px_55px_rgba(35,31,22,0.045)]"
      }`}
    >
      {/* Card heading */}
      <div className="flex items-start justify-between gap-3">
        <div className="hb-community-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#00D6A0]/20 bg-[#00D6A0]/[0.07] text-[#00A87D] sm:h-14 sm:w-14">
          <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
        </div>

        <span
          className={`rounded-full border px-2.5 py-1.5 text-[8px] font-bold tracking-[0.12em] sm:text-[9px] ${
            dark
              ? "border-white/[0.08] bg-white/[0.025] text-white/45"
              : "border-black/[0.07] bg-[#f8f9f5] text-[#74796f]"
          }`}
        >
          {item.network}
        </span>
      </div>

      {/* Card content */}
      <div className="mt-6 flex-1">
        <span className="inline-flex rounded-full border border-[#00D6A0]/20 bg-[#00D6A0]/[0.06] px-2.5 py-1 text-[9px] font-bold tracking-[0.13em] text-[#00A87D]">
          {item.tag}
        </span>

        <h4
          className={`mt-4 text-xl font-bold tracking-[-0.035em] sm:text-2xl ${
            dark ? "text-white" : "text-[#20241e]"
          }`}
        >
          {item.role}
        </h4>

        <p
          className={`mt-1 text-xs font-medium ${
            dark ? "text-white/40" : "text-[#85897f]"
          }`}
        >
          {item.type}
        </p>

        <p
          className={`mt-4 min-h-[132px] text-[13px] leading-7 sm:min-h-[140px] sm:text-sm ${
            dark ? "text-white/60" : "text-[#62665d]"
          }`}
        >
          {item.message}
        </p>
      </div>

      {/* Card footer */}
      <div
        className={`mt-6 flex items-center justify-between gap-3 border-t pt-4 ${
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
          <span className="hb-community-status-dot h-1.5 w-1.5 rounded-full bg-[#00D6A0]" />
          {item.status}
        </span>
      </div>
    </article>
  );
}

function ValuePoint({ dark, icon, title, description }) {
  return (
    <div
      className={`flex items-start gap-3.5 rounded-2xl border p-4 sm:p-5 ${
        dark
          ? "border-white/[0.065] bg-white/[0.02]"
          : "border-black/[0.055] bg-white/65"
      }`}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#00D6A0]/20 bg-[#00D6A0]/[0.07] text-[#00A87D]">
        {icon}
      </div>

      <div>
        <h4
          className={`text-sm font-semibold ${
            dark ? "text-white/90" : "text-[#292e27]"
          }`}
        >
          {title}
        </h4>

        <p
          className={`mt-1 text-xs leading-5 ${
            dark ? "text-white/45" : "text-[#7a7e75]"
          }`}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

export default Testimonials;
