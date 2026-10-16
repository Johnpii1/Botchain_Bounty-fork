
import React from "react";
import { FiArrowUpRight } from "react-icons/fi";

import dotLogo from "../assets/images/pok.png";
import botLogo from "../assets/images/bot.png";
import arcLogo from "../assets/images/arc.png";

const tickerItems = [
  { name: "Polkadot", image: dotLogo, symbol: "DOT" },
  { name: "BOT", image: botLogo, symbol: "BOT" },
  { name: "Arc", image: arcLogo, symbol: "ARC" },
];

export default function SupportedNetworks({ dark = true }) {
  return (
    <section
      className={`relative overflow-hidden py-12 sm:py-16 ${
        dark ? "bg-[#080908] text-white" : "bg-[#f6f5ef] text-[#171717]"
      }`}
    >
      <style>{`
        @keyframes happyBountyTicker {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .happy-bounty-ticker-track {
          display: flex;
          width: max-content;
          animation: happyBountyTicker 32s linear infinite;
          will-change: transform;
        }

        .happy-bounty-ticker:hover .happy-bounty-ticker-track {
          animation-play-state: paused;
        }

        .happy-bounty-ticker-group {
          display: flex;
          flex: none;
          align-items: center;
        }

        .happy-bounty-ticker-item {
          display: flex;
          flex: none;
          align-items: center;
          gap: 12px;
          padding: 0 28px;
          white-space: nowrap;
        }

        /* Desktop: narrower ticker with consistent spacing */
        @media (min-width: 1024px) {
          .happy-bounty-ticker-item {
            gap: 16px;
            padding-left: 32px;
            padding-right: 32px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .happy-bounty-ticker-track {
            animation: none;
            transform: none;
          }
        }
      `}</style>

      {/* Subtle background accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-40 w-[70%] -translate-x-1/2 rounded-full opacity-[0.07] blur-3xl"
        style={{ background: "#00D6A0" }}
      />

      {/* Heading */}
      <div className="relative mx-auto mb-8 max-w-7xl px-5 text-center sm:mb-10 sm:px-8">
        <div
          className={`mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${
            dark
              ? "border-[#00D6A0]/20 bg-[#00D6A0]/[0.07] text-[#00D6A0]"
              : "border-[#008A66]/20 bg-[#00A879]/[0.07] text-[#008A66]"
          }`}
        >
          <span className="relative flex h-2 w-2">
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-50"
              style={{ background: "#00D6A0" }}
            />
            <span
              className="relative inline-flex h-2 w-2 rounded-full"
              style={{ background: "#00D6A0" }}
            />
          </span>
          Supported Ecosystem
        </div>

        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Built for{" "}
          <span style={{ color: "#00D6A0" }}>Multiple Networks</span>
        </h2>

        <p
          className={`mx-auto mt-3 max-w-xl text-sm leading-6 sm:text-base ${
            dark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Explore the networks supported by Happy Bounty and discover new
          opportunities to earn rewards.
        </p>
      </div>

      {/* Centered, narrower infinite ticker */}
      <div
        className={`happy-bounty-ticker relative mx-auto w-full overflow-hidden border-y lg:max-w-5xl lg:rounded-xl xl:max-w-6xl ${
          dark
            ? "border-white/[0.08] bg-white/[0.015]"
            : "border-black/[0.08] bg-black/[0.015]"
        }`}
        aria-label="Supported networks: Polkadot DOT, BOT, and Arc ARC"
      >
        {/* Left fade */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-24 ${
            dark
              ? "bg-gradient-to-r from-[#080908] to-transparent"
              : "bg-gradient-to-r from-[#f6f5ef] to-transparent"
          }`}
        />

        {/* Right fade */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-24 ${
            dark
              ? "bg-gradient-to-l from-[#080908] to-transparent"
              : "bg-gradient-to-l from-[#f6f5ef] to-transparent"
          }`}
        />

        <div className="happy-bounty-ticker-track py-5 sm:py-6">
          {/* First sequence */}
          <div className="happy-bounty-ticker-group">
            {tickerItems.map((item) => (
              <div
                key={item.symbol}
                className="happy-bounty-ticker-item"
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border p-2 sm:h-12 sm:w-12 ${
                    dark
                      ? "border-white/10 bg-white/[0.04]"
                      : "border-black/10 bg-white/70"
                  }`}
                >
                  <img
                    src={item.image}
                    alt={`${item.name} logo`}
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                </div>

                <div className="flex flex-col">
                  <span className="text-sm font-semibold sm:text-base">
                    {item.name}
                  </span>
                  <span className="mt-0.5 text-xs font-medium tracking-wider text-gray-500">
                    {item.symbol}
                  </span>
                </div>

                <span
                  aria-hidden="true"
                  className={`ml-3 h-1.5 w-1.5 shrink-0 rounded-full sm:ml-5 ${
                    dark ? "bg-white/20" : "bg-black/20"
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Second identical sequence for seamless looping */}
          <div className="happy-bounty-ticker-group" aria-hidden="true">
            {tickerItems.map((item) => (
              <div
                key={item.symbol}
                className="happy-bounty-ticker-item"
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border p-2 sm:h-12 sm:w-12 ${
                    dark
                      ? "border-white/10 bg-white/[0.04]"
                      : "border-black/10 bg-white/70"
                  }`}
                >
                  <img
                    src={item.image}
                    alt=""
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                </div>

                <div className="flex flex-col">
                  <span className="text-sm font-semibold sm:text-base">
                    {item.name}
                  </span>
                  <span className="mt-0.5 text-xs font-medium tracking-wider text-gray-500">
                    {item.symbol}
                  </span>
                </div>

                <span
                  className={`ml-3 h-1.5 w-1.5 shrink-0 rounded-full sm:ml-5 ${
                    dark ? "bg-white/20" : "bg-black/20"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer text */}
      <div
        className={`mt-5 flex items-center justify-center gap-2 px-5 text-xs ${
          dark ? "text-gray-500" : "text-gray-500"
        }`}
      >
        <span>More opportunities.</span>
        <span style={{ color: "#00D6A0" }}>One ecosystem.</span>
        <FiArrowUpRight
          className="shrink-0"
          style={{ color: "#00D6A0" }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
