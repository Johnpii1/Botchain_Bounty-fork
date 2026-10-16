
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNav } from "../hooks/useNav";
import {
  FiArrowUpRight,
  FiCheck,
  FiCode,
  FiDollarSign,
  FiLayers,
  FiPlus,
  FiShield,
  FiZap,
} from "react-icons/fi";

function CallToAction() {
  const [dark, setDark] = useState(() => {
    if (typeof document === "undefined") return false;
    return document.documentElement.classList.contains("dark");
  });

  const { handleNavigate } = useNav();

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

  return (
    <section
      aria-labelledby="cta-heading"
      className="relative z-10 mx-3 my-12 transition-colors duration-500 sm:mx-5 sm:my-14 md:mx-8 md:my-16 lg:mx-12"
    >
      <style>{`
        @keyframes hb-cta-enter {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes hb-cta-float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes hb-cta-glow {
          0%, 100% {
            opacity: .45;
            transform: scale(1);
          }
          50% {
            opacity: .8;
            transform: scale(1.12);
          }
        }

        @keyframes hb-cta-shimmer {
          from {
            transform: translateX(-150%) skewX(-18deg);
          }
          to {
            transform: translateX(350%) skewX(-18deg);
          }
        }

        .hb-cta-enter {
          animation: hb-cta-enter .75s cubic-bezier(.22, 1, .36, 1) both;
        }

        .hb-cta-delay-1 {
          animation-delay: .12s;
        }

        .hb-cta-delay-2 {
          animation-delay: .24s;
        }

        .hb-cta-delay-3 {
          animation-delay: .36s;
        }

        .hb-cta-delay-4 {
          animation-delay: .48s;
        }

        .hb-cta-float {
          animation: hb-cta-float 4.5s ease-in-out infinite;
        }

        .hb-cta-glow {
          animation: hb-cta-glow 6s ease-in-out infinite;
        }

        .hb-cta-shimmer {
          animation: hb-cta-shimmer 5s ease-in-out infinite;
        }

        .hb-cta-button {
          transition:
            transform .25s ease,
            box-shadow .25s ease,
            background-color .25s ease,
            border-color .25s ease;
        }

        .hb-cta-button:hover {
          transform: translateY(-2px);
        }

        @media (prefers-reduced-motion: reduce) {
          .hb-cta-enter,
          .hb-cta-float,
          .hb-cta-glow,
          .hb-cta-shimmer {
            animation: none !important;
          }

          .hb-cta-button {
            transition: none !important;
          }

          .hb-cta-button:hover {
            transform: none;
          }
        }
      `}</style>

      <div
        className={`relative mx-auto max-w-[1400px] overflow-hidden rounded-[28px] border transition-colors duration-500 sm:rounded-[32px] lg:rounded-[38px] ${
          dark
            ? "border-white/[0.08] bg-[#0d100e]"
            : "border-black/[0.07] bg-white"
        }`}
        style={{
          boxShadow: dark
            ? "0 24px 80px rgba(0,0,0,0.25)"
            : "0 24px 80px rgba(30,35,25,0.055)",
        }}
      >
        {/* Background grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(
                ${dark ? "rgba(0,214,160,0.045)" : "rgba(0,100,65,0.045)"} 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                ${dark ? "rgba(0,214,160,0.045)" : "rgba(0,100,65,0.045)"} 1px,
                transparent 1px
              )
            `,
            backgroundSize: "48px 48px",
            maskImage:
              "linear-gradient(to bottom, black, transparent 90%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black, transparent 90%)",
          }}
        />

        {/* Soft green lighting */}
        <div
          aria-hidden="true"
          className="hb-cta-glow pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-[#00D6A0]/[0.12] blur-[100px] sm:h-80 sm:w-80"
        />

        <div
          aria-hidden="true"
          className="hb-cta-glow pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-[#00D6A0]/[0.08] blur-[100px] sm:h-80 sm:w-80"
          style={{ animationDelay: "2s" }}
        />

        {/* Decorative corner detail */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute right-0 top-0 hidden h-36 w-36 sm:block lg:h-48 lg:w-48 ${
            dark ? "opacity-30" : "opacity-40"
          }`}
        >
          <div className="absolute right-7 top-7 h-20 w-20 rounded-2xl border border-[#00D6A0]/30 lg:right-10 lg:top-10 lg:h-28 lg:w-28" />

          <div className="absolute right-12 top-12 h-20 w-20 rounded-2xl border border-[#00D6A0]/20 lg:right-16 lg:top-16 lg:h-28 lg:w-28" />
        </div>

        <div className="relative z-10 px-5 py-10 sm:px-8 sm:py-12 md:px-12 md:py-16 lg:px-16 lg:py-20">
          {/* Eyebrow */}
          <div className="hb-cta-enter flex justify-center">
            <div
              className={`inline-flex max-w-full flex-wrap items-center justify-center gap-2.5 rounded-full border px-3.5 py-2 sm:px-4 ${
                dark
                  ? "border-[#00D6A0]/20 bg-white/[0.035]"
                  : "border-[#00A87D]/20 bg-[#00D6A0]/[0.055]"
              }`}
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inset-0 animate-ping rounded-full bg-[#00D6A0] opacity-30" />
                <span className="relative h-2 w-2 rounded-full bg-[#00D6A0]" />
              </span>

              <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#00A87D] sm:text-[10px] sm:tracking-[0.2em]">
                The Happy Bounty ecosystem
              </span>
            </div>
          </div>

          {/* Main heading */}
          <div className="hb-cta-enter hb-cta-delay-1 mt-6 text-center sm:mt-8">
            <h2
              id="cta-heading"
              className={`mx-auto max-w-4xl text-3xl font-black leading-[1.08] tracking-[-0.05em] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl ${
                dark ? "text-white" : "text-[#151914]"
              }`}
            >
              Turn your skills into{" "}
              <span className="hb-cta-float inline-block text-[#00A87D]">
                opportunities.
              </span>
            </h2>

            <p
              className={`mx-auto mt-5 max-w-2xl text-sm leading-7 sm:mt-6 sm:text-base md:text-[17px] ${
                dark ? "text-white/55" : "text-[#6e746a]"
              }`}
            >
              Find work worth doing. Earn rewards for your contributions.
              Or post your own bounty and connect with people ready to help
              bring your ideas to life.
            </p>
          </div>

          {/* How it works */}
          <div className="hb-cta-enter hb-cta-delay-2 mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4">
            <WorkflowStep
              dark={dark}
              number="01"
              icon={<FiCode />}
              title="Create"
              description="Post a task with clear requirements."
            />

            <WorkflowStep
              dark={dark}
              number="02"
              icon={<FiLayers />}
              title="Contribute"
              description="Complete work and submit your results."
            />

            <WorkflowStep
              dark={dark}
              number="03"
              icon={<FiDollarSign />}
              title="Get rewarded"
              description="Earn when your work is approved."
              highlighted
            />
          </div>

          {/* Action buttons */}
          <div className="hb-cta-enter hb-cta-delay-3 mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-9 sm:flex-row sm:items-center">
            <Link
              to="/dashboard"
              onClick={(event) => {
                event.preventDefault();
                handleNavigate("/dashboard");
              }}
              className="hb-cta-button group relative inline-flex min-h-[48px] items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#00D6A0] px-6 py-3 text-sm font-bold text-[#06251b] shadow-[0_8px_25px_rgba(0,214,160,0.16)] hover:bg-[#00c394] hover:shadow-[0_12px_35px_rgba(0,214,160,0.24)] sm:min-w-[190px]"
            >
              <span className="relative z-10">Explore Bounties</span>

              <FiArrowUpRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />

              <span className="hb-cta-shimmer pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            </Link>

            <Link
              to="/create"
              onClick={(event) => {
                event.preventDefault();
                handleNavigate("/create");
              }}
              className={`hb-cta-button group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border px-6 py-3 text-sm font-semibold sm:min-w-[190px] ${
                dark
                  ? "border-white/[0.12] bg-white/[0.035] text-white hover:border-[#00D6A0]/40 hover:bg-white/[0.06]"
                  : "border-black/[0.09] bg-white text-[#20251f] hover:border-[#00A87D]/40 hover:bg-[#00D6A0]/[0.035]"
              }`}
            >
              <FiPlus className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90 group-hover:text-[#00A87D]" />
              <span>Create a Bounty</span>
            </Link>
          </div>

          {/* Trust/value indicators */}
          <div
            className={`hb-cta-enter hb-cta-delay-4 mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-x-5 gap-y-3 border-t pt-6 sm:mt-10 sm:gap-x-8 ${
              dark ? "border-white/[0.07]" : "border-black/[0.065]"
            }`}
          >
            <TrustItem dark={dark} icon={<FiShield />} label="Clear requirements" />
            <TrustItem dark={dark} icon={<FiZap />} label="Reward-driven work" />
            <TrustItem dark={dark} icon={<FiCheck />} label="Approval-based rewards" />
          </div>

          {/* Chain-ready note */}
          <p
            className={`mt-5 text-center text-[10px] leading-5 ${
              dark ? "text-white/30" : "text-[#898d83]"
            }`}
          >
            Built for Web3 collaboration. Supported networks and reward assets
            depend on the integrations enabled on Happy Bounty.
          </p>
        </div>
      </div>
    </section>
  );
}

function WorkflowStep({
  dark,
  number,
  icon,
  title,
  description,
  highlighted = false,
}) {
  return (
    <div
      className={`group relative rounded-2xl border p-4 text-left transition-all duration-300 hover:-translate-y-1 sm:p-5 ${
        highlighted
          ? dark
            ? "border-[#00D6A0]/25 bg-[#00D6A0]/[0.055]"
            : "border-[#00A87D]/20 bg-[#00D6A0]/[0.045]"
          : dark
            ? "border-white/[0.075] bg-white/[0.025] hover:border-white/[0.13]"
            : "border-black/[0.065] bg-white/75 hover:border-[#00A87D]/25"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl border border-[#00D6A0]/20 bg-[#00D6A0]/[0.07] text-[#00A87D] transition-transform duration-300 group-hover:scale-105 ${
            highlighted ? "shadow-[0_0_22px_rgba(0,214,160,0.08)]" : ""
          }`}
        >
          {icon}
        </div>

        <span
          className={`text-[10px] font-bold tracking-[0.16em] ${
            dark ? "text-white/30" : "text-[#a0a399]"
          }`}
        >
          {number}
        </span>
      </div>

      <h3
        className={`mt-4 text-sm font-bold ${
          dark ? "text-white/90" : "text-[#252a23]"
        }`}
      >
        {title}
      </h3>

      <p
        className={`mt-1.5 text-xs leading-5 ${
          dark ? "text-white/45" : "text-[#777c72]"
        }`}
      >
        {description}
      </p>
    </div>
  );
}

function TrustItem({ dark, icon, label }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[#00A87D]">{icon}</span>
      <span
        className={`text-[10px] font-semibold sm:text-[11px] ${
          dark ? "text-white/45" : "text-[#777c72]"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

export default CallToAction;
