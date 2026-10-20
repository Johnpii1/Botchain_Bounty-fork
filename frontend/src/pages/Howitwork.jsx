import { useEffect, useRef, useState } from "react";
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
import PolkadotLogo from "../assets/images/pok.png";
import ArcLogo from "../assets/images/arc.png";
import BotchainLogo from "../assets/images/bot.png";

import happyBountyVideo from "../Video/happy-demo.mp4";

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeChain, setActiveChain] = useState("Arc");
  const [dark, setDark] = useState(true);

  const chains = [
    {
      name: "Arc",
      symbol: "USDC",
      description: "Explore bounty opportunities in the Arc ecosystem.",
      color: "#00D6A0",
      img: ArcLogo,
    },
    {
      name: "Botchain",
      symbol: "BOT",
      description: "Explore bounty opportunities in the Botchain ecosystem.",
      color: "#00D6A0",
      img: BotchainLogo,
    },
    {
      name: "Portaldot",
      symbol: "DOT",
      description: "Explore bounty opportunities in the Portaldot ecosystem.",
      color: "#C9B7FF",
      img: PolkadotLogo,
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
    },
    {
      number: "02",
      title: "Connect & Contribute",
      description:
        "Connect your wallet, choose a bounty, and complete the task according to the creator's requirements.",
      icon: <FiUsers />,
      tag: "PUT YOUR SKILLS TO WORK",
    },
    {
      number: "03",
      title: "Get Your Work Approved",
      description:
        "Submit your work for review. The bounty creator checks your contribution before approving it.",
      icon: <FiCheckCircle />,
      tag: "SHOW WHAT YOU CAN DO",
    },
    {
      number: "04",
      title: "Earn Rewards",
      description:
        "Receive your reward after approval, build your reputation, and discover your next opportunity.",
      icon: <FiTrendingUp />,
      tag: "TURN WORK INTO REWARDS",
    },
  ];

  const selectedChain =
    chains.find((chain) => chain.name === activeChain) || chains[0];

  useEffect(() => {
    const updateTheme = () => {
      const root = document.documentElement;
      const body = document.body;

      setDark(
        root.classList.contains("dark") ||
          body.classList.contains("dark") ||
          root.getAttribute("data-theme") === "dark" ||
          body.getAttribute("data-theme") === "dark",
      );
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    const options = {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    };

    observer.observe(document.documentElement, options);
    observer.observe(document.body, options);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    if (typeof IntersectionObserver === "undefined") {
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
              <FiCheckCircle /> Multiple ecosystems
            </span>
            <span>
              <FiShield /> Wallet-based participation
            </span>
            <span>
              <FiZap /> Reward-driven tasks
            </span>
          </div>
        </header>

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
              >
                <div className="hiw-chain-card-top">
                  <span className="hiw-chain-icon">
                    {chain.img ? (
                      <img
                        src={chain.img}
                        alt={`${chain.name} logo`}
                        className="hiw-chain-logo"
                      />
                    ) : (
                      chain.icon
                    )}
                  </span>

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
            <div className="hiw-selected-network-copy">
              <span>SELECTED ECOSYSTEM</span>

              <img
                src={ArcLogo}
                alt="Arc logo"
                className="hiw-selected-network-icon size-12 object-contain my-3"
                style={{ "--chain-color": selectedChain.color }}
              />

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

              <div className="hiw-visual">
                {index === 0 && (
                  <>
                    <div className="hiw-orbit hiw-orbit-a" />
                    <div className="hiw-orbit hiw-orbit-b" />

                    <div className="hiw-visual-card">
                      <div className="hiw-window-dots">
                        <i />
                        <i />
                        <i />
                      </div>

                      <div className="hiw-mini-row">
                        <span className="hiw-mini-icon">
                          <FiCode />
                        </span>
                        <span className="hiw-mini-lines">
                          <i />
                          <i />
                        </span>
                        <FiChevronRight />
                      </div>

                      <div className="hiw-mini-row">
                        <span className="hiw-mini-icon">
                          <FiZap />
                        </span>
                        <span className="hiw-mini-lines">
                          <i />
                          <i />
                        </span>
                        <FiChevronRight />
                      </div>
                    </div>

                    <span className="hiw-floating-icon hiw-floating-one">
                      <FiTarget />
                    </span>
                    <span className="hiw-floating-icon hiw-floating-two">
                      <FiStar />
                    </span>
                  </>
                )}

                {index === 1 && (
                  <>
                    <div className="hiw-connect-line hiw-line-one" />
                    <div className="hiw-connect-line hiw-line-two" />

                    <div className="hiw-connect-center">
                      <FiGlobe />
                    </div>

                    <div className="hiw-connect-node hiw-node-one">
                      <FiUserPlus />
                    </div>
                    <div className="hiw-connect-node hiw-node-two">
                      <FiUsers />
                    </div>
                    <div className="hiw-connect-node hiw-node-three">
                      <FiCode />
                    </div>
                  </>
                )}

                {index === 2 && (
                  <>
                    <div className="hiw-verify-ring hiw-ring-one" />
                    <div className="hiw-verify-ring hiw-ring-two" />

                    <div className="hiw-verify-card">
                      <div className="hiw-verify-card-top">
                        <span>SUBMISSION</span>
                        <span className="hiw-review-status">IN REVIEW</span>
                      </div>

                      <div className="hiw-verify-lines">
                        <i />
                        <i />
                        <i />
                      </div>

                      <div className="hiw-verify-bottom">
                        <FiShield /> Work verification
                      </div>
                    </div>

                    <div className="hiw-verify-check">
                      <FiCheck />
                    </div>
                  </>
                )}

                {index === 3 && (
                  <>
                    <div className="hiw-earn-ring hiw-earn-ring-one" />
                    <div className="hiw-earn-ring hiw-earn-ring-two" />

                    <div className="hiw-earn-card">
                      <div className="hiw-earn-dollar">$</div>
                      <div>
                        <span>BOUNTY REWARD</span>
                        <strong>USDC</strong>
                        <small>After approval</small>
                      </div>
                      <div className="hiw-earn-check">
                        <FiCheck />
                      </div>
                    </div>

                    <span className="hiw-earn-particle hiw-particle-one" />
                    <span className="hiw-earn-particle hiw-particle-two" />
                    <span className="hiw-earn-particle hiw-particle-three" />
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

        <section className="hiw-demo-section">
          <div className="hiw-demo-heading">
            <div className="hiw-section-kicker">SEE IT IN ACTION</div>
            <h3>From task to reward.</h3>
            <p>
              Watch how Happy Bounty connects task creators with contributors
              who complete tasks and earn rewards.
            </p>
          </div>

          <div className="hiw-demo-video-frame">
            <video
              className="hiw-demo-video"
              src={happyBountyVideo}
              controls
              muted
              playsInline
              preload="metadata"
              aria-label="Happy Bounty demonstration video"
            >
              Your browser does not support video playback.
            </video>
          </div>

          <div className="hiw-demo-caption">
            <span>
              <FiCheckCircle /> Discover a task
            </span>
            <FiChevronRight />
            <span>
              <FiCheckCircle /> Submit your work
            </span>
            <FiChevronRight />
            <span>
              <FiCheckCircle /> Earn your reward
            </span>
          </div>
        </section>

        <div className="hiw-create-banner">
          <div className="hiw-create-decoration hiw-decoration-one" />
          <div className="hiw-create-decoration hiw-decoration-two" />

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

          <div className="hiw-create-button">
            Explore Opportunities <FiArrowUpRight />
          </div>
        </div>

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

            <span className="hiw-footer-chain">
              <i className="hiw-usdc-dot" />
              USDC Rewards
            </span>
          </div>
        </footer>
      </div>

      <style>{`
        .hiw-section {
          --hiw-accent: #00D6A0;
          position: relative;
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
          --hiw-soft: rgba(255,255,255,.035);
          --hiw-shadow: rgba(0,0,0,.24);
          color-scheme: dark;
        }

        .hiw-light {
          --hiw-bg: #faf9f5;
          --hiw-text: #111713;
          --hiw-muted: #737b76;
          --hiw-border: rgba(20,30,25,.11);
          --hiw-card: #fff;
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
          transition: transform .3s ease, border-color .3s ease, background .3s ease;
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
          gap: 15px;
        }

        .hiw-step-card {
          min-width: 0;
          padding: 20px;
          overflow: hidden;
          border: 1px solid var(--hiw-border);
          border-radius: 20px;
          background: var(--hiw-card);
          box-shadow: 0 16px 45px var(--hiw-shadow);
          opacity: 0;
          transform: translateY(24px);
          transition: opacity .6s ease, transform .6s ease, border-color .3s ease;
          transition-delay: calc(var(--step-index) * 90ms);
        }

        .hiw-visible .hiw-step-card {
          opacity: 1;
          transform: translateY(0);
        }

        .hiw-step-card:hover {
          border-color: rgba(0,214,160,.35);
        }

        .hiw-step-top,
        .hiw-step-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .hiw-step-number {
          color: var(--hiw-muted);
          font-size: 10px;
          font-weight: 850;
          letter-spacing: .12em;
        }

        .hiw-step-mini-icon {
          display: grid;
          place-items: center;
          width: 34px;
          height: 34px;
          border: 1px solid rgba(0,214,160,.2);
          border-radius: 10px;
          background: rgba(0,214,160,.08);
          color: var(--hiw-accent);
          font-size: 17px;
        }

        .hiw-visual {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 190px;
          margin: 12px -5px;
          overflow: hidden;
          border-radius: 14px;
          background: radial-gradient(circle, rgba(0,214,160,.09), transparent 70%);
        }

        .hiw-orbit {
          position: absolute;
          width: 155px;
          height: 155px;
          border: 1px solid rgba(0,214,160,.2);
          border-radius: 50%;
          animation: hiwOrbit 15s linear infinite;
        }

        .hiw-orbit-a {
          transform: rotate(30deg) scaleY(.45);
        }

        .hiw-orbit-b {
          transform: rotate(-30deg) scaleY(.45);
          animation-direction: reverse;
        }

        .hiw-visual-card {
          position: relative;
          z-index: 1;
          width: 175px;
          padding: 12px;
          border: 1px solid var(--hiw-border);
          border-radius: 12px;
          background: var(--hiw-card);
          box-shadow: 0 12px 30px var(--hiw-shadow);
        }

        .hiw-window-dots {
          display: flex;
          gap: 4px;
          margin-bottom: 12px;
        }

        .hiw-window-dots i {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--hiw-muted);
          opacity: .6;
        }

        .hiw-mini-row {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 0;
          border-top: 1px solid var(--hiw-border);
          color: var(--hiw-muted);
          font-size: 12px;
        }

        .hiw-mini-icon {
          display: grid;
          place-items: center;
          width: 27px;
          height: 27px;
          border-radius: 7px;
          background: rgba(0,214,160,.1);
          color: var(--hiw-accent);
        }

        .hiw-mini-lines {
          display: grid;
          flex: 1;
          gap: 5px;
        }

        .hiw-mini-lines i {
          height: 4px;
          border-radius: 4px;
          background: var(--hiw-border);
        }

        .hiw-mini-lines i:first-child {
          width: 75%;
        }

        .hiw-mini-lines i:last-child {
          width: 45%;
        }

        .hiw-floating-icon {
          position: absolute;
          display: grid;
          place-items: center;
          width: 32px;
          height: 32px;
          border: 1px solid rgba(0,214,160,.25);
          border-radius: 10px;
          background: var(--hiw-card);
          color: var(--hiw-accent);
          animation: hiwFloat 3s ease-in-out infinite;
        }

        .hiw-floating-one {
          top: 25px;
          left: 12px;
        }

        .hiw-floating-two {
          right: 12px;
          bottom: 22px;
          animation-delay: .7s;
        }

        .hiw-connect-line {
          position: absolute;
          width: 105px;
          height: 1px;
          background: rgba(0,214,160,.35);
          transform-origin: center;
        }

        .hiw-line-one {
          transform: rotate(-35deg);
        }

        .hiw-line-two {
          transform: rotate(35deg);
        }

        .hiw-connect-center,
        .hiw-connect-node {
          position: absolute;
          display: grid;
          place-items: center;
          border: 1px solid rgba(0,214,160,.25);
          border-radius: 15px;
          background: var(--hiw-card);
          color: var(--hiw-accent);
          box-shadow: 0 8px 24px var(--hiw-shadow);
        }

        .hiw-connect-center {
          width: 58px;
          height: 58px;
          font-size: 25px;
        }

        .hiw-connect-node {
          width: 38px;
          height: 38px;
          font-size: 17px;
        }

        .hiw-node-one {
          top: 20px;
          left: 30px;
        }

        .hiw-node-two {
          top: 25px;
          right: 25px;
        }

        .hiw-node-three {
          right: 45px;
          bottom: 15px;
        }

        .hiw-verify-ring,
        .hiw-earn-ring {
          position: absolute;
          width: 145px;
          height: 145px;
          border: 1px solid rgba(0,214,160,.18);
          border-radius: 50%;
        }

        .hiw-ring-one,
        .hiw-earn-ring-one {
          transform: scaleX(.55);
        }

        .hiw-ring-two,
        .hiw-earn-ring-two {
          transform: scaleY(.55);
        }

        .hiw-verify-card {
          position: relative;
          z-index: 1;
          width: 190px;
          padding: 13px;
          border: 1px solid var(--hiw-border);
          border-radius: 12px;
          background: var(--hiw-card);
          box-shadow: 0 12px 30px var(--hiw-shadow);
        }

        .hiw-verify-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 6px;
          font-size: 8px;
          font-weight: 850;
        }

        .hiw-review-status {
          color: #c6a64b;
          font-size: 7px;
        }

        .hiw-verify-lines {
          display: grid;
          gap: 7px;
          margin: 15px 0;
        }

        .hiw-verify-lines i {
          height: 5px;
          border-radius: 5px;
          background: var(--hiw-border);
        }

        .hiw-verify-lines i:last-child {
          width: 60%;
        }

        .hiw-verify-bottom {
          display: flex;
          align-items: center;
          gap: 7px;
          padding-top: 10px;
          border-top: 1px solid var(--hiw-border);
          color: var(--hiw-muted);
          font-size: 8px;
        }

        .hiw-verify-bottom svg {
          color: var(--hiw-accent);
        }

        .hiw-verify-check {
          position: absolute;
          right: 18px;
          bottom: 24px;
          z-index: 2;
          display: grid;
          place-items: center;
          width: 34px;
          height: 34px;
          border: 3px solid var(--hiw-card);
          border-radius: 50%;
          background: var(--hiw-accent);
          color: #06251c;
          animation: hiwCheckPulse 2s ease-in-out infinite;
        }

        .hiw-earn-card {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 15px;
          border: 1px solid rgba(0,214,160,.25);
          border-radius: 14px;
          background: var(--hiw-card);
          box-shadow: 0 12px 30px var(--hiw-shadow);
        }

        .hiw-earn-dollar {
          display: grid;
          place-items: center;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(0,214,160,.12);
          color: var(--hiw-accent);
          font-size: 24px;
          font-weight: 850;
        }

        .hiw-earn-card > div:nth-child(2) {
          display: grid;
          gap: 3px;
        }

        .hiw-earn-card span,
        .hiw-earn-card > div:nth-child(2) > span {
          color: var(--hiw-muted);
          font-size: 7px;
          font-weight: 850;
          letter-spacing: .08em;
        }

        .hiw-earn-card strong {
          color: var(--hiw-text);
          font-size: 16px;
        }

        .hiw-earn-card small {
          color: var(--hiw-muted);
          font-size: 8px;
        }

        .hiw-earn-check {
          display: grid;
          place-items: center;
          width: 24px;
          height: 24px;
          margin-left: auto;
          border-radius: 50%;
          background: rgba(0,214,160,.12);
          color: var(--hiw-accent);
        }

        .hiw-earn-particle {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--hiw-accent);
          animation: hiwParticle 2s ease-in-out infinite;
        }

        .hiw-particle-one {
          top: 28px;
          left: 28px;
        }

        .hiw-particle-two {
          top: 45px;
          right: 25px;
          animation-delay: .5s;
        }

        .hiw-particle-three {
          bottom: 28px;
          left: 40px;
          animation-delay: 1s;
        }

        .hiw-step-content {
          margin-top: 12px;
        }

        .hiw-step-tag {
          color: var(--hiw-accent);
          font-size: 8px;
          font-weight: 850;
          letter-spacing: .12em;
        }

        .hiw-step-content h4 {
          margin: 10px 0;
          color: var(--hiw-text);
          font-size: 16px;
          font-weight: 800;
          line-height: 1.4;
          letter-spacing: -.025em;
        }

        .hiw-step-content p {
          min-height: 92px;
          margin: 0;
          color: var(--hiw-muted);
          font-size: 11px;
          line-height: 1.8;
        }

        .hiw-step-bottom {
          margin-top: 20px;
          padding-top: 14px;
          border-top: 1px solid var(--hiw-border);
        }

        .hiw-step-bottom > span:first-child {
          color: var(--hiw-muted);
          font-size: 8px;
          font-weight: 800;
          letter-spacing: .12em;
        }

        .hiw-step-bottom-icon {
          display: grid;
          place-items: center;
          width: 28px;
          height: 28px;
          border: 1px solid var(--hiw-border);
          border-radius: 9px;
          color: var(--hiw-accent);
        }

        .hiw-demo-section {
          margin-top: 75px;
        }

        .hiw-demo-heading {
          max-width: 650px;
          margin: 0 auto 28px;
          text-align: center;
        }

        .hiw-demo-heading h3 {
          margin: 0;
          color: var(--hiw-text);
          font-size: clamp(1.6rem, 3.5vw, 2.3rem);
          font-weight: 850;
          letter-spacing: -.05em;
        }

        .hiw-demo-heading p {
          margin: 12px 0 0;
          color: var(--hiw-muted);
          font-size: 13px;
          line-height: 1.8;
        }

        .hiw-demo-video-frame {
          max-width: 1000px;
          margin: 0 auto;
          overflow: hidden;
          border: 1px solid var(--hiw-border);
          border-radius: 20px;
          background: #050807;
          box-shadow: 0 25px 70px var(--hiw-shadow);
        }

        .hiw-demo-video {
          display: block;
          width: 100%;
          max-height: 600px;
          aspect-ratio: 16 / 9;
          object-fit: contain;
          background: #050807;
        }

        .hiw-demo-caption {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 14px;
          margin-top: 18px;
        }

        .hiw-demo-caption span {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: var(--hiw-muted);
          font-size: 10px;
          font-weight: 700;
        }

        .hiw-demo-caption svg {
          color: var(--hiw-accent);
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

        .hiw-decoration-one {
          right: 90px;
          top: -120px;
        }

        .hiw-decoration-two {
          right: 30px;
          top: -90px;
          width: 130px;
          height: 130px;
        }

        .hiw-create-icon {
          position: relative;
          z-index: 1;
          display: grid;
          place-items: center;
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
          transition: transform .25s ease, box-shadow .25s ease;
        }

        .hiw-create-button:hover {
          transform: translateY(-2px);
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

        .hiw-usdc-dot {
          background: #2775ca;
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
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }

        @keyframes hiwOrbit {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes hiwParticle {
          0%, 100% {
            opacity: .25;
            transform: translate(0, 0);
          }
          50% {
            opacity: 1;
            transform: translate(8px, -9px);
          }
        }

        @keyframes hiwCheckPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.08);
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

          .hiw-demo-section {
            margin-top: 45px;
          }

          .hiw-demo-heading {
            margin-bottom: 20px;
          }

          .hiw-demo-heading p {
            font-size: 12px;
          }

          .hiw-demo-video-frame {
            border-radius: 14px;
          }

          .hiw-demo-caption {
            gap: 9px;
          }

          .hiw-demo-caption span {
            font-size: 9px;
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
