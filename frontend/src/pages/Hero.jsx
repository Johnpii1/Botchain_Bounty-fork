import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNav } from "../hooks/useNav";
import { FiArrowUpRight, FiCheckCircle, FiCpu, FiLayers, FiZap } from "react-icons/fi";

const heroMessages = [
  "Earn USDC.",
  "Complete Quests.",
  "Build Your Skills.",
  "Get Rewarded.",
];

// Official BOT Chain ecosystem artwork from botchain.ai.
const BOT_CHAIN_HALO = "https://www.botchain.ai/favicon.ico";

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
      }, isDeleting ? 42 : 78);
    }
    return () => clearTimeout(timer);
  }, [displayText, heroText, isDeleting]);

  useEffect(() => {
    const visual = visualRef.current;
    if (!visual || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const handleMove = (event) => {
      const bounds = visual.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      visual.style.setProperty("--tilt-x", `${y * -5}deg`);
      visual.style.setProperty("--tilt-y", `${x * 5}deg`);
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
      className={`bot-hero relative isolate w-full overflow-hidden transition-colors duration-500 ${dark ? "bg-[#080B0D] text-white" : "bg-[#F3F5F3] text-[#111916]"}`}
    >
      <div className="bot-hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="bot-hero-glow bot-hero-glow-one pointer-events-none absolute" aria-hidden="true" />
      <div className="bot-hero-glow bot-hero-glow-two pointer-events-none absolute" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid min-h-[650px] w-full max-w-7xl items-center gap-7 px-5 pb-14 pt-28 sm:px-8 sm:pb-16 sm:pt-32 lg:min-h-[720px] lg:grid-cols-[0.95fr_1.05fr] lg:gap-5 lg:px-10 lg:pt-28">
        <div className="mx-auto w-full max-w-2xl text-center sm:text-left">
          <div className={`mb-6 inline-flex items-center gap-2.5 rounded-full border px-4 py-2 text-xs font-semibold tracking-wide backdrop-blur-xl ${dark ? "border-[#00D6A0]/25 bg-white/[0.035] text-white/90" : "border-[#00A87D]/25 bg-white/80 text-[#18251F] shadow-sm"}`}>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00D6A0] opacity-40" />
              <span className="relative h-2 w-2 rounded-full bg-[#00D6A0]" />
            </span>
            Built for BOT Chain
          </div>

          <div className="space-y-0">
            <h1 className={`text-4xl font-extrabold leading-[0.98] tracking-[-0.055em] sm:text-5xl md:text-6xl lg:text-[4.35rem] ${dark ? "text-white" : "text-[#111916]"}`}>Make a</h1>
            <h1 className={`text-4xl font-extrabold leading-[0.98] tracking-[-0.055em] sm:text-5xl md:text-6xl lg:text-[4.35rem] ${dark ? "text-white" : "text-[#111916]"}`}>living from</h1>
            <div className="mt-2 flex min-h-[54px] min-w-0 items-center justify-center overflow-hidden sm:min-h-[66px] sm:justify-start md:min-h-[78px]">
              <div className="flex max-w-full min-w-0 items-center whitespace-nowrap text-3xl font-extrabold leading-none tracking-[-0.045em] sm:text-4xl md:text-6xl lg:text-[4.1rem]">
                <span className="bot-hero-type-text">{displayText}</span>
                <span className="ml-1 inline-block h-[0.8em] w-[3px] shrink-0 rounded-full bg-[#00D6A0]" />
              </div>
            </div>
          </div>

          <p className={`mx-auto mt-5 max-w-xl text-sm font-medium leading-7 sm:mx-0 sm:text-base ${dark ? "text-white/60" : "text-[#4C5A53]"}`}>
            Complete quests and earn USDC, tokens, and digital rewards. Post bounties and get quality work done — fully on-chain.
          </p>

          <div className="mt-7 flex w-full flex-wrap justify-center gap-3 sm:justify-start">
            <Link
              to="/dashboard"
              onClick={(event) => { event.preventDefault(); handleNavigate("/dashboard"); }}
              className="bot-hero-primary group inline-flex items-center justify-center gap-2 rounded-xl bg-[#00D6A0] px-6 py-3.5 text-sm font-bold text-[#06251C] shadow-[0_10px_30px_rgba(0,214,160,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#24E6B4] hover:shadow-[0_14px_36px_rgba(0,214,160,0.24)]"
            >
              Explore Bounties <FiArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/create"
              onClick={(event) => { event.preventDefault(); handleNavigate("/create"); }}
              className={`group inline-flex items-center justify-center gap-2 rounded-xl border px-6 py-3.5 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 ${dark ? "border-white/15 bg-white/[0.035] text-white hover:border-[#00D6A0]/60 hover:text-[#00D6A0]" : "border-black/10 bg-white/80 text-[#17211C] shadow-sm hover:border-[#00A87D]/50 hover:text-[#008A66]"}`}
            >
              Create a Bounty <FiArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="mt-7 flex items-center justify-center gap-3 sm:justify-start">
            <div className="flex gap-1.5" aria-label={`Headline ${heroText + 1} of ${heroMessages.length}`}>
              {heroMessages.map((message, index) => (
                <span key={message} className={`h-1.5 rounded-full transition-all duration-500 ${index === heroText ? "w-7 bg-[#00D6A0] shadow-[0_0_12px_rgba(0,214,160,0.3)]" : dark ? "w-1.5 bg-white/20" : "w-1.5 bg-black/15"}`} />
              ))}
            </div>
            <span className={`text-[11px] font-semibold ${dark ? "text-white/45" : "text-[#6C7771]"}`}>New opportunities every day</span>
          </div>
        </div>

        <div ref={visualRef} className="bot-hero-visual relative mx-auto flex min-h-[370px] w-full max-w-[590px] items-center justify-center sm:min-h-[480px] lg:min-h-[560px]" aria-label="BOT Chain ecosystem-inspired visual">
          <div className="bot-hero-visual-scene relative flex h-[370px] w-full items-center justify-center sm:h-[480px] lg:h-[540px]">
            <div className="bot-hero-orbit bot-hero-orbit-one" aria-hidden="true" />
            <div className="bot-hero-orbit bot-hero-orbit-two" aria-hidden="true" />
            <div className="bot-hero-halo-wrap" aria-hidden="true">
              <img src={BOT_CHAIN_HALO} alt="" className="bot-hero-halo" />
            </div>
            <div className={`bot-hero-core relative z-10 flex h-40 w-40 items-center justify-center rounded-full border backdrop-blur-xl sm:h-48 sm:w-48 ${dark ? "border-white/10 bg-[#0B1513]/75 shadow-[0_0_90px_rgba(0,214,160,0.12)]" : "border-white/80 bg-white/65 shadow-[0_18px_70px_rgba(10,70,48,0.12)]"}`}>
              <div className="text-center">
                <FiCpu className="mx-auto mb-3 h-8 w-8 text-[#00D6A0]" />
                <span className={`block text-lg font-extrabold tracking-tight ${dark ? "text-white" : "text-[#13231B]"}`}>BOT Chain</span>
                <span className={`mt-1 block text-[10px] font-semibold uppercase tracking-[0.2em] ${dark ? "text-white/45" : "text-[#64746A]"}`}>Ecosystem</span>
              </div>
            </div>

            <div className={`bot-hero-float-card bot-hero-float-card-top ${dark ? "border-white/10 bg-[#111917]/90 text-white" : "border-white/80 bg-white/90 text-[#15231C]"}`}>
              <span className="bot-hero-card-icon"><FiLayers /></span>
              <span><strong>Open opportunities</strong><small>Tasks from the community</small></span>
            </div>
            <div className={`bot-hero-float-card bot-hero-float-card-bottom ${dark ? "border-white/10 bg-[#111917]/90 text-white" : "border-white/80 bg-white/90 text-[#15231C]"}`}>
              <span className="bot-hero-card-icon"><FiCheckCircle /></span>
              <span><strong>Work gets rewarded</strong><small>Contribute. Submit. Earn.</small></span>
            </div>
            <div className="bot-hero-chip bot-hero-chip-left"><FiZap /><span>BOT Chain</span></div>
            <span className="bot-hero-node bot-hero-node-one" aria-hidden="true" />
            <span className="bot-hero-node bot-hero-node-two" aria-hidden="true" />
            <span className="bot-hero-node bot-hero-node-three" aria-hidden="true" />
          </div>
        </div>
      </div>

      <style>{`
        .bot-hero-grid {
          opacity: ${dark ? "0.20" : "0.14"};
          background-image: linear-gradient(to right, ${dark ? "rgba(255,255,255,.045)" : "rgba(15,55,38,.06)"} 1px, transparent 1px), linear-gradient(to bottom, ${dark ? "rgba(255,255,255,.045)" : "rgba(15,55,38,.06)"} 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: linear-gradient(to bottom, black, transparent 92%);
        }
        .bot-hero-glow { width: 26rem; height: 26rem; border-radius: 999px; filter: blur(100px); opacity: ${dark ? ".10" : ".12"}; background: #00D6A0; }
        .bot-hero-glow-one { top: 5rem; right: -12rem; }
        .bot-hero-glow-two { bottom: -18rem; left: -12rem; opacity: .06; }
        .bot-hero-type-text { color: #00D6A0; }
        .bot-hero-visual { perspective: 1200px; --tilt-x: 0deg; --tilt-y: 0deg; }
        .bot-hero-visual-scene { transform: rotateX(var(--tilt-x)) rotateY(var(--tilt-y)); transform-style: preserve-3d; transition: transform 500ms cubic-bezier(.16,1,.3,1); }
        .bot-hero-halo-wrap { position:absolute; width:min(105%, 570px); aspect-ratio:1; display:flex; align-items:center; justify-content:center; animation: botHaloFloat 8s ease-in-out infinite; pointer-events:none; }
        .bot-hero-halo { width:100%; height:100%; object-fit:contain; opacity:${dark ? ".78" : ".58"}; filter:saturate(.88) drop-shadow(0 0 34px rgba(0,214,160,.13)); mix-blend-mode:${dark ? "screen" : "multiply"}; }
        .bot-hero-orbit { position:absolute; border:1px solid ${dark ? "rgba(0,214,160,.23)" : "rgba(0,137,99,.17)"}; border-radius:50%; transform:rotate(-24deg); pointer-events:none; }
        .bot-hero-orbit-one { width:82%; height:42%; animation:botOrbit 20s linear infinite; }
        .bot-hero-orbit-two { width:68%; height:62%; transform:rotate(38deg); border-color:${dark ? "rgba(255,255,255,.10)" : "rgba(10,70,48,.10)"}; animation:botOrbitReverse 26s linear infinite; }
        .bot-hero-core { box-shadow:inset 0 0 35px rgba(0,214,160,.04); animation:botCoreFloat 6s ease-in-out infinite; }
        .bot-hero-float-card { position:absolute; z-index:20; display:flex; align-items:center; gap:10px; max-width:245px; padding:12px 14px; border:1px solid; border-radius:16px; box-shadow:0 18px 48px rgba(0,0,0,.12); backdrop-filter:blur(16px); animation:botCardFloat 6s ease-in-out infinite; }
        .bot-hero-float-card strong { display:block; font-size:12px; font-weight:800; letter-spacing:-.01em; }
        .bot-hero-float-card small { display:block; margin-top:3px; font-size:10px; opacity:.58; white-space:nowrap; }
        .bot-hero-card-icon { display:flex; width:34px; height:34px; flex:0 0 34px; align-items:center; justify-content:center; border-radius:11px; background:rgba(0,214,160,.12); color:#00D6A0; font-size:16px; }
        .bot-hero-float-card-top { top:17%; right:0; animation-delay:-1.5s; }
        .bot-hero-float-card-bottom { bottom:17%; left:0; animation-delay:-3.2s; }
        .bot-hero-chip { position:absolute; z-index:20; left:6%; top:25%; display:flex; align-items:center; gap:7px; padding:9px 12px; border:1px solid rgba(0,214,160,.25); border-radius:999px; background:${dark ? "rgba(9,19,16,.88)" : "rgba(255,255,255,.88)"}; color:#00A87D; font-size:10px; font-weight:800; letter-spacing:.06em; box-shadow:0 10px 30px rgba(0,0,0,.08); backdrop-filter:blur(12px); }
        .bot-hero-node { position:absolute; z-index:5; width:6px; height:6px; border-radius:50%; background:#00D6A0; box-shadow:0 0 18px rgba(0,214,160,.7); animation:botNodePulse 3.4s ease-in-out infinite; }
        .bot-hero-node-one { top:19%; left:29%; }
        .bot-hero-node-two { right:19%; bottom:25%; animation-delay:-1.2s; }
        .bot-hero-node-three { top:34%; right:13%; width:4px; height:4px; animation-delay:-2.2s; }
        @keyframes botHaloFloat { 0%,100% { transform:translateY(0) scale(1); } 50% { transform:translateY(-9px) scale(1.025); } }
        @keyframes botOrbit { from { transform:rotate(-24deg); } to { transform:rotate(336deg); } }
        @keyframes botOrbitReverse { from { transform:rotate(38deg); } to { transform:rotate(-322deg); } }
        @keyframes botCoreFloat { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-7px); } }
        @keyframes botCardFloat { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-8px); } }
        @keyframes botNodePulse { 0%,100% { opacity:.3; transform:scale(.8); } 50% { opacity:1; transform:scale(1.35); } }
        @media(max-width:640px) {
          .bot-hero-visual { min-height:340px; }
          .bot-hero-visual-scene { height:340px; }
          .bot-hero-halo-wrap { width:112%; }
          .bot-hero-float-card { max-width:205px; padding:10px; gap:8px; }
          .bot-hero-float-card strong { font-size:10px; }
          .bot-hero-float-card small { font-size:9px; }
          .bot-hero-float-card-top { top:10%; right:-1%; }
          .bot-hero-float-card-bottom { bottom:10%; left:-1%; }
          .bot-hero-chip { left:0; top:21%; font-size:9px; }
          .bot-hero-core { height:132px; width:132px; }
        }
        @media(max-width:390px) {
          .bot-hero-float-card-top { right:-2%; }
          .bot-hero-float-card-bottom { left:-2%; }
          .bot-hero-chip { left:-2%; }
        }
        @media(prefers-reduced-motion:reduce) {
          .bot-hero-grid, .bot-hero-glow, .bot-hero-halo-wrap, .bot-hero-orbit, .bot-hero-core, .bot-hero-float-card, .bot-hero-node, .bot-hero-chip { animation:none !important; }
          .bot-hero-visual-scene { transform:none !important; transition:none !important; }
        }
      `}</style>
    </section>
  );
}
