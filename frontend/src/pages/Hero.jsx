
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNav } from "../hooks/useNav";
import {
  FiArrowUpRight,
  FiCheckCircle,
  FiLayers,
  FiZap,
  FiLink,
  FiGift,
  FiTrendingUp,
  FiGlobe,
  FiShield,
} from "react-icons/fi";

import UsdcLogo from "../assets/images/us.png";
import ArcLogo from "../assets/images/arc.png";
import InjectiveLogo from "../assets/images/inj.png";
import BotchainLogo from "../assets/images/bot.png";
import PolkadotLogo from "../assets/images/pok.png";

const heroMessages = [
  "Crypto Bounties.",
  "Complete Quests.",
  "Build Your Skills.",
  "Get Rewarded.",
];

const networks = [
  { name: "Arc", logo: ArcLogo, className: "chain-arc" },
  { name: "Injective", logo: InjectiveLogo, className: "chain-injective" },
  { name: "Botchain", logo: BotchainLogo, className: "chain-botchain" },
  { name: "Portaldot", logo: PolkadotLogo, className: "chain-polkadot" },
  { name: "USDC", logo: UsdcLogo, className: "chain-usdc" },
];

const tickerItems = [
  { name: "Arc", logo: ArcLogo, className: "chain-arc" },
  { name: "Injective", logo: InjectiveLogo, className: "chain-injective" },
  { name: "Botchain", logo: BotchainLogo, className: "chain-botchain" },
  { name: "Portaldot", logo: PolkadotLogo, className: "chain-polkadot" },
  { name: "USDC Rewards", logo: UsdcLogo, className: "chain-usdc" },
  { name: "Crypto Bounties", logo: null, className: "chain-bounty" },
];

const features = [
  {
    icon: FiLink,
    title: "Multi-Chain",
    description: "Arc, Injective, Botchain, Portaldot",
  },
  {
    icon: FiGift,
    title: "Real Rewards",
    description: "Earn crypto rewards",
  },
  {
    icon: FiShield,
    title: "Bounty System",
    description: "Submit work for approval",
  },
  {
    icon: FiZap,
    title: "Take Action",
    description: "Find your next opportunity",
  },
];

function NetworkLogo({ logo, name, className = "" }) {
  return (
    <span
      className={`chain-hero-logo-wrap ${className}`}
      aria-label={`${name} logo`}
    >
      <img
        src={logo}
        alt={name}
        className="chain-hero-logo"
        loading="eager"
        draggable="false"
      />
    </span>
  );
}

