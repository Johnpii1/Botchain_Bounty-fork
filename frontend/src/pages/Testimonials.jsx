
import { useCallback, useEffect, useRef, useState } from "react";
import ArcLogo from "../assets/images/arc.png";
import BotchainLogo from "../assets/images/bot.png";

const communityUseCases = [
  {
    title: "Bounty Creator",
    role: "Project Owner",
    quote:
      "Create meaningful tasks, attract talented contributors, and reward people for work that moves your project forward.",
    initials: "BC",
    color: "#00D6A0",
  },
  {
    title: "Bounty Contributor",
    role: "Independent Contributor",
    quote:
      "Discover opportunities, complete tasks, showcase your skills, and earn rewards for the value you deliver.",
    initials: "BT",
    color: "#56D6B0",
  },
  {
    title: "Web3 Developer",
    role: "Developer",
    quote:
      "Put your technical skills to work by solving real problems and contributing to projects across the ecosystem.",
    initials: "WD",
    color: "#43BFA0",
  },
  {
    title: "Project Founder",
    role: "Startup Founder",
    quote:
      "Turn project goals into actionable bounties and connect with people who can help bring your vision to life.",
    initials: "PF",
    color: "#8CD9C3",
  },
  {
    title: "Global Contributor",
    role: "Remote Worker",
    quote:
      "Find opportunities beyond borders and contribute your skills wherever you are in the world.",
    initials: "GC",
    color: "#00A87D",
  },
  {
    title: "Community Builder",
    role: "Community Member",
    quote:
      "Help ecosystems grow by participating in initiatives, completing meaningful work, and collaborating with others.",
    initials: "CB",
    color: "#7BDCC0",
  },
  {
    title: "Creative Contributor",
    role: "Designer & Creator",
    quote:
      "Use your creative skills to help teams communicate better, build stronger brands, and deliver better experiences.",
    initials: "CC",
    color: "#42C9A4",
  },
  {
    title: "Independent Builder",
    role: "Solo Builder",
    quote:
      "Build your reputation through real contributions and discover new ways to turn your skills into opportunities.",
    initials: "IB",
    color: "#009B75",
  },
];

const networks = [
  {
    name: "Arc",
    symbol: "ARC",
    description: "Explore opportunities in the Arc ecosystem.",
    logo: ArcLogo,
  },
  {
    name: "BOTCHAIN",
    symbol: "BOT",
    description: "Contribute to projects and opportunities in BOTCHAIN.",
    logo: BotchainLogo,
  },
];

const valuePoints = [
  {
    number: "01",
    title: "Discover opportunities",
    description:
      "Explore tasks and challenges that match your skills and interests.",
  },
  {
    number: "02",
    title: "Contribute your skills",
    description:
      "Work on meaningful tasks and submit your completed contributions.",
  },
  {
    number: "03",
    title: "Earn rewards",
    description:
      "Get rewarded when your submitted work is reviewed and approved.",
  },
];

