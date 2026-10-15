import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import {
  FiArrowUpRight,
  FiBriefcase,
  FiCheck,
  FiCheckCircle,
  FiChevronRight,
  FiCode,
  FiGlobe,
  FiLayers,
  FiShield,
  FiStar,
  FiTarget,
  FiTrendingUp,
  FiUserPlus,
  FiUsers,
  FiZap,
} from "react-icons/fi";

import { SiPolkadot } from "react-icons/si";

export default function HowItWorks() {
  const sectionRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const [activeChain, setActiveChain] = useState("Arc");
  const [dark, setDark] = useState(true);

  const chains = [
    {
      name: "Arc",
      symbol: "ARC",
      description: "Discover and complete bounties on Arc.",
      color: "#00D6A0",
      icon: <FiGlobe />,
    },
    {
      name: "Botchain",
      symbol: "BOT",
      description: "Connect with tasks and contributors on Botchain.",
      color: "#42A5F5",
      icon: <FiZap />,
    },
    {
      name: "Polkadot",
      symbol: "DOT",
      description: "Explore bounty opportunities in the Polkadot ecosystem.",
      color: "#E6007A",
      icon: <SiPolkadot />,
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Discover Bounties",
      description:
        "Explore available tasks, compare rewards, and find opportunities that match your skills and interests.",
      icon: <FiTarget />,
      tag: "FIND YOUR NEXT TASK",
      visual: "discover",
    },
    {
      number: "02",
      title: "Connect & Contribute",
      description:
        "Connect your wallet, choose a bounty, and complete the task according to the creator's requirements.",
      icon: <FiUsers />,
      tag: "PUT YOUR SKILLS TO WORK",
      visual: "connect",
    },
    {
      number: "03",
      title: "Get Your Work Approved",
      description:
        "Submit your work for review. The bounty creator checks your contribution before approving it.",
      icon: <FiCheckCircle />,
      tag: "SHOW WHAT YOU CAN DO",
      visual: "verify",
    },
    {
      number: "04",
      title: "Earn Rewards",
      description:
        "Receive your reward after approval, build your reputation, and discover your next opportunity.",
      icon: <FiTrendingUp />,
      tag: "TURN WORK INTO REWARDS",
      visual: "earn",
    },
  ];

  const selectedChain =
    chains.find((chain) => chain.name === activeChain) || chains[0];

  // Keep the section synchronized with the site's existing theme.
  useEffect(() => {
    if (typeof document === "undefined") return undefined;

    const root = document.documentElement;
    const body = document.body;

    const updateTheme = () => {
      const isDark =
        root.classList.contains("dark") || body.classList.contains("dark");

      setDark(isDark);
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);

    observer.observe(root, {
      attributes: true,
      attributeFilter: ["class"],
    });

    observer.observe(body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Reveal the section when it enters the viewport.
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`hiw-section ${dark ? "hiw-dark" : "hiw-light"} ${
        isVisible ? "hiw-visible" : ""
      }`}
    >
      <div className="hiw-background-grid" aria-hidden="true" />
      <div className="hiw-glow hiw-glow-one" aria-hidden="true" />
      <div className="hiw-glow hiw-glow-two" aria-hidden="true" />

      <div className="hiw-container">
        {/* HEADER */}
        <header className="hiw-header">
          <div className="hiw-eyebrow">
            <span className="hiw-live-dot" />
            HOW HAPPY BOUNTY WORKS
          </div>

          <h2>
            Your skills.
            <br />
            <span className="hiw-gradient-text">Your chain.</span>{" "}
            <strong>Your rewards.</strong>
          </h2>

          <p>
            Discover opportunities, contribute to Web3 projects, and earn
            rewards for your work. Happy Bounty brings task creators and
            talented contributors together in one place.
          </p>

          <div className="hiw-header-points">
            <span>
              <FiCheckCircle />
              Multiple ecosystems
            </span>
            <span>
              <FiShield />
              Wallet-based participation
            </span>
            <span>
              <FiZap />
              Reward-driven tasks
            </span>
          </div>
        </header>

        {/* MULTI-CHAIN ECOSYSTEM */}
        <div className="hiw-ecosystem">
          <div className="hiw-ecosystem-heading">
            <div>
              <div className="hiw-section-kicker">THE ECOSYSTEM</div>
              <h3>One platform. Multiple ecosystems.</h3>
              <p>Select an ecosystem to explore its bounty experience.</p>
            </div>

            <div className="hiw-chain-count">
              <FiLayers />
              <span>{chains.length} ecosystems</span>
            </div>
          </div>

          <div className="hiw-chain-grid">
            {chains.map((chain) => (
              <button
                type="button"
                key={chain.name}
                className={`hiw-chain-card ${
                  activeChain === chain.name ? "hiw-chain-active" : ""
                }`}
                style={{ "--chain-color": chain.color }}
                onClick={() => setActiveChain(chain.name)}
                aria-pressed={activeChain === chain.name}
                aria-label={`Select ${chain.name} ecosystem`}
              >
                <div className="hiw-chain-card-top">
                  <span className="hiw-chain-icon">{chain.icon}</span>
                  <span className="hiw-chain-symbol">{chain.symbol}</span>
                </div>

                <strong>{chain.name}</strong>

                <span className="hiw-chain-description">
                  {chain.description}
                </span>

                <span className="hiw-chain-select">
                  {activeChain === chain.name ? (
                    <>
                      Selected <FiCheck />
                    </>
                  ) : (
                    <>
                      Explore <FiArrowUpRight />
                    </>
                  )}
                </span>
              </button>
            ))}
          </div>

          <div className="hiw-selected-network" aria-live="polite">
            <div
              className="hiw-selected-network-icon"
              style={{ "--chain-color": selectedChain.color }}
            >
              {selectedChain.icon}
            </div>

            <div className="hiw-selected-network-copy">
              <span>SELECTED ECOSYSTEM</span>
              <strong>{selectedChain.name}</strong>
              <p>{selectedChain.description}</p>
            </div>

            <div
              className="hiw-selected-network-badge"
              style={{ "--chain-color": selectedChain.color }}
            >
              <span />
              {selectedChain.symbol} SELECTED
            </div>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div className="hiw-process-heading">
          <div>
            <div className="hiw-section-kicker">YOUR JOURNEY</div>
            <h3>From opportunity to reward.</h3>
          </div>

          <p>
            Four simple steps.
            <br />
            One rewarding journey.
          </p>
        </div>

        <div className="hiw-process-grid">
          {steps.map((step, index) => (
            <article
              key={step.number}
              className="hiw-step-card"
              style={{ "--step-index": index }}
            >
              <div className="hiw-step-top">
                <span className="hiw-step-number">{step.number}</span>
                <span className="hiw-step-mini-icon">{step.icon}</span>
              </div>

              <div className={`hiw-visual hiw-visual-${step.visual}`}>
                {step.visual === "discover" && (
                  <>
                    <div className="hiw-orbit hiw-orbit-a" />
                    <div className="hiw-orbit hiw-orbit-b" />

                    <div className="hiw-discover-window">
                      <div className="hiw-window-dots">
                        <i />
                        <i />
                        <i />
                      </div>

                      <div className="hiw-discover-row">
                        <div className="hiw-mini-task-icon">
                          <FiCode />
                        </div>

                        <div className="hiw-mini-task-copy">
                          <span />
                          <span />
                        </div>

                        <FiChevronRight />
                      </div>

                      <div className="hiw-discover-row">
                        <div className="hiw-mini-task-icon hiw-mini-task-alt">
                          <FiZap />
                        </div>

                        <div className="hiw-mini-task-copy">
                          <span />
                          <span />
                        </div>

                        <FiChevronRight />
                      </div>
                    </div>

                    <span className="hiw-floating-symbol hiw-symbol-one">
                      <FiTarget />
                    </span>

                    <span className="hiw-floating-symbol hiw-symbol-two">
                      <FiStar />
                    </span>
                  </>
                )}

                {step.visual === "connect" && (
                  <>
                    <div className="hiw-connect-line hiw-connect-line-one" />
                    <div className="hiw-connect-line hiw-connect-line-two" />

                    <div className="hiw-connect-center">
                      <FiGlobe />
                    </div>

                    <div className="hiw-connect-node hiw-connect-node-one">
                      <FiUserPlus />
                    </div>

                    <div className="hiw-connect-node hiw-connect-node-two">
                      <FiUsers />
                    </div>

                    <div className="hiw-connect-node hiw-connect-node-three">
                      <FiCode />
                    </div>

                    <span className="hiw-connect-particle" />
                  </>
                )}

                {step.visual === "verify" && (
                  <>
                    <div className="hiw-verify-ring hiw-verify-ring-one" />
                    <div className="hiw-verify-ring hiw-verify-ring-two" />

                    <div className="hiw-verify-card">
                      <div className="hiw-verify-card-top">
                        <span>SUBMISSION</span>
                        <span className="hiw-verify-status">IN REVIEW</span>
                      </div>

                      <div className="hiw-verify-lines">
                        <span />
                        <span />
                        <span />
                      </div>

                      <div className="hiw-verify-card-bottom">
                        <FiShield />
                        Work verification
                      </div>
                    </div>

                    <div className="hiw-verify-check">
                      <FiCheck />
                    </div>
                  </>
                )}

                {step.visual === "earn" && (
                  <>
                    <div className="hiw-earn-ring hiw-earn-ring-one" />
                    <div className="hiw-earn-ring hiw-earn-ring-two" />

                    <div className="hiw-earn-card">
                      <div className="hiw-earn-dollar">$</div>

                      <div className="hiw-earn-copy">
                        <span>BOUNTY REWARD</span>
                        <strong>USDC</strong>
                        <small>After approval</small>
                      </div>

                      <div className="hiw-earn-check">
                        <FiCheck />
                      </div>
                    </div>

                    <span className="hiw-earn-particle hiw-earn-particle-one" />
                    <span className="hiw-earn-particle hiw-earn-particle-two" />
                    <span className="hiw-earn-particle hiw-earn-particle-three" />
                  </>
                )}
              </div>

              <div className="hiw-step-content">
                <span className="hiw-step-tag">{step.tag}</span>
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </div>

              <div className="hiw-step-bottom">
                <span>STEP {step.number}</span>
                <span className="hiw-step-bottom-icon">
                  <FiArrowUpRight />
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* CREATE A BOUNTY */}
        <div className="hiw-create-banner">
          <div
            className="hiw-create-decoration hiw-create-decoration-one"
            aria-hidden="true"
          />
          <div
            className="hiw-create-decoration hiw-create-decoration-two"
            aria-hidden="true"
          />

          <div className="hiw-create-icon">
            <FiBriefcase />
          </div>

          <div className="hiw-create-copy">
            <span>ARE YOU BUILDING SOMETHING?</span>
            <h3>Have work to get done?</h3>
            <p>
              Create a bounty, set a reward, and invite talented contributors to
              help bring your ideas to life.
            </p>
          </div>
          <div className="hiw-create-button">Your Skills, Your Rewards</div>
        </div>

        {/* ECOSYSTEM FOOTER */}
        <footer className="hiw-footer">
          <div className="hiw-footer-intro">
            <span className="hiw-live-dot" />
            THE HAPPY BOUNTY ECOSYSTEM
          </div>

          <div className="hiw-footer-chains">
            {chains.map((chain) => (
              <span className="hiw-footer-chain" key={chain.name}>
                <i style={{ background: chain.color }} />
                {chain.name}
              </span>
            ))}

            <span className="hiw-footer-chain hiw-footer-usdc">
              <i />
              USDC Rewards
            </span>
          </div>
        </footer>
      </div>

      <style>{`
        .hiw-section {
          --hiw-accent: #00D6A0;
          --hiw-gold: #c5a23c;
          position: relative;
          z-index: 0;
          isolation: isolate;
          width: 100%;
          padding: 100px 24px 70px;
          overflow: hidden;
          color: var(--hiw-text);
          background: var(--hiw-bg);
          transition: background .3s ease, color .3s ease;
        }

        .hiw-dark {
          --hiw-bg: #080B0D;
          --hiw-text: #f5f7f6;
          --hiw-muted: #929b97;
          --hiw-border: rgba(255,255,255,.09);
          --hiw-card: #101513;
          --hiw-card-hover: #151c19;
          --hiw-soft: rgba(255,255,255,.035);
          --hiw-shadow: rgba(0,0,0,.24);
          color-scheme: dark;
        }

        .hiw-light {
          --hiw-bg: #faf9f5;
          --hiw-text: #111713;
          --hiw-muted: #737b76;
          --hiw-border: rgba(20,30,25,.11);
          --hiw-card: #ffffff;
          --hiw-card-hover: #ffffff;
          --hiw-soft: rgba(15,30,25,.035);
          --hiw-shadow: rgba(20,30,25,.06);
          color-scheme: light;
        }

        .hiw-section *,
        .hiw-section *::before,
        .hiw-section *::after {
          box-sizing: border-box;
        }

        .hiw-section button {
          font-family: inherit;
        }

        .hiw-background-grid {
          position: absolute;
          inset: 0;
          z-index: -2;
          pointer-events: none;
          background-image:
            linear-gradient(var(--hiw-border) 1px, transparent 1px),
            linear-gradient(90deg, var(--hiw-border) 1px, transparent 1px);
          background-size: 58px 58px;
          opacity: .2;
          mask-image: linear-gradient(to bottom, transparent, #000 15%, #000 80%, transparent);
        }

        .hiw-glow {
          position: absolute;
          z-index: -1;
          width: 420px;
          height: 420px;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
        }

        .hiw-glow-one {
          top: 0;
          left: -230px;
          background: rgba(0,214,160,.09);
        }

        .hiw-glow-two {
          right: -240px;
          top: 45%;
          background: rgba(0,214,160,.07);
        }

        .hiw-container {
          position: relative;
          width: 100%;
          max-width: 1320px;
          margin: 0 auto;
        }

        .hiw-header {
          max-width: 850px;
          margin: 0 auto 66px;
          text-align: center;
        }

        .hiw-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 9px 14px;
          border: 1px solid var(--hiw-border);
          border-radius: 999px;
          background: var(--hiw-soft);
          color: var(--hiw-muted);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: .15em;
        }

        .hiw-live-dot {
          display: inline-block;
          width: 7px;
          height: 7px;
          flex-shrink: 0;
          border-radius: 50%;
          background: #00D6A0;
          box-shadow: 0 0 12px rgba(0,214,160,.6);
          animation: hiwPulse 2s ease-in-out infinite;
        }

        .hiw-header h2 {
          margin: 24px 0 18px;
          color: var(--hiw-text);
          font-size: clamp(2.5rem, 5.8vw, 5rem);
          font-weight: 850;
          line-height: .99;
          letter-spacing: -.065em;
        }

        .hiw-header h2 strong {
          color: var(--hiw-accent);
          font-weight: 850;
        }

        .hiw-gradient-text {
          background: linear-gradient(100deg, #00D6A0 5%, #b8e9d7 48%, #c6a64b 100%);
          color: transparent;
          background-clip: text;
          -webkit-background-clip: text;
        }

        .hiw-header > p {
          max-width: 650px;
          margin: 0 auto;
          color: var(--hiw-muted);
          font-size: 15px;
          line-height: 1.85;
        }

        .hiw-header-points {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 10px 22px;
          margin-top: 25px;
        }

        .hiw-header-points span {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: var(--hiw-muted);
          font-size: 11px;
          font-weight: 600;
        }

        .hiw-header-points svg {
          color: var(--hiw-accent);
          font-size: 14px;
        }

        .hiw-ecosystem {
          position: relative;
          padding: 30px;
          margin-bottom: 80px;
          border: 1px solid var(--hiw-border);
          border-radius: 26px;
          background: var(--hiw-card);
          box-shadow: 0 25px 70px var(--hiw-shadow);
        }

        .hiw-ecosystem-heading,
        .hiw-process-heading {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 20px;
        }

        .hiw-section-kicker {
          margin-bottom: 10px;
          color: var(--hiw-accent);
          font-size: 9px;
          font-weight: 850;
          letter-spacing: .2em;
        }

        .hiw-ecosystem-heading h3,
        .hiw-process-heading h3 {
          margin: 0;
          color: var(--hiw-text);
          font-size: clamp(1.45rem, 3vw, 2rem);
          font-weight: 800;
          letter-spacing: -.04em;
        }

        .hiw-ecosystem-heading p,
        .hiw-process-heading > p {
          margin: 9px 0 0;
          color: var(--hiw-muted);
          font-size: 12px;
          line-height: 1.7;
        }

        .hiw-chain-count {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 12px;
          border: 1px solid var(--hiw-border);
          border-radius: 999px;
          color: var(--hiw-muted);
          background: var(--hiw-soft);
          white-space: nowrap;
          font-size: 10px;
          font-weight: 700;
        }

        .hiw-chain-count svg {
          color: var(--hiw-accent);
        }

        .hiw-chain-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 13px;
          margin-top: 27px;
        }

        .hiw-chain-card {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          min-width: 0;
          padding: 18px;
          text-align: left;
          color: var(--hiw-text);
          border: 1px solid var(--hiw-border);
          border-radius: 17px;
          background: var(--hiw-soft);
          cursor: pointer;
          font: inherit;
          transition: transform .3s ease, border-color .3s ease, background .3s ease, box-shadow .3s ease;
        }

        .hiw-chain-card:hover {
          transform: translateY(-4px);
          border-color: var(--chain-color);
        }

        .hiw-chain-card:focus-visible,
        .hiw-create-button:focus-visible {
          outline: 2px solid var(--hiw-accent);
          outline-offset: 4px;
        }

        .hiw-chain-card.hiw-chain-active {
          border-color: var(--chain-color);
          background: color-mix(in srgb, var(--chain-color) 8%, var(--hiw-card));
          box-shadow: 0 8px 28px color-mix(in srgb, var(--chain-color) 9%, transparent);
        }

        .hiw-chain-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          gap: 10px;
          margin-bottom: 17px;
        }

        .hiw-chain-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border: 1px solid color-mix(in srgb, var(--chain-color) 30%, transparent);
          border-radius: 13px;
          background: color-mix(in srgb, var(--chain-color) 11%, transparent);
          color: var(--chain-color);
          font-size: 21px;
        }

        .hiw-chain-symbol {
          padding: 5px 7px;
          border: 1px solid var(--hiw-border);
          border-radius: 6px;
          color: var(--hiw-muted);
          font-size: 9px;
          font-weight: 800;
          letter-spacing: .08em;
        }

        .hiw-chain-card > strong {
          color: var(--hiw-text);
          font-size: 14px;
          font-weight: 800;
        }

        .hiw-chain-description {
          min-height: 38px;
          margin-top: 7px;
          color: var(--hiw-muted);
          font-size: 10px;
          line-height: 1.65;
        }

        .hiw-chain-select {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-top: 17px;
          color: var(--chain-color);
          font-size: 10px;
          font-weight: 800;
        }

        .hiw-chain-select svg {
          font-size: 13px;
        }

        .hiw-selected-network {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-top: 18px;
          padding: 16px 18px;
          border: 1px solid var(--hiw-border);
          border-radius: 14px;
          background: var(--hiw-soft);
        }

        .hiw-selected-network-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 43px;
          height: 43px;
          flex-shrink: 0;
          border: 1px solid color-mix(in srgb, var(--chain-color) 35%, transparent);
          border-radius: 12px;
          background: color-mix(in srgb, var(--chain-color) 10%, transparent);
          color: var(--chain-color);
          font-size: 21px;
        }

        .hiw-selected-network-copy {
          flex: 1;
          min-width: 0;
        }

        .hiw-selected-network-copy > span {
          display: block;
          color: var(--hiw-muted);
          font-size: 8px;
          font-weight: 800;
          letter-spacing: .14em;
        }

        .hiw-selected-network-copy strong {
          display: block;
          margin-top: 4px;
          color: var(--hiw-text);
          font-size: 14px;
        }

        .hiw-selected-network-copy p {
          margin: 4px 0 0;
          color: var(--hiw-muted);
          font-size: 10px;
          line-height: 1.5;
        }

        .hiw-selected-network-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 10px;
          border: 1px solid color-mix(in srgb, var(--chain-color) 30%, transparent);
          border-radius: 999px;
          background: color-mix(in srgb, var(--chain-color) 8%, transparent);
          color: var(--chain-color);
          font-size: 8px;
          font-weight: 800;
          white-space: nowrap;
        }

        .hiw-selected-network-badge > span {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--chain-color);
        }

        .hiw-process-heading {
          margin-bottom: 28px;
        }

        .hiw-process-heading > p {
          text-align: right;
        }

        .hiw-process-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
        }

        .hiw-step-card {
          position: relative;
          min-width: 0;
          padding: 20px 19px 17px;
          overflow: hidden;
          border: 1px solid var(--hiw-border);
          border-radius: 21px;
          background: var(--hiw-card);
          box-shadow: 0 15px 38px var(--hiw-shadow);
          transition: transform .35s ease, border-color .35s ease, background .35s ease, box-shadow .35s ease;
        }

        .hiw-visible .hiw-step-card {
          animation: hiwCardReveal .7s cubic-bezier(.2,.8,.2,1) both;
          animation-delay: calc(var(--step-index) * 100ms);
        }

        .hiw-step-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 15%;
          right: 15%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,214,160,.8), transparent);
          opacity: .65;
        }

        .hiw-step-card::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(circle at 50% 30%, rgba(0,214,160,.07), transparent 55%);
          opacity: 0;
          transition: opacity .35s ease;
        }

        .hiw-step-card:hover {
          transform: translateY(-7px);
          border-color: rgba(0,214,160,.28);
          background: var(--hiw-card-hover);
          box-shadow: 0 24px 55px var(--hiw-shadow), 0 0 28px rgba(0,214,160,.045);
        }

        .hiw-step-card:hover::after {
          opacity: 1;
        }

        .hiw-step-top {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .hiw-step-number {
          color: var(--hiw-muted);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: .15em;
        }

        .hiw-step-mini-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 31px;
          height: 31px;
          border: 1px solid rgba(0,214,160,.22);
          border-radius: 10px;
          background: rgba(0,214,160,.07);
          color: var(--hiw-accent);
          font-size: 15px;
        }

        .hiw-visual {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 170px;
          margin: 8px 0 13px;
          overflow: hidden;
        }

        .hiw-discover-window {
          position: relative;
          z-index: 2;
          width: 184px;
          padding: 11px;
          border: 1px solid var(--hiw-border);
          border-radius: 13px;
          background: var(--hiw-card-hover);
          box-shadow: 0 17px 35px var(--hiw-shadow);
          animation: hiwFloat 4s ease-in-out infinite;
        }

        .hiw-window-dots {
          display: flex;
          gap: 4px;
          padding-bottom: 10px;
          border-bottom: 1px solid var(--hiw-border);
        }

        .hiw-window-dots i {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--hiw-muted);
          opacity: .5;
        }

        .hiw-discover-row {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 10px 0 2px;
        }

        .hiw-mini-task-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          flex-shrink: 0;
          border-radius: 8px;
          background: rgba(0,214,160,.1);
          color: var(--hiw-accent);
          font-size: 13px;
        }

        .hiw-mini-task-alt {
          color: #c6a64b;
          background: rgba(198,166,75,.1);
        }

        .hiw-mini-task-copy {
          display: flex;
          flex: 1;
          flex-direction: column;
          gap: 5px;
        }

        .hiw-mini-task-copy span {
          height: 4px;
          width: 88%;
          border-radius: 999px;
          background: var(--hiw-border);
        }

        .hiw-mini-task-copy span:last-child {
          width: 55%;
        }

        .hiw-discover-row > svg {
          color: var(--hiw-muted);
          font-size: 12px;
        }

        .hiw-orbit {
          position: absolute;
          width: 210px;
          height: 100px;
          border: 1px solid rgba(0,214,160,.16);
          border-radius: 50%;
        }

        .hiw-orbit-a {
          transform: rotate(35deg);
          animation: hiwOrbit 12s linear infinite;
        }

        .hiw-orbit-b {
          width: 195px;
          height: 115px;
          border-color: rgba(198,166,75,.19);
          transform: rotate(-35deg);
          animation: hiwOrbit 15s linear infinite reverse;
        }

        .hiw-floating-symbol {
          position: absolute;
          z-index: 3;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border: 1px solid var(--hiw-border);
          border-radius: 10px;
          background: var(--hiw-card-hover);
          box-shadow: 0 8px 20px var(--hiw-shadow);
          color: var(--hiw-accent);
        }

        .hiw-symbol-one {
          top: 18px;
          left: 8px;
          animation: hiwFloat 3s ease-in-out infinite;
        }

        .hiw-symbol-two {
          right: 5px;
          bottom: 16px;
          color: #c6a64b;
          animation: hiwFloat 3.5s ease-in-out infinite .6s;
        }

        .hiw-connect-center,
        .hiw-connect-node {
          position: absolute;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(0,214,160,.25);
          border-radius: 50%;
          background: var(--hiw-card-hover);
          color: var(--hiw-accent);
          box-shadow: 0 10px 25px var(--hiw-shadow), 0 0 20px rgba(0,214,160,.06);
        }

        .hiw-connect-center {
          width: 62px;
          height: 62px;
          font-size: 25px;
          animation: hiwFloat 4s ease-in-out infinite;
        }

        .hiw-connect-node {
          width: 39px;
          height: 39px;
          font-size: 16px;
        }

        .hiw-connect-node-one {
          top: 16px;
          left: 14px;
          animation: hiwFloat 3.4s ease-in-out infinite;
        }

        .hiw-connect-node-two {
          top: 20px;
          right: 12px;
          color: #c6a64b;
          border-color: rgba(198,166,75,.25);
          animation: hiwFloat 3.8s ease-in-out infinite .4s;
        }

        .hiw-connect-node-three {
          right: 35px;
          bottom: 8px;
          animation: hiwFloat 4s ease-in-out infinite .8s;
        }

        .hiw-connect-line {
          position: absolute;
          z-index: 1;
          width: 70px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,214,160,.65), transparent);
          transform-origin: center;
        }

        .hiw-connect-line-one {
          top: 55px;
          left: 27px;
          transform: rotate(35deg);
        }

        .hiw-connect-line-two {
          right: 20px;
          bottom: 46px;
          transform: rotate(-35deg);
        }

        .hiw-connect-particle {
          position: absolute;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--hiw-accent);
          box-shadow: 0 0 12px rgba(0,214,160,.7);
          animation: hiwParticle 3s ease-in-out infinite;
        }

        .hiw-verify-card {
          position: relative;
          z-index: 2;
          width: 190px;
          padding: 13px;
          border: 1px solid var(--hiw-border);
          border-radius: 13px;
          background: var(--hiw-card-hover);
          box-shadow: 0 15px 35px var(--hiw-shadow);
          animation: hiwFloat 4.5s ease-in-out infinite;
        }

        .hiw-verify-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 6px;
          color: var(--hiw-muted);
          font-size: 7px;
          font-weight: 800;
          letter-spacing: .1em;
        }

        .hiw-verify-status {
          padding: 4px 6px;
          border-radius: 5px;
          background: rgba(198,166,75,.1);
          color: #c6a64b;
          font-size: 6px;
        }

        .hiw-verify-lines {
          display: flex;
          flex-direction: column;
          gap: 7px;
          margin-top: 16px;
        }

        .hiw-verify-lines span {
          width: 90%;
          height: 5px;
          border-radius: 999px;
          background: var(--hiw-border);
        }

        .hiw-verify-lines span:nth-child(2) {
          width: 68%;
        }

        .hiw-verify-lines span:nth-child(3) {
          width: 48%;
        }

        .hiw-verify-card-bottom {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 15px;
          padding-top: 10px;
          border-top: 1px solid var(--hiw-border);
          color: var(--hiw-muted);
          font-size: 8px;
        }

        .hiw-verify-card-bottom svg {
          color: var(--hiw-accent);
          font-size: 12px;
        }

        .hiw-verify-ring {
          position: absolute;
          width: 190px;
          height: 95px;
          border: 1px solid rgba(0,214,160,.17);
          border-radius: 50%;
        }

        .hiw-verify-ring-one {
          transform: rotate(35deg);
          animation: hiwOrbit 13s linear infinite;
        }

        .hiw-verify-ring-two {
          width: 165px;
          height: 110px;
          border-color: rgba(198,166,75,.17);
          transform: rotate(-30deg);
          animation: hiwOrbit 17s linear infinite reverse;
        }

        .hiw-verify-check {
          position: absolute;
          z-index: 4;
          top: 12px;
          right: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border: 1px solid rgba(0,214,160,.28);
          border-radius: 50%;
          background: var(--hiw-card-hover);
          color: var(--hiw-accent);
          box-shadow: 0 8px 20px var(--hiw-shadow);
          animation: hiwCheckPulse 2.5s ease-in-out infinite;
        }

        .hiw-earn-card {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 10px;
          width: 205px;
          padding: 14px;
          border: 1px solid rgba(0,214,160,.25);
          border-radius: 15px;
          background: var(--hiw-card-hover);
          box-shadow: 0 17px 35px var(--hiw-shadow), 0 0 25px rgba(0,214,160,.06);
          animation: hiwFloat 4s ease-in-out infinite;
        }

        .hiw-earn-dollar {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 41px;
          height: 41px;
          flex-shrink: 0;
          border: 1px solid rgba(0,214,160,.23);
          border-radius: 12px;
          background: rgba(0,214,160,.09);
          color: var(--hiw-accent);
          font-size: 24px;
          font-weight: 850;
        }

        .hiw-earn-copy {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .hiw-earn-copy span {
          color: var(--hiw-muted);
          font-size: 7px;
          font-weight: 800;
          letter-spacing: .12em;
        }

        .hiw-earn-copy strong {
          color: var(--hiw-text);
          font-size: 16px;
          font-weight: 850;
        }

        .hiw-earn-copy small {
          color: var(--hiw-accent);
          font-size: 8px;
        }

        .hiw-earn-check {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 21px;
          height: 21px;
          margin-left: auto;
          flex-shrink: 0;
          border-radius: 50%;
          background: rgba(0,214,160,.12);
          color: var(--hiw-accent);
          font-size: 12px;
        }

        .hiw-earn-ring {
          position: absolute;
          width: 215px;
          height: 105px;
          border: 1px solid rgba(0,214,160,.13);
          border-radius: 50%;
        }

        .hiw-earn-ring-one {
          transform: rotate(-20deg);
          animation: hiwOrbit 14s linear infinite;
        }

        .hiw-earn-ring-two {
          width: 170px;
          height: 130px;
          border-color: rgba(198,166,75,.18);
          transform: rotate(35deg);
          animation: hiwOrbit 18s linear infinite reverse;
        }

        .hiw-earn-particle {
          position: absolute;
          z-index: 3;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--hiw-accent);
          box-shadow: 0 0 10px rgba(0,214,160,.6);
          animation: hiwParticle 3.5s ease-in-out infinite;
        }

        .hiw-earn-particle-one {
          top: 16px;
          left: 22px;
        }

        .hiw-earn-particle-two {
          right: 18px;
          bottom: 16px;
          background: #c6a64b;
          animation-delay: .7s;
        }

        .hiw-earn-particle-three {
          right: 10px;
          top: 24px;
          animation-delay: 1.1s;
        }

        .hiw-step-content {
          position: relative;
          z-index: 2;
        }

        .hiw-step-tag {
          display: inline-block;
          margin-bottom: 10px;
          color: var(--hiw-accent);
          font-size: 8px;
          font-weight: 850;
          letter-spacing: .13em;
        }

        .hiw-step-content h4 {
          margin: 0 0 9px;
          color: var(--hiw-text);
          font-size: 16px;
          font-weight: 800;
          letter-spacing: -.025em;
        }

        .hiw-step-content p {
          min-height: 88px;
          margin: 0;
          color: var(--hiw-muted);
          font-size: 11px;
          line-height: 1.8;
        }

        .hiw-step-bottom {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 19px;
          padding-top: 13px;
          border-top: 1px solid var(--hiw-border);
          color: var(--hiw-muted);
          font-size: 8px;
          font-weight: 800;
          letter-spacing: .13em;
        }

        .hiw-step-bottom-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border: 1px solid var(--hiw-border);
          border-radius: 8px;
          color: var(--hiw-accent);
          font-size: 13px;
          transition: transform .25s ease, background .25s ease;
        }

        .hiw-step-card:hover .hiw-step-bottom-icon {
          transform: translate(2px, -2px);
          background: rgba(0,214,160,.08);
        }

        .hiw-create-banner {
          position: relative;
          display: flex;
          align-items: center;
          gap: 22px;
          margin-top: 64px;
          padding: 29px 31px;
          overflow: hidden;
          border: 1px solid rgba(0,214,160,.2);
          border-radius: 22px;
          background: linear-gradient(105deg, rgba(0,214,160,.085), var(--hiw-card) 48%, rgba(198,166,75,.045));
          box-shadow: 0 18px 50px var(--hiw-shadow);
        }

        .hiw-create-decoration {
          position: absolute;
          width: 180px;
          height: 180px;
          border: 1px solid rgba(0,214,160,.09);
          border-radius: 50%;
          pointer-events: none;
        }

        .hiw-create-decoration-one {
          right: 90px;
          top: -120px;
        }

        .hiw-create-decoration-two {
          right: 30px;
          top: -90px;
          width: 130px;
          height: 130px;
        }

        .hiw-create-icon {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          flex-shrink: 0;
          border: 1px solid rgba(0,214,160,.25);
          border-radius: 16px;
          background: rgba(0,214,160,.1);
          color: var(--hiw-accent);
          font-size: 24px;
        }

        .hiw-create-copy {
          position: relative;
          z-index: 1;
          flex: 1;
        }

        .hiw-create-copy > span {
          color: var(--hiw-accent);
          font-size: 8px;
          font-weight: 850;
          letter-spacing: .16em;
        }

        .hiw-create-copy h3 {
          margin: 7px 0;
          color: var(--hiw-text);
          font-size: clamp(1.2rem, 2.4vw, 1.7rem);
          font-weight: 850;
          letter-spacing: -.04em;
        }

        .hiw-create-copy p {
          max-width: 600px;
          margin: 0;
          color: var(--hiw-muted);
          font-size: 11px;
          line-height: 1.8;
        }

        .hiw-create-button {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 13px 17px;
          flex-shrink: 0;
          border: 1px solid rgba(0,214,160,.35);
          border-radius: 11px;
          background: #00D6A0;
          color: #06251c;
          text-decoration: none;
          font-size: 11px;
          font-weight: 850;
          transition: transform .25s ease, box-shadow .25s ease, background .25s ease;
        }

        .hiw-create-button:hover {
          transform: translateY(-2px);
          background: #16e2b0;
          box-shadow: 0 10px 25px rgba(0,214,160,.2);
        }

        .hiw-create-button svg {
          font-size: 15px;
        }

        .hiw-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-top: 35px;
          padding-top: 23px;
          border-top: 1px solid var(--hiw-border);
        }

        .hiw-footer-intro {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          color: var(--hiw-muted);
          font-size: 8px;
          font-weight: 850;
          letter-spacing: .14em;
          white-space: nowrap;
        }

        .hiw-footer-chains {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          flex-wrap: wrap;
          gap: 13px 20px;
        }

        .hiw-footer-chain {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: var(--hiw-muted);
          font-size: 10px;
          font-weight: 700;
        }

        .hiw-footer-chain i {
          display: inline-block;
          width: 7px;
          height: 7px;
          border-radius: 50%;
        }

        .hiw-footer-usdc i {
          background: #2775ca;
        }

        @keyframes hiwCardReveal {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes hiwPulse {
          0%, 100% {
            opacity: .5;
            transform: scale(.85);
          }
          50% {
            opacity: 1;
            transform: scale(1.15);
          }
        }

        @keyframes hiwFloat {
          0%, 100% {
            translate: 0 0;
          }
          50% {
            translate: 0 -6px;
          }
        }

        @keyframes hiwOrbit {
          from {
            rotate: 0deg;
          }
          to {
            rotate: 360deg;
          }
        }

        @keyframes hiwParticle {
          0%, 100% {
            opacity: .25;
            translate: 0 0;
          }
          50% {
            opacity: 1;
            translate: 8px -9px;
          }
        }

        @keyframes hiwCheckPulse {
          0%, 100% {
            scale: 1;
          }
          50% {
            scale: 1.08;
          }
        }

        @media (max-width: 1050px) {
          .hiw-process-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .hiw-step-content p {
            min-height: 66px;
          }

          .hiw-step-card {
            padding: 22px;
          }

          .hiw-visual {
            height: 185px;
          }
        }

        @media (max-width: 640px) {
          .hiw-section {
            padding: 70px 15px 48px;
          }

          .hiw-header {
            margin-bottom: 45px;
          }

          .hiw-header h2 {
            font-size: clamp(2.45rem, 10vw, 3.6rem);
            line-height: 1.03;
          }

          .hiw-header > p {
            font-size: 13px;
            line-height: 1.8;
          }

          .hiw-header-points {
            gap: 12px;
          }

          .hiw-header-points span {
            font-size: 10px;
          }

          .hiw-ecosystem {
            padding: 18px;
            margin-bottom: 58px;
            border-radius: 20px;
          }

          .hiw-ecosystem-heading {
            align-items: flex-start;
            flex-direction: column;
            gap: 13px;
          }

          .hiw-chain-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px;
            margin-top: 20px;
          }

          .hiw-chain-card {
            padding: 13px;
            border-radius: 14px;
          }

          .hiw-chain-card-top {
            margin-bottom: 12px;
          }

          .hiw-chain-icon {
            width: 36px;
            height: 36px;
            font-size: 18px;
          }

          .hiw-chain-card > strong {
            font-size: 12px;
          }

          .hiw-chain-description {
            min-height: 46px;
            font-size: 9px;
          }

          .hiw-chain-select {
            margin-top: 12px;
            font-size: 9px;
          }

          .hiw-selected-network {
            align-items: flex-start;
            padding: 13px;
            gap: 10px;
          }

          .hiw-selected-network-icon {
            width: 36px;
            height: 36px;
          }

          .hiw-selected-network-copy p {
            font-size: 9px;
          }

          .hiw-selected-network-badge {
            display: none;
          }

          .hiw-process-heading {
            align-items: flex-start;
            flex-direction: column;
            gap: 6px;
          }

          .hiw-process-heading > p {
            text-align: left;
          }

          .hiw-process-grid {
            grid-template-columns: 1fr;
            gap: 14px;
          }

          .hiw-step-card {
            padding: 20px;
          }

          .hiw-visual {
            height: 170px;
          }

          .hiw-step-content p {
            min-height: 0;
            font-size: 12px;
          }

          .hiw-step-content h4 {
            font-size: 17px;
          }

          .hiw-create-banner {
            align-items: flex-start;
            flex-direction: column;
            gap: 15px;
            margin-top: 45px;
            padding: 22px;
          }

          .hiw-create-icon {
            width: 48px;
            height: 48px;
          }

          .hiw-create-button {
            width: 100%;
          }

          .hiw-footer {
            align-items: flex-start;
            flex-direction: column;
          }

          .hiw-footer-chains {
            justify-content: flex-start;
            gap: 13px 17px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hiw-section *,
          .hiw-section *::before,
          .hiw-section *::after {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: .01ms !important;
          }

          .hiw-visible .hiw-step-card {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
