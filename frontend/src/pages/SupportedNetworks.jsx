
// import { FiArrowUpRight, FiCheckCircle } from "react-icons/fi";

// import eth2 from "../assets/images/eth2.png";
// import ctc from "../assets/images/ctc.jpg";
// import injecoin from "../assets/images/injecoin.png";

// const tickerItems = [
//   {
//     name: "Ethereum",
//     image: eth2,
//   },
//   {
//     name: "Creditcoin",
//     image: ctc,
//   },
//   {
//     name: "Injective",
//     image: injecoin,
//   },
// ];

// function TickerItem({ item }) {
//   return (
//     <div className="flex shrink-0 items-center gap-4">
//       {/* NETWORK LOGO */}
//       <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/[0.08] bg-[#0d0d0e] shadow-[0_0_25px_rgba(255,255,255,0.02)]">
//         <img
//           src={item.image}
//           alt={item.name}
//           className="h-7 w-7 object-contain"
//         />
//       </div>

//       {/* NETWORK NAME */}
//       <span className="whitespace-nowrap text-sm font-semibold tracking-[-0.01em] text-white">
//         {item.name}
//       </span>
//     </div>
//   );
// }

// export default function SupportedNetworks() {
//   return (
//     <section className="relative overflow-hidden border-y border-white/[0.06] bg-[#070708] py-4">
//       {/* =====================================================
//           BACKGROUND GLOW
//       ===================================================== */}
//       <div className="pointer-events-none absolute inset-0">
//         <div className="absolute left-[15%] top-1/2 h-24 w-72 -translate-y-1/2 rounded-full bg-[#FF1AC6]/[0.035] blur-[80px]" />

//         <div className="absolute right-[15%] top-1/2 h-24 w-72 -translate-y-1/2 rounded-full bg-purple-600/[0.035] blur-[80px]" />
//       </div>

//       {/* =====================================================
//           MAIN TICKER
//       ===================================================== */}
//       <div className="relative flex items-center">
//         {/* ===================================================
//             SECTION LABEL
//         =================================================== */}
//         <div className="relative z-20 flex shrink-0 items-center gap-2 border-r border-white/[0.08] bg-[#070708] px-5 py-3 sm:px-8">
//           {/* LIVE DOT */}
//           <span className="relative flex h-2 w-2">
//             <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF1AC6] opacity-60" />

//             <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF1AC6] shadow-[0_0_10px_rgba(255,26,198,0.9)]" />
//           </span>

//           <span className="whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-400">
//             Supported Networks
//           </span>
//         </div>

//         {/* ===================================================
//             TICKER VIEWPORT
//         =================================================== */}
//         <div className="relative min-w-0 flex-1 overflow-hidden">
//           {/* LEFT FADE */}
//           <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-[#070708] to-transparent" />

//           {/* RIGHT FADE */}
//           <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-[#070708] to-transparent" />

//           {/* MOVING TRACK */}
//           <div className="web3-ticker-track flex w-max items-center">
//             {/* FIRST SET */}
//             <div className="flex items-center gap-20 px-10">
//               {tickerItems.map((item, index) => (
//                 <div
//                   key={`first-${item.name}-${index}`}
//                   className="flex items-center gap-20"
//                 >
//                   <TickerItem item={item} />

//                   {/* SEPARATOR */}
//                   <span className="h-1 w-1 shrink-0 rounded-full bg-[#FF1AC6]/30" />
//                 </div>
//               ))}
//             </div>

//             {/* SECOND SET
//                 Keeps the ticker animation seamless */}
//             <div className="flex items-center gap-20 px-10">
//               {tickerItems.map((item, index) => (
//                 <div
//                   key={`second-${item.name}-${index}`}
//                   className="flex items-center gap-20"
//                 >
//                   <TickerItem item={item} />

//                   {/* SEPARATOR */}
//                   <span className="h-1 w-1 shrink-0 rounded-full bg-[#FF1AC6]/30" />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* ===================================================
//             STATUS
//         =================================================== */}
//         <div className="relative z-20 hidden shrink-0 items-center gap-2 border-l border-white/[0.08] bg-[#070708] px-6 py-3 lg:flex">
//           <FiCheckCircle
//             size={12}
//             className="text-[#FF1AC6]"
//           />

//           <span className="whitespace-nowrap text-[9px] uppercase tracking-[0.16em] text-gray-500">
//             Multi-Chain
//           </span>

//           <FiArrowUpRight
//             size={11}
//             className="text-gray-600"
//           />
//         </div>
//       </div>

//       {/* =====================================================
//           ANIMATION
//       ===================================================== */}
//       <style>{`
//         .web3-ticker-track {
//           animation: web3Ticker 30s linear infinite;
//           will-change: transform;
//         }

//         .web3-ticker-track:hover {
//           animation-play-state: paused;
//         }

//         @keyframes web3Ticker {
//           from {
//             transform: translateX(0);
//           }

//           to {
//             transform: translateX(-50%);
//           }
//         }

//         @media (max-width: 639px) {
//           .web3-ticker-track {
//             animation-duration: 24s;
//           }
//         }

//         @media (prefers-reduced-motion: reduce) {
//           .web3-ticker-track {
//             animation: none;
//           }
//         }
//       `}</style>
//     </section>
//   );
// }