export default function Testimonials() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const [useDarkTheme, setUseDarkTheme] = useState(true);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const viewportRef = useRef(null);
  const slideRef = useRef(null);
  const [slideStep, setSlideStep] = useState(0);

  const maxSlide = Math.max(0, communityUseCases.length - visibleCount);

  const updateVisibleCount = useCallback(() => {
    if (typeof window === "undefined") return;

    if (window.innerWidth < 640) {
      setVisibleCount(1);
    } else if (window.innerWidth < 1024) {
      setVisibleCount(2);
    } else {
      setVisibleCount(3);
    }
  }, []);

  useEffect(() => {
    updateVisibleCount();

    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, [updateVisibleCount]);

  useEffect(() => {
    setActiveSlide((current) =>
      Math.min(current, Math.max(0, communityUseCases.length - visibleCount))
    );
  }, [visibleCount]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const slide = slideRef.current;

    if (!viewport || !slide) return;

    const measure = () => {
      const slideWidth = slide.getBoundingClientRect().width;
      const styles = window.getComputedStyle(slide.parentElement);
      const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;

      setSlideStep(slideWidth + gap);
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(slide);

    return () => observer.disconnect();
  }, [visibleCount]);

  const goToSlide = useCallback(
    (index) => {
      setActiveSlide(Math.max(0, Math.min(index, maxSlide)));
    },
    [maxSlide]
  );

  const nextSlide = useCallback(() => {
    setActiveSlide((current) => (current >= maxSlide ? 0 : current + 1));
  }, [maxSlide]);

  const previousSlide = useCallback(() => {
    setActiveSlide((current) => (current <= 0 ? maxSlide : current - 1));
  }, [maxSlide]);

  useEffect(() => {
    if (isPaused || maxSlide === 0) return;

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current >= maxSlide ? 0 : current + 1));
    }, 3500);

    return () => window.clearInterval(timer);
  }, [isPaused, maxSlide]);

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
    touchEndX.current = event.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchMove = (event) => {
    touchEndX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;

    if (Math.abs(distance) > 45) {
      if (distance > 0) {
        nextSlide();
      } else {
        previousSlide();
      }
    }

    setIsPaused(false);
  };

  const theme = useDarkTheme
    ? {
        background: "#080908",
        surface: "#111411",
        card: "#151A17",
        border: "rgba(255,255,255,0.09)",
        text: "#F4F7F5",
        muted: "#9AA59F",
        subtle: "#68746D",
      }
    : {
        background: "#F6F5EF",
        surface: "#FFFFFF",
        card: "#FFFFFF",
        border: "rgba(8,25,16,0.12)",
        text: "#15221B",
        muted: "#5F6C64",
        subtle: "#7B877F",
      };

  return (
    <section
      className={`hb-testimonials ${useDarkTheme ? "theme-dark" : "theme-light"}`}
      style={{
        "--hb-bg": theme.background,
        "--hb-surface": theme.surface,
        "--hb-card": theme.card,
        "--hb-border": theme.border,
        "--hb-text": theme.text,
        "--hb-muted": theme.muted,
        "--hb-subtle": theme.subtle,
        background: theme.background,
        color: theme.text,
      }}
    >
      <style>{`
        .hb-testimonials {
          width: 100%;
          overflow: hidden;
          padding: 88px 0;
          font-family: inherit;
          transition: background 0.3s ease, color 0.3s ease;
        }

        .hb-testimonials *,
        .hb-testimonials *::before,
        .hb-testimonials *::after {
          box-sizing: border-box;
        }

        .hb-container {
          width: min(1180px, calc(100% - 40px));
          margin: 0 auto;
        }

        .hb-section-heading {
          max-width: 720px;
          margin: 0 auto 42px;
          text-align: center;
        }

        .hb-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 8px 13px;
          border: 1px solid rgba(0,214,160,0.25);
          border-radius: 999px;
          color: #00D6A0;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .hb-eyebrow-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #00D6A0;
          box-shadow: 0 0 12px rgba(0,214,160,0.6);
        }

        .hb-section-title {
          margin: 20px 0 14px;
          font-size: clamp(32px, 5vw, 54px);
          line-height: 1.08;
          letter-spacing: -0.045em;
          font-weight: 750;
        }

        .hb-gradient-text {
          color: #00D6A0;
        }

        .hb-section-description {
          max-width: 620px;
          margin: 0 auto;
          color: var(--hb-muted);
          font-size: 16px;
          line-height: 1.8;
        }

        .hb-theme-toggle {
          display: flex;
          justify-content: center;
          margin: 0 0 24px;
        }

        .hb-theme-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 13px;
          color: var(--hb-muted);
          background: var(--hb-surface);
          border: 1px solid var(--hb-border);
          border-radius: 999px;
          cursor: pointer;
          font-size: 12px;
          transition: all 0.2s ease;
        }

        .hb-theme-button:hover {
          border-color: #00D6A0;
          color: #00D6A0;
        }

        .hb-carousel {
          position: relative;
          margin: 0 auto;
        }

        .hb-curve-viewport {
          width: 100%;
          overflow: hidden;
          padding: 18px 0 28px;
          touch-action: pan-y;
        }

        .hb-curve-track {
          display: flex;
          align-items: stretch;
          gap: 20px;
          will-change: transform;
          transition: transform 650ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .hb-curve-slide {
          flex: 0 0 calc((100% - 40px) / 3);
          min-width: 0;
        }

        .hb-curve-card {
          position: relative;
          display: flex;
          flex-direction: column;
          height: 100%;
          min-height: 315px;
          padding: 25px;
          overflow: hidden;
          background: var(--hb-card);
          border: 1px solid var(--hb-border);
          border-radius: 22px;
          transition:
            border-color 250ms ease,
            background 250ms ease,
            box-shadow 250ms ease,
            transform 250ms ease;
        }

        .hb-curve-card:hover {
          transform: translateY(-5px);
          border-color: rgba(0,214,160,0.4);
          box-shadow: 0 16px 40px rgba(0,214,160,0.06);
        }

        .hb-curve-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 25px;
          width: 45px;
          height: 2px;
          background: #00D6A0;
          border-radius: 999px;
        }

        .hb-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 22px;
        }

        .hb-avatar {
          display: grid;
          place-items: center;
          width: 48px;
          height: 48px;
          flex: 0 0 48px;
          border-radius: 15px;
          color: #07140F;
          font-size: 13px;
          font-weight: 800;
        }

        .hb-card-role {
          color: var(--hb-muted);
          font-size: 12px;
          text-align: right;
        }

        .hb-quote-mark {
          margin-bottom: 8px;
          color: #00D6A0;
          font-family: Georgia, serif;
          font-size: 38px;
          line-height: 0.8;
        }

        .hb-card-quote {
          flex: 1;
          margin: 0 0 24px;
          color: var(--hb-muted);
          font-size: 14px;
          line-height: 1.85;
        }

        .hb-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding-top: 17px;
          border-top: 1px solid var(--hb-border);
        }

        .hb-card-name {
          margin: 0;
          color: var(--hb-text);
          font-size: 15px;
          font-weight: 700;
        }

        .hb-card-label {
          display: block;
          margin-top: 4px;
          color: var(--hb-subtle);
          font-size: 11px;
        }

        .hb-card-index {
          color: var(--hb-subtle);
          font-size: 11px;
          letter-spacing: 0.08em;
        }

        .hb-carousel-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 18px;
          margin-top: 8px;
        }

        .hb-arrow {
          display: grid;
          place-items: center;
          width: 43px;
          height: 43px;
          color: var(--hb-text);
          background: var(--hb-surface);
          border: 1px solid var(--hb-border);
          border-radius: 50%;
          cursor: pointer;
          font-size: 20px;
          transition: all 200ms ease;
        }

        .hb-arrow:hover {
          color: #07140F;
          background: #00D6A0;
          border-color: #00D6A0;
        }

        .hb-arrow:focus-visible,
        .hb-dot:focus-visible,
        .hb-theme-button:focus-visible {
          outline: 2px solid #00D6A0;
          outline-offset: 4px;
        }

        .hb-dots {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
        }

        .hb-dot {
          width: 7px;
          height: 7px;
          padding: 0;
          background: var(--hb-subtle);
          border: 0;
          border-radius: 999px;
          cursor: pointer;
          transition: all 250ms ease;
        }

        .hb-dot.active {
          width: 23px;
          background: #00D6A0;
        }

        .hb-auto-label {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 7px;
          margin-top: 15px;
          color: var(--hb-subtle);
          font-size: 11px;
        }

        .hb-auto-indicator {
          width: 6px;
          height: 6px;
          background: #00D6A0;
          border-radius: 50%;
          animation: hb-pulse 1.6s ease-in-out infinite;
        }

        @keyframes hb-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .hb-network-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 20px;
          margin-top: 78px;
        }

        .hb-network-card {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 25px;
          background: var(--hb-surface);
          border: 1px solid var(--hb-border);
          border-radius: 20px;
          transition: border-color 200ms ease, transform 200ms ease;
        }

        .hb-network-card:hover {
          transform: translateY(-3px);
          border-color: rgba(0,214,160,0.4);
        }

        .hb-network-logo {
          display: grid;
          place-items: center;
          width: 62px;
          height: 62px;
          flex: 0 0 62px;
          padding: 10px;
          background: var(--hb-card);
          border: 1px solid var(--hb-border);
          border-radius: 16px;
        }

        .hb-network-logo img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .hb-network-name {
          margin: 0 0 5px;
          color: var(--hb-text);
          font-size: 18px;
          font-weight: 750;
        }

        .hb-network-symbol {
          margin-left: 7px;
          color: #00D6A0;
          font-size: 11px;
          font-weight: 700;
        }

        .hb-network-description {
          margin: 0;
          color: var(--hb-muted);
          font-size: 13px;
          line-height: 1.7;
        }

        .hb-value-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
          margin-top: 78px;
        }

        .hb-value-card {
          padding: 23px;
          background: transparent;
          border: 1px solid var(--hb-border);
          border-radius: 18px;
        }

        .hb-value-number {
          display: inline-block;
          margin-bottom: 24px;
          color: #00D6A0;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.1em;
        }

        .hb-value-title {
          margin: 0 0 10px;
          color: var(--hb-text);
          font-size: 17px;
          font-weight: 700;
        }

        .hb-value-description {
          margin: 0;
          color: var(--hb-muted);
          font-size: 13px;
          line-height: 1.8;
        }

        @media (max-width: 1023px) {
          .hb-curve-slide {
            flex-basis: calc((100% - 20px) / 2);
          }

          .hb-network-grid {
            margin-top: 58px;
          }

          .hb-value-grid {
            margin-top: 58px;
          }
        }

        @media (max-width: 639px) {
          .hb-testimonials {
            padding: 64px 0;
          }

          .hb-container {
            width: calc(100% - 32px);
          }

          .hb-section-heading {
            margin-bottom: 28px;
          }

          .hb-section-description {
            font-size: 14px;
          }

          .hb-curve-track {
            gap: 14px;
          }

          .hb-curve-slide {
            flex-basis: 100%;
          }

          .hb-curve-card {
            min-height: 290px;
            padding: 23px;
          }

          .hb-network-grid,
          .hb-value-grid {
            grid-template-columns: 1fr;
            gap: 14px;
            margin-top: 48px;
          }

          .hb-network-card {
            padding: 19px;
          }

          .hb-network-logo {
            width: 54px;
            height: 54px;
            flex-basis: 54px;
          }

          .hb-carousel-controls {
            gap: 14px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hb-testimonials *,
          .hb-testimonials *::before,
          .hb-testimonials *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <div className="hb-container">
        <div className="hb-section-heading">
          <div className="hb-eyebrow">
            <span className="hb-eyebrow-dot" />
            Built for contributors
          </div>

          <h2 className="hb-section-title">
            Real skills.
            <br />
            <span className="hb-gradient-text">Real opportunities.</span>
          </h2>

          <p className="hb-section-description">
            Whether you are building a project or contributing your skills,
            Happy Bounty connects meaningful work with people ready to get it
            done.
          </p>
        </div>

        <div className="hb-theme-toggle">
          <button
            type="button"
            className="hb-theme-button"
            onClick={() => setUseDarkTheme((current) => !current)}
            aria-label={`Switch to ${useDarkTheme ? "light" : "dark"} theme`}
          >
            <span aria-hidden="true">{useDarkTheme ? "☀" : "☾"}</span>
            Switch to {useDarkTheme ? "light" : "dark"} mode
          </button>
        </div>

        <div
          className="hb-carousel"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setIsPaused(false);
            }
          }}
        >
          <div
            className="hb-curve-viewport"
            ref={viewportRef}
            onTouchStart={(event) => {
              touchStartX.current = event.touches[0].clientX;
              touchEndX.current = event.touches[0].clientX;
              setIsPaused(true);
            }}
            onTouchMove={(event) => {
              touchEndX.current = event.touches[0].clientX;
            }}
            onTouchEnd={() => {
              const distance = touchStartX.current - touchEndX.current;

              if (Math.abs(distance) > 45) {
                if (distance > 0) nextSlide();
                else previousSlide();
              }

              setIsPaused(false);
            }}
          >
            <div
              className="hb-curve-track"
              style={{
                transform: `translateX(-${activeSlide * slideStep}px)`,
              }}
            >
              {communityUseCases.map((item, index) => (
                <div
                  className="hb-curve-slide"
                  key={item.title}
                  ref={index === 0 ? slideRef : null}
                >
                  <article className="hb-curve-card">
                    <div className="hb-card-top">
                      <div
                        className="hb-avatar"
                        style={{ background: item.color }}
                      >
                        {item.initials}
                      </div>
                      <span className="hb-card-role">{item.role}</span>
                    </div>

                    <div className="hb-quote-mark" aria-hidden="true">
                      “
                    </div>

                    <p className="hb-card-quote">{item.quote}</p>

                    <div className="hb-card-footer">
                      <div>
                        <h3 className="hb-card-name">{item.title}</h3>
                        <span className="hb-card-label">
                          Happy Bounty community
                        </span>
                      </div>
                      <span className="hb-card-index">
                        {String(index + 1).padStart(2, "0")} /{" "}
                        {String(communityUseCases.length).padStart(2, "0")}
                      </span>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          <div className="hb-carousel-controls">
            <button
              type="button"
              className="hb-arrow"
              onClick={previousSlide}
              aria-label="Previous community card"
            >
              &#8592;
            </button>

            <div className="hb-dots" aria-label="Choose carousel slide">
              {Array.from({ length: maxSlide + 1 }, (_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`hb-dot ${
                    activeSlide === index ? "active" : ""
                  }`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={activeSlide === index ? "true" : undefined}
                />
              ))}
            </div>

            <button
              type="button"
              className="hb-arrow"
              onClick={nextSlide}
              aria-label="Next community card"
            >
              &#8594;
            </button>
          </div>

          <div className="hb-auto-label" aria-live="polite">
            <span className="hb-auto-indicator" />
            {isPaused ? "Autoplay paused" : "Automatically rotating"}
          </div>
        </div>

        <div className="hb-network-grid">
          {networks.map((network) => (
            <article className="hb-network-card" key={network.name}>
              <div className="hb-network-logo">
                <img src={network.logo} alt={`${network.name} logo`} />
              </div>
              <div>
                <h3 className="hb-network-name">
                  {network.name}
                  <span className="hb-network-symbol">{network.symbol}</span>
                </h3>
                <p className="hb-network-description">
                  {network.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="hb-value-grid">
          {valuePoints.map((point) => (
            <article className="hb-value-card" key={point.number}>
              <span className="hb-value-number">{point.number}</span>
              <h3 className="hb-value-title">{point.title}</h3>
              <p className="hb-value-description">{point.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