export default function Hero({ dark }) {
  const [heroText, setHeroText] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const visualRef = useRef(null);
  const { handleNavigate } = useNav();

  useEffect(() => {
    const message = heroMessages[heroText];
    let timer;

    if (!isDeleting && displayText === message) {
      timer = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setHeroText((previous) => (previous + 1) % heroMessages.length);
    } else {
      timer = setTimeout(() => {
        setDisplayText((current) =>
          isDeleting
            ? current.slice(0, -1)
            : message.slice(0, current.length + 1)
        );
      }, isDeleting ? 38 : 72);
    }

    return () => clearTimeout(timer);
  }, [displayText, heroText, isDeleting]);

  useEffect(() => {
    const visual = visualRef.current;

    if (
      !visual ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const handleMove = (event) => {
      const bounds = visual.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;

      visual.style.setProperty("--tilt-x", `${y * -4}deg`);
      visual.style.setProperty("--tilt-y", `${x * 4}deg`);
    };

    const resetTilt = () => {
      visual.style.setProperty("--tilt-x", "0deg");
      visual.style.setProperty("--tilt-y", "0deg");
    };

    visual.addEventListener("pointermove", handleMove);
    visual.addEventListener("pointerleave", resetTilt);

    return () => {
      visual.removeEventListener("pointermove", handleMove);
      visual.removeEventListener("pointerleave", resetTilt);
    };
  }, []);

  return (
    <section
      className={`chain-hero relative isolate w-full overflow-hidden transition-colors duration-500 ${
        dark ? "bg-[#080B0D] text-white" : "bg-[#F3F5F3] text-[#111916]"
      }`}
    >
      <div
        className="chain-hero-grid pointer-events-none absolute inset-0"
        aria-hidden="true"
      />
      <div
        className="chain-hero-glow chain-hero-glow-one pointer-events-none absolute"
        aria-hidden="true"
      />
      <div
        className="chain-hero-glow chain-hero-glow-two pointer-events-none absolute"
        aria-hidden="true"
      />
      <div className="chain-hero-noise pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto grid min-h-[650px] w-full max-w-7xl items-center gap-8 px-5 pb-12 pt-28 sm:px-8 sm:pb-16 sm:pt-32 lg:min-h-[720px] lg:grid-cols-[0.95fr_1.05fr] lg:gap-4 lg:px-10 lg:pt-28">
        <div className="chain-hero-copy mx-auto w-full max-w-2xl text-center sm:text-left">
          <div
            className={`mb-6 inline-flex max-w-full items-center gap-2.5 rounded-full border px-3.5 py-2 text-[11px] font-semibold tracking-wide backdrop-blur-xl sm:px-4 sm:text-xs ${
              dark
                ? "border-[#00D6A0]/25 bg-white/[0.035] text-white/90"
                : "border-[#00A87D]/25 bg-white/80 text-[#18251F] shadow-sm"
            }`}
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00D6A0] opacity-40" />
              <span className="relative h-2 w-2 rounded-full bg-[#00D6A0]" />
            </span>

            <span>Multi-Chain Bounty Platform</span>

            <span
              className={`hidden h-4 w-px sm:block ${
                dark ? "bg-white/15" : "bg-black/10"
              }`}
            />

            <span
              className={`hidden sm:inline ${
                dark ? "text-white/45" : "text-[#6C7771]"
              }`}
            >
              ARC · INJ · BOT · DOT
            </span>
          </div>

          <div>
            <h1
              className={`text-4xl font-extrabold leading-[1.04] tracking-[-0.055em] sm:text-5xl md:text-6xl lg:text-[4.35rem] ${
                dark ? "text-white" : "text-[#111916]"
              }`}
            >
              Make a living
            </h1>

            <h1
              className={`mt-1 text-4xl font-extrabold leading-[1.04] tracking-[-0.055em] sm:text-5xl md:text-6xl lg:text-[4.35rem] ${
                dark ? "text-white" : "text-[#111916]"
              }`}
            >
              from
            </h1>

            <div className="mt-2 flex min-h-[49px] min-w-0 items-center justify-center overflow-hidden sm:min-h-[66px] sm:justify-start md:min-h-[78px]">
              <div className="flex max-w-full min-w-0 items-center whitespace-nowrap text-3xl font-extrabold leading-none tracking-[-0.045em] sm:text-4xl md:text-6xl lg:text-[4.1rem]">
                <span className="chain-hero-type-text">{displayText}</span>
                <span className="ml-1 inline-block h-[0.8em] w-[3px] shrink-0 rounded-full bg-[#00D6A0]" />
              </div>
            </div>
          </div>

          <p
            className={`mx-auto mt-6 max-w-xl text-sm font-medium leading-7 sm:mx-0 sm:text-base ${
              dark ? "text-white/60" : "text-[#4C5A53]"
            }`}
          >
            Complete quests, earn crypto rewards, and build your skills across
            multiple networks. Post bounties, find talented contributors, and
            get quality work done on-chain.
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            {networks
              .filter((network) =>
                ["Arc", "Injective", "Botchain", "Portaldot"].includes(
                  network.name
                )
              )
              .map((network) => (
                <span
                  key={network.name}
                  className={`chain-hero-network-pill ${
                    dark
                      ? "border-white/10 bg-white/[0.035] text-white/75"
                      : "border-black/[0.08] bg-white/75 text-[#33443A]"
                  }`}
                >
                  <NetworkLogo
                    logo={network.logo}
                    name={network.name}
                    className="chain-hero-network-logo"
                  />
                  {network.name}
                </span>
              ))}
          </div>

          <div className="mt-7 flex w-full flex-wrap justify-center gap-3 sm:justify-start">
            <Link
              to="/dashboard"
              onClick={(event) => {
                event.preventDefault();
                handleNavigate("/dashboard");
              }}
              className="chain-hero-primary group inline-flex items-center justify-center gap-2 rounded-xl bg-[#00D6A0] px-6 py-3.5 text-sm font-bold text-[#06251C] shadow-[0_10px_30px_rgba(0,214,160,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#24E6B4] hover:shadow-[0_14px_36px_rgba(0,214,160,0.24)]"
            >
              Explore Bounties
              <FiArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>

            <Link
              to="/create"
              onClick={(event) => {
                event.preventDefault();
                handleNavigate("/create");
              }}
              className={`group inline-flex items-center justify-center gap-2 rounded-xl border px-6 py-3.5 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 ${
                dark
                  ? "border-white/15 bg-white/[0.035] text-white hover:border-[#00D6A0]/60 hover:text-[#00D6A0]"
                  : "border-black/10 bg-white/80 text-[#17211C] shadow-sm hover:border-[#00A87D]/50 hover:text-[#008A66]"
              }`}
            >
              Create a Bounty
              <FiArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="mt-7 flex items-center justify-center gap-3 sm:justify-start">
            <div
              className="flex gap-1.5"
              aria-label={`Headline ${heroText + 1} of ${heroMessages.length}`}
            >
              {heroMessages.map((message, index) => (
                <span
                  key={message}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    index === heroText
                      ? "w-7 bg-[#00D6A0] shadow-[0_0_12px_rgba(0,214,160,0.3)]"
                      : dark
                        ? "w-1.5 bg-white/20"
                        : "w-1.5 bg-black/15"
                  }`}
                />
              ))}
            </div>

            <span
              className={`text-[11px] font-semibold ${
                dark ? "text-white/45" : "text-[#6C7771]"
              }`}
            >
              Discover · Contribute · Earn
            </span>
          </div>
        </div>

        <div
          ref={visualRef}
          className="chain-hero-visual relative mx-auto flex min-h-[360px] w-full max-w-[590px] items-center justify-center sm:min-h-[470px] lg:min-h-[550px]"
          aria-label="Multi-chain bounty ecosystem featuring Arc, Injective, Botchain, and Portaldot"
        >
          <div className="chain-hero-scene relative flex h-[360px] w-full items-center justify-center sm:h-[470px] lg:h-[540px]">
            <div className="chain-hero-ring chain-hero-ring-one" />
            <div className="chain-hero-ring chain-hero-ring-two" />
            <div className="chain-hero-ring chain-hero-ring-three" />
            <div className="chain-hero-core-glow" />

            <span className="chain-hero-node chain-hero-node-one" />
            <span className="chain-hero-node chain-hero-node-two" />
            <span className="chain-hero-node chain-hero-node-three" />
            <span className="chain-hero-node chain-hero-node-four" />

            <div
              className={`chain-hero-core relative z-10 flex h-40 w-40 flex-col items-center justify-center rounded-full border sm:h-48 sm:w-48 ${
                dark
                  ? "border-[#00D6A0]/30 bg-[#091511]/90"
                  : "border-white/90 bg-white/85"
              }`}
            >
              <div className="chain-hero-core-inner flex h-[76%] w-[76%] flex-col items-center justify-center rounded-full border border-[#00D6A0]/20">
                <FiGlobe className="mb-2 h-8 w-8 text-[#00D6A0] sm:h-9 sm:w-9" />

                <span
                  className={`text-base font-extrabold tracking-tight sm:text-lg ${
                    dark ? "text-white" : "text-[#13231B]"
                  }`}
                >
                  Multi-Chain
                </span>

                <span
                  className={`mt-1 text-[9px] font-bold uppercase tracking-[0.19em] ${
                    dark ? "text-[#00D6A0]/75" : "text-[#008A66]"
                  }`}
                >
                  Bounty Hub
                </span>
              </div>
            </div>

            <div className="chain-hero-orbit-badge chain-hero-badge-arc">
              <NetworkLogo
                logo={ArcLogo}
                name="Arc"
                className="chain-hero-token chain-arc"
              />
              <span className="chain-hero-badge-label">
                <strong>Arc</strong>
                <small>Explore bounties</small>
              </span>
            </div>

            <div className="chain-hero-orbit-badge chain-hero-badge-injective">
              <NetworkLogo
                logo={InjectiveLogo}
                name="Injective"
                className="chain-hero-token chain-injective"
              />
              <span className="chain-hero-badge-label">
                <strong>Injective</strong>
                <small>Find opportunities</small>
              </span>
            </div>

            <div className="chain-hero-orbit-badge chain-hero-badge-botchain">
              <NetworkLogo
                logo={BotchainLogo}
                name="Botchain"
                className="chain-hero-token chain-botchain"
              />
              <span className="chain-hero-badge-label">
                <strong>Botchain</strong>
                <small>Build and earn</small>
              </span>
            </div>

            <div className="chain-hero-orbit-badge chain-hero-badge-polkadot">
              <NetworkLogo
                logo={PolkadotLogo}
                name="Polkadot"
                className="chain-hero-token chain-polkadot"
              />
              <span className="chain-hero-badge-label">
                <strong>Portaldot</strong>
                <small>Connect and contribute</small>
              </span>
            </div>

            <div
              className={`chain-hero-float-card chain-hero-card-top ${
                dark
                  ? "border-white/10 bg-[#111917]/90 text-white"
                  : "border-white/80 bg-white/90 text-[#15231C]"
              }`}
            >
              <span className="chain-hero-card-icon">
                <FiGift />
              </span>
              <span>
                <strong>Crypto Rewards</strong>
                <small>Complete tasks and earn</small>
              </span>
            </div>

            <div
              className={`chain-hero-float-card chain-hero-card-bottom ${
                dark
                  ? "border-white/10 bg-[#111917]/90 text-white"
                  : "border-white/80 bg-white/90 text-[#15231C]"
              }`}
            >
              <span className="chain-hero-card-icon">
                <FiCheckCircle />
              </span>
              <span>
                <strong>Work Gets Rewarded</strong>
                <small>Contribute. Submit. Earn.</small>
              </span>
            </div>

            <div className="chain-hero-mini-label chain-hero-mini-left">
              <FiLayers />
              <span>One Platform</span>
            </div>

            <div className="chain-hero-mini-label chain-hero-mini-right">
              <FiTrendingUp />
              <span>More Opportunities</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-8 sm:px-8 lg:px-10 lg:pb-10">
        <div
          className={`chain-hero-ticker overflow-hidden rounded-2xl border ${
            dark
              ? "border-white/10 bg-white/[0.025]"
              : "border-black/[0.07] bg-white/65"
          }`}
        >
          <div className="chain-hero-ticker-track">
            {[0, 1, 2].map((copy) => (
              <div
                key={copy}
                className="chain-hero-ticker-group"
                aria-hidden={copy !== 0 ? "true" : undefined}
              >
                {tickerItems.map((item) => (
                  <div className="chain-hero-ticker-item" key={item.name}>
                    {item.logo ? (
                      <NetworkLogo
                        logo={item.logo}
                        name={item.name}
                        className={`chain-hero-ticker-icon ${item.className}`}
                      />
                    ) : (
                      <span
                        className={`chain-hero-ticker-icon ${item.className}`}
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                    )}

                    <span
                      className={`text-xs font-bold sm:text-sm ${
                        dark ? "text-white/75" : "text-[#293A31]"
                      }`}
                    >
                      {item.name}
                    </span>

                    <span className="chain-hero-ticker-separator">/</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .chain-hero {
          --hero-green: #00D6A0;
          --hero-green-dark: #00A87D;
        }

        .chain-hero-grid {
          opacity: ${dark ? "0.18" : "0.12"};
          background-image:
            linear-gradient(to right, ${
              dark ? "rgba(255,255,255,.045)" : "rgba(15,55,38,.06)"
            } 1px, transparent 1px),
            linear-gradient(to bottom, ${
              dark ? "rgba(255,255,255,.045)" : "rgba(15,55,38,.06)"
            } 1px, transparent 1px);
          background-size: 58px 58px;
          mask-image: linear-gradient(to bottom, black, transparent 95%);
        }

        .chain-hero-glow {
          position: absolute;
          width: 25rem;
          height: 25rem;
          border-radius: 999px;
          filter: blur(105px);
          background: #00D6A0;
          pointer-events: none;
        }

        .chain-hero-glow-one {
          top: 5rem;
          right: -13rem;
          opacity: ${dark ? ".10" : ".09"};
        }

        .chain-hero-glow-two {
          bottom: -15rem;
          left: -12rem;
          opacity: .055;
        }

        .chain-hero-noise {
          pointer-events: none;
          opacity: ${dark ? ".08" : ".025"};
          background-image: radial-gradient(
            ${dark ? "#FFFFFF" : "#102A20"} .6px,
            transparent .6px
          );
          background-size: 13px 13px;
          mask-image: linear-gradient(to bottom, black, transparent 85%);
        }

        .chain-hero-type-text {
          color: #00D6A0;
        }

        .chain-hero-network-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 6px 10px;
          border: 1px solid;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 700;
          transition: transform .25s ease, border-color .25s ease;
        }

        .chain-hero-network-pill:hover {
          transform: translateY(-2px);
          border-color: rgba(0,214,160,.55);
        }

        .chain-hero-logo-wrap {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          flex-shrink: 0;
        }

        .chain-hero-logo {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
        }

        .chain-hero-network-logo {
          width: 21px;
          height: 21px;
          border-radius: 50%;
          padding: 2px;
        }

        .chain-hero-network-logo .chain-hero-logo {
          border-radius: 50%;
        }

        .chain-arc {
          color: #C9B7FF;
          background: linear-gradient(135deg, #5834B8, #29165D);
        }

        .chain-injective {
          color: #8BEAFF;
          background: linear-gradient(135deg, #126C98, #103A63);
        }

        .chain-botchain {
          color: #65FFD1;
          background: linear-gradient(135deg, #087D60, #064B3D);
        }

        .chain-usdc {
          color: #FFFFFF;
          background: linear-gradient(135deg, #2775CA, #124B91);
        }

        .chain-polkadot {
        color: #C9B7FF;
          background: linear-gradient(135deg, #5834B8, #29165D);
        }

        .chain-bounty {
          color: #06251C;
          background: #00D6A0;
        }

        .chain-hero-visual {
          perspective: 1200px;
          --tilt-x: 0deg;
          --tilt-y: 0deg;
        }

        .chain-hero-scene {
          transform: rotateX(var(--tilt-x)) rotateY(var(--tilt-y));
          transform-style: preserve-3d;
          transition: transform 450ms cubic-bezier(.16,1,.3,1);
        }

        .chain-hero-ring {
          position: absolute;
          border: 1px solid rgba(0,214,160,.2);
          border-radius: 50%;
          pointer-events: none;
        }

        .chain-hero-ring-one {
          width: 86%;
          height: 43%;
          transform: rotate(-28deg);
          animation: chainRingOne 22s linear infinite;
        }

        .chain-hero-ring-two {
          width: 68%;
          height: 66%;
          border-color: ${
            dark ? "rgba(255,255,255,.12)" : "rgba(10,70,48,.13)"
          };
          transform: rotate(35deg);
          animation: chainRingTwo 27s linear infinite;
        }

        .chain-hero-ring-three {
          width: 55%;
          height: 82%;
          border-color: rgba(0,214,160,.13);
          transform: rotate(55deg);
          animation: chainRingOne 35s linear infinite;
        }

        .chain-hero-core-glow {
          position: absolute;
          width: 45%;
          aspect-ratio: 1;
          border-radius: 50%;
          background: rgba(0,214,160,.14);
          filter: blur(55px);
          animation: chainGlowPulse 5s ease-in-out infinite;
        }

        .chain-hero-core {
          border-color: rgba(0,214,160,.3);
          box-shadow:
            0 0 0 10px rgba(0,214,160,.025),
            0 0 0 22px rgba(0,214,160,.025),
            0 0 75px rgba(0,214,160,.12),
            inset 0 0 40px rgba(0,214,160,.07);
          backdrop-filter: blur(18px);
          animation: chainCoreFloat 6s ease-in-out infinite;
        }

        .chain-hero-core-inner {
          box-shadow: inset 0 0 25px rgba(0,214,160,.06);
        }

        .chain-hero-orbit-badge {
          position: absolute;
          z-index: 15;
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 9px 12px 9px 9px;
          border: 1px solid ${
            dark ? "rgba(255,255,255,.12)" : "rgba(15,55,38,.10)"
          };
          border-radius: 16px;
          background: ${
            dark ? "rgba(12,23,19,.92)" : "rgba(255,255,255,.92)"
          };
          box-shadow: 0 14px 38px rgba(0,0,0,.10);
          backdrop-filter: blur(18px);
          animation: chainBadgeFloat 6s ease-in-out infinite;
        }

        .chain-hero-token {
          display: flex;
          width: 43px;
          height: 43px;
          flex: 0 0 43px;
          align-items: center;
          justify-content: center;
          padding: 7px;
          border: 1px solid rgba(255,255,255,.15);
          border-radius: 50%;
          box-shadow: 0 0 22px rgba(0,214,160,.08);
        }

        .chain-hero-token .chain-hero-logo {
          border-radius: 50%;
        }

        .chain-hero-badge-label strong {
          display: block;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: -.01em;
          color: ${dark ? "#FFFFFF" : "#17251D"};
        }

        .chain-hero-badge-label small {
          display: block;
          margin-top: 3px;
          font-size: 9px;
          white-space: nowrap;
          color: ${dark ? "rgba(255,255,255,.48)" : "#718078"};
        }

        .chain-hero-badge-arc {
          top: 23%;
          left: 2%;
          animation-delay: -1s;
        }

        .chain-hero-badge-injective {
          top: 18%;
          right: 0;
          animation-delay: -3s;
        }

        .chain-hero-badge-botchain {
          right: 7%;
          bottom: 19%;
          animation-delay: -2s;
        }

        .chain-hero-badge-polkadot {
          bottom: 17%;
          left: 5%;
          animation-delay: -2.5s;
        }

        .chain-hero-float-card {
          position: absolute;
          z-index: 20;
          display: flex;
          align-items: center;
          gap: 10px;
          max-width: 230px;
          padding: 11px 13px;
          border: 1px solid;
          border-radius: 15px;
          box-shadow: 0 18px 48px rgba(0,0,0,.10);
          backdrop-filter: blur(16px);
          animation: chainCardFloat 6s ease-in-out infinite;
        }

        .chain-hero-card-top {
          top: 5%;
          left: 20%;
          animation-delay: -2s;
        }

        .chain-hero-card-bottom {
          bottom: 5%;
          left: 0;
          animation-delay: -4s;
        }

        .chain-hero-card-icon {
          display: flex;
          width: 34px;
          height: 34px;
          flex: 0 0 34px;
          align-items: center;
          justify-content: center;
          border-radius: 11px;
          background: rgba(0,214,160,.12);
          color: #00D6A0;
          font-size: 16px;
        }

        .chain-hero-float-card strong {
          display: block;
          font-size: 11px;
          font-weight: 800;
        }

        .chain-hero-float-card small {
          display: block;
          margin-top: 3px;
          font-size: 9px;
          opacity: .6;
          white-space: nowrap;
        }

        .chain-hero-mini-label {
          position: absolute;
          z-index: 15;
          display: flex;
          align-items: center;
          gap: 6px;
          color: #00D6A0;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: .025em;
        }

        .chain-hero-mini-left {
          top: 39%;
          left: 0;
        }

        .chain-hero-mini-right {
          right: 0;
          bottom: 36%;
        }

        .chain-hero-node {
          position: absolute;
          z-index: 5;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #00D6A0;
          box-shadow: 0 0 18px rgba(0,214,160,.8);
          animation: chainNodePulse 3.5s ease-in-out infinite;
        }

        .chain-hero-node-one {
          top: 15%;
          left: 38%;
        }

        .chain-hero-node-two {
          right: 17%;
          top: 41%;
          animation-delay: -1s;
        }

        .chain-hero-node-three {
          left: 21%;
          bottom: 24%;
          animation-delay: -2s;
        }

        .chain-hero-node-four {
          right: 29%;
          bottom: 12%;
          animation-delay: -2.5s;
        }

        .chain-hero-ticker {
          border-color: rgba(0,214,160,.17);
          mask-image: linear-gradient(
            to right,
            transparent,
            black 3%,
            black 97%,
            transparent
          );
        }

        .chain-hero-ticker-track {
          display: flex;
          width: max-content;
          animation: chainTickerMove 36s linear infinite;
        }

        .chain-hero-ticker:hover .chain-hero-ticker-track {
          animation-play-state: paused;
        }

        .chain-hero-ticker-group {
          display: flex;
          flex-shrink: 0;
          align-items: center;
        }

        .chain-hero-ticker-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 20px;
          white-space: nowrap;
        }

        .chain-hero-ticker-icon {
          display: inline-flex;
          width: 27px;
          height: 27px;
          flex: 0 0 27px;
          align-items: center;
          justify-content: center;
          padding: 4px;
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 50%;
          font-size: 11px;
          font-weight: 900;
        }

        .chain-hero-ticker-icon .chain-hero-logo {
          border-radius: 50%;
        }

        .chain-hero-ticker-separator {
          margin-left: 9px;
          color: #00D6A0;
          font-size: 16px;
          font-weight: 400;
        }

        @keyframes chainRingOne {
          from { transform: rotate(-28deg); }
          to { transform: rotate(332deg); }
        }

        @keyframes chainRingTwo {
          from { transform: rotate(35deg); }
          to { transform: rotate(-325deg); }
        }

        @keyframes chainGlowPulse {
          0%, 100% { opacity: .65; transform: scale(.95); }
          50% { opacity: 1; transform: scale(1.12); }
        }

        @keyframes chainCoreFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-7px); }
        }

        @keyframes chainBadgeFloat {
          0%, 100% { translate: 0 0; }
          50% { translate: 0 -7px; }
        }

        @keyframes chainCardFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-7px); }
        }

        @keyframes chainNodePulse {
          0%, 100% { opacity: .3; transform: scale(.8); }
          50% { opacity: 1; transform: scale(1.4); }
        }

        @keyframes chainTickerMove {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333333%); }
        }

        @media (max-width: 640px) {
          .chain-hero-visual {
            min-height: 350px;
          }

          .chain-hero-scene {
            height: 350px;
          }

          .chain-hero-ring-one {
            width: 98%;
          }

          .chain-hero-ring-two {
            width: 78%;
          }

          .chain-hero-orbit-badge {
            gap: 6px;
            padding: 7px;
            border-radius: 13px;
          }

          .chain-hero-token {
            width: 34px;
            height: 34px;
            flex-basis: 34px;
            padding: 5px;
          }

          .chain-hero-badge-label strong {
            font-size: 10px;
          }

          .chain-hero-badge-label small {
            font-size: 8px;
          }

          .chain-hero-badge-arc {
            top: 22%;
            left: 0;
          }

          .chain-hero-badge-injective {
            top: 19%;
            right: 0;
          }

          .chain-hero-badge-botchain {
            right: 1%;
            bottom: 17%;
          }

          .chain-hero-badge-polkadot {
            bottom: 16%;
            left: 0;
          }

          .chain-hero-card-top {
            top: 3%;
            left: 15%;
          }

          .chain-hero-card-bottom {
            bottom: 2%;
            left: 0;
          }

          .chain-hero-float-card {
            max-width: 190px;
            padding: 9px;
            gap: 7px;
          }

          .chain-hero-float-card strong {
            font-size: 9px;
          }

          .chain-hero-float-card small {
            font-size: 8px;
          }

          .chain-hero-card-icon {
            width: 29px;
            height: 29px;
            flex-basis: 29px;
          }

          .chain-hero-mini-label {
            font-size: 8px;
          }

          .chain-hero-mini-left {
            top: 43%;
          }

          .chain-hero-mini-right {
            bottom: 38%;
          }

          .chain-hero-ticker-item {
            gap: 8px;
            padding: 12px 14px;
          }
        }

        @media (max-width: 390px) {
          .chain-hero-badge-label small {
            display: none;
          }

          .chain-hero-orbit-badge {
            padding: 6px;
          }

          .chain-hero-badge-arc {
            left: -2%;
          }

          .chain-hero-badge-injective {
            right: -2%;
          }

          .chain-hero-badge-botchain {
            right: -1%;
          }

          .chain-hero-badge-polkadot {
            left: -1%;
          }

          .chain-hero-card-top {
            left: 10%;
          }

          .chain-hero-mini-label {
            font-size: 7px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .chain-hero-glow,
          .chain-hero-ring,
          .chain-hero-core-glow,
          .chain-hero-core,
          .chain-hero-orbit-badge,
          .chain-hero-float-card,
          .chain-hero-node,
          .chain-hero-ticker-track {
            animation: none !important;
          }

          .chain-hero-scene {
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
