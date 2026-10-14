import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNav } from "../../hooks/useNav";
import { showToast } from "../UI/Toast";
import { useAccount } from "wagmi";

import {
  FiArrowUpRight,
  FiCalendar,
  FiCheckCircle,
  FiChevronDown,
  FiChevronUp,
  FiClock,
  FiLayers,
  FiLock,
  FiPlus,
  FiZap,
} from "react-icons/fi";

import { formatAmount } from "../../utils/format";

const BountyCard = ({
  bounty,
  enrolledBountyIds = [],
  dark = false,
}) => {
  const { handleNavigate } = useNav();
  const { address, isConnected } = useAccount();

  const [isEnrolling, setIsEnrolling] = useState(false);
  const [isEnrolledLocal, setIsEnrolledLocal] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const bountyId = bounty._id || bounty.id;

  const enrolledFromServer = enrolledBountyIds.some(
    (id) => String(id) === String(bountyId)
  );

  const isEnrolled = enrolledFromServer || isEnrolledLocal;

  const isCreator =
    Boolean(isConnected && address && bounty.creator) &&
    bounty.creator.toLowerCase() === address?.toLowerCase();

  // Theme-aware styles
  const muted = dark ? "text-white/45" : "text-[#737A75]";
  const secondary = dark ? "text-white/65" : "text-[#505852]";

  const innerSurface = dark
    ? "border-white/[0.08] bg-white/[0.025]"
    : "border-black/[0.07] bg-[#F8FAF8]";

  const subtleSurface = dark
    ? "border-white/[0.08] bg-white/[0.035]"
    : "border-black/[0.07] bg-[#F6F8F6]";

  // Derive status if the backend does not provide one
  const deriveStatus = () => {
    if (bounty.status) return bounty.status;

    if (bounty.lifecycleStatus === "completed") return "completed";
    if (bounty.lifecycleStatus === "cancelled") return "cancelled";

    const now = new Date();
    const start = bounty.startDate ? new Date(bounty.startDate) : null;
    const deadline = bounty.deadline ? new Date(bounty.deadline) : null;

    if (start && !Number.isNaN(start.getTime()) && now < start) {
      return "upcoming";
    }

    if (
      deadline &&
      !Number.isNaN(deadline.getTime()) &&
      now <= deadline
    ) {
      return "active";
    }

    if (deadline && !Number.isNaN(deadline.getTime())) {
      return "ended";
    }

    return "active";
  };

  const status = deriveStatus();

  const statusConfig = {
    active: {
      label: "Open",
      icon: FiZap,
      color: dark ? "text-[#55DDB1]" : "text-[#008F6A]",
      bg: dark ? "bg-[#00A87D]/10" : "bg-[#E6F7F0]",
      border: dark ? "border-[#00A87D]/25" : "border-[#BDEAD8]",
      dot: "bg-[#00A87D]",
    },
    upcoming: {
      label: "Upcoming",
      icon: FiClock,
      color: dark ? "text-amber-300" : "text-amber-800",
      bg: dark ? "bg-amber-400/[0.09]" : "bg-amber-50",
      border: dark ? "border-amber-300/20" : "border-amber-200",
      dot: "bg-amber-500",
    },
    ended: {
      label: "Ended",
      icon: FiLock,
      color: dark ? "text-white/50" : "text-slate-600",
      bg: dark ? "bg-white/[0.045]" : "bg-slate-100",
      border: dark ? "border-white/[0.08]" : "border-slate-200",
      dot: dark ? "bg-white/40" : "bg-slate-400",
    },
    completed: {
      label: "Completed",
      icon: FiCheckCircle,
      color: dark ? "text-[#55DDB1]" : "text-[#008F6A]",
      bg: dark ? "bg-[#00A87D]/10" : "bg-[#E6F7F0]",
      border: dark ? "border-[#00A87D]/25" : "border-[#BDEAD8]",
      dot: "bg-[#00A87D]",
    },
    cancelled: {
      label: "Cancelled",
      icon: FiLock,
      color: dark ? "text-red-300" : "text-red-700",
      bg: dark ? "bg-red-400/[0.08]" : "bg-red-50",
      border: dark ? "border-red-400/20" : "border-red-200",
      dot: "bg-red-500",
    },
  }[status] || {
    label: "Draft",
    icon: FiClock,
    color: muted,
    bg: subtleSurface,
    border: dark ? "border-white/[0.08]" : "border-black/[0.07]",
    dot: dark ? "bg-white/30" : "bg-slate-400",
  };

  const StatusIcon = statusConfig.icon;

  // Safely format the deadline
  const getDeadline = () => {
    if (!bounty.deadline) return "Not specified";

    const date = new Date(bounty.deadline);

    if (Number.isNaN(date.getTime())) return "Not specified";

    const sameYear = date.getFullYear() === new Date().getFullYear();

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      ...(sameYear ? {} : { year: "numeric" }),
    });
  };

  const getTimeRemaining = (deadlineValue) => {
    if (!deadlineValue) return null;

    const end = new Date(deadlineValue);
    if (Number.isNaN(end.getTime())) return null;

    const diffMs = end.getTime() - Date.now();

    if (diffMs <= 0) return { past: true };

    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;

    const days = Math.floor(diffMs / day);
    const hours = Math.floor((diffMs % day) / hour);
    const minutes = Math.floor((diffMs % hour) / minute);

    if (days >= 2) {
      return { label: `${days} days left`, urgent: false };
    }

    if (days === 1) {
      return { label: "1 day left", urgent: true };
    }

    if (hours >= 1) {
      return {
        label: `${hours}h ${minutes}m left`,
        urgent: true,
      };
    }

    return {
      label: `${Math.max(1, minutes)}m left`,
      urgent: true,
    };
  };

  const deadline = getDeadline();
  const timeRemaining = getTimeRemaining(bounty.deadline);

  const tags = Array.isArray(bounty.tags) ? bounty.tags : [];

  const rewardDisplay = `${formatAmount(bounty.reward)} ${
    bounty.token || "USDC"
  }`;

  const description =
    bounty.description?.trim() || "No description provided.";

  const winnerType =
    bounty.winnerType ||
    bounty.winnerSelection ||
    bounty.selectionType ||
    "";

  const formattedWinnerType = String(winnerType)
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]/g, " ")
    .trim();

  const handleEnroll = async (e) => {
    e.preventDefault();

    if (!isConnected || !address) {
      showToast.error("Please connect your wallet first");
      return;
    }

    if (isEnrolling) return;

    setIsEnrolling(true);

    const loadingToast = showToast.loading("Enrolling in bounty...");

    try {
      const response = await axios.post(`${API_URL}/user/enrollment`, {
        bountyId: bounty._id,
        user: address,
      });

      if (response.status === 200 || response.status === 201) {
        setIsEnrolledLocal(true);

        showToast.success("Enrolled! Redirecting...", {
          id: loadingToast,
          duration: 2000,
        });

        handleNavigate(`/bounty/${bountyId}`);
      }
    } catch (error) {
      console.error("Enrollment error:", error);

      showToast.error(
        error.response?.status === 400
          ? "You are already enrolled in this bounty"
          : "Failed to enroll. Please try again.",
        {
          id: loadingToast,
          duration: 3000,
        }
      );
    } finally {
      setIsEnrolling(false);
    }
  };

  const handleViewDetails = (e) => {
    e.preventDefault();
    handleNavigate(`/bounty/${bountyId}`);
  };

  return (
    <article
      className={`
        group relative flex h-full min-w-0 flex-col overflow-hidden
        rounded-[22px] border
        transition-all duration-300 ease-out
        hover:-translate-y-1
        ${
          dark
            ? "border-white/[0.08] bg-[#111713] shadow-[0_8px_28px_rgba(0,0,0,0.18)] hover:border-[#00A87D]/35 hover:shadow-[0_20px_45px_rgba(0,0,0,0.3)]"
            : "border-black/[0.07] bg-white shadow-[0_8px_28px_rgba(15,23,42,0.045)] hover:border-[#00A87D]/30 hover:shadow-[0_20px_45px_rgba(15,23,42,0.09)]"
        }
      `}
    >
      {/* Brand accent */}
      <div
        className="
          absolute inset-x-0 top-0 h-[3px]
          bg-gradient-to-r from-transparent via-[#00A87D] to-transparent
          opacity-60 transition-opacity duration-300
          group-hover:opacity-100
        "
      />

      {/* Decorative glow */}
      <div
        aria-hidden="true"
        className={`
          pointer-events-none absolute -right-20 -top-24
          h-48 w-48 rounded-full bg-[#00A87D]/10 blur-[65px]
          transition-opacity duration-500
          ${
            dark
              ? "opacity-50 group-hover:opacity-100"
              : "opacity-30 group-hover:opacity-80"
          }
        `}
      />

      <div className="relative z-10 flex h-full min-w-0 flex-col p-5 sm:p-6">
        {/* Category and status */}
        <div className="mb-5 flex min-w-0 items-center justify-between gap-3">
          <div
            className={`
              inline-flex min-w-0 max-w-[58%] items-center gap-2
              rounded-lg border px-2.5 py-2
              ${innerSurface}
            `}
          >
            <FiLayers className="shrink-0 text-sm text-[#00A87D]" />

            <span
              className={`truncate text-[10px] font-bold uppercase tracking-[0.12em] ${secondary}`}
              title={bounty.category || "Uncategorized"}
            >
              {bounty.category || "Uncategorized"}
            </span>
          </div>

          <div
            className={`
              inline-flex shrink-0 items-center gap-1.5
              rounded-full border px-2.5 py-1.5
              ${statusConfig.bg} ${statusConfig.border}
            `}
          >
            <span className="relative flex h-1.5 w-1.5">
              {status === "active" && (
                <span className="absolute inset-0 animate-ping rounded-full bg-[#00A87D] opacity-50" />
              )}

              <span
                className={`relative h-1.5 w-1.5 rounded-full ${statusConfig.dot}`}
              />
            </span>

            <span
              className={`text-[10px] font-bold tracking-wide ${statusConfig.color}`}
            >
              {statusConfig.label}
            </span>
          </div>
        </div>

        {/* Title */}
        <Link
          to={`/bounty/${bountyId}`}
          onClick={handleViewDetails}
          className="block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A87D]"
        >
          <h3
            className={`
              line-clamp-2 min-h-[3.4rem]
              text-[19px] font-extrabold leading-[1.4]
              tracking-[-0.035em] transition-colors duration-200
              ${
                dark
                  ? "text-white group-hover:text-[#55DDB1]"
                  : "text-[#171A17] group-hover:text-[#008F6A]"
              }
              sm:text-xl
            `}
          >
            {bounty.title || "Untitled bounty"}
          </h3>
        </Link>

        {/* Description with show more */}
        <div className="mt-3">
          <p
            className={`
              whitespace-pre-wrap break-words text-sm leading-6
              ${secondary}
              ${showDescription ? "" : "line-clamp-3"}
            `}
          >
            {description}
          </p>

          {description.length > 130 && (
            <button
              type="button"
              onClick={() => setShowDescription((value) => !value)}
              aria-expanded={showDescription}
              className={`
                mt-1.5 inline-flex items-center gap-1
                text-xs font-bold transition-colors
                ${
                  dark
                    ? "text-[#55DDB1] hover:text-[#00C995]"
                    : "text-[#008F6A] hover:text-[#00A87D]"
                }
              `}
            >
              {showDescription ? "Show less" : "Read more"}

              {showDescription ? (
                <FiChevronUp size={13} />
              ) : (
                <FiChevronDown size={13} />
              )}
            </button>
          )}
        </div>

        {/* Tags */}
        <div className="mt-4 flex min-h-[28px] flex-wrap items-start gap-1.5">
          {tags.slice(0, 3).map((tag, index) => (
            <span
              key={`${tag}-${index}`}
              className={`
                max-w-full truncate rounded-md border px-2.5 py-1
                text-[10px] font-semibold
                ${
                  dark
                    ? "border-white/[0.09] bg-white/[0.035] text-white/55"
                    : "border-black/[0.07] bg-[#F7F9F7] text-[#69716B]"
                }
              `}
              title={tag}
            >
              #{tag}
            </span>
          ))}

          {tags.length > 3 && (
            <span
              className={`
                rounded-md border px-2.5 py-1 text-[10px] font-bold
                ${
                  dark
                    ? "border-[#00A87D]/20 bg-[#00A87D]/[0.08] text-[#55DDB1]"
                    : "border-[#BDEAD8] bg-[#E6F7F0] text-[#008F6A]"
                }
              `}
            >
              +{tags.length - 3}
            </span>
          )}
        </div>

        {/* Reward and deadline panel */}
        <div
          className={`
            mt-5 grid grid-cols-2 overflow-hidden rounded-2xl border
            ${innerSurface}
          `}
        >
          {/* Reward */}
          <div className="min-w-0 p-4">
            <div className={`mb-2 flex items-center gap-1.5 ${muted}`}>
              <FiZap className="text-xs text-[#00A87D]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.13em]">
                Bounty reward
              </span>
            </div>

            <p
              className={`
                break-words text-lg font-black leading-tight tracking-[-0.04em]
                ${dark ? "text-white" : "text-[#171A17]"}
              `}
              title={rewardDisplay}
            >
              {rewardDisplay}
            </p>

            <p className={`mt-1.5 text-[10px] ${muted}`}>
              Reward offered
            </p>
          </div>

          {/* Deadline */}
          <div
            className={`
              min-w-0 border-l p-4
              ${dark ? "border-white/[0.08]" : "border-black/[0.07]"}
            `}
          >
            <div className={`mb-2 flex items-center gap-1.5 ${muted}`}>
              <FiCalendar className="text-xs text-[#00A87D]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.13em]">
                Deadline
              </span>
            </div>

            <p
              className={`
                truncate text-sm font-bold
                ${dark ? "text-white/85" : "text-[#343B35]"}
              `}
              title={deadline}
            >
              {deadline}
            </p>

            {timeRemaining?.label ? (
              <p
                className={`
                  mt-1.5 text-[10px] font-semibold
                  ${
                    timeRemaining.urgent
                      ? dark
                        ? "text-amber-300"
                        : "text-amber-600"
                      : dark
                        ? "text-[#55DDB1]"
                        : "text-[#008F6A]"
                  }
                `}
              >
                {timeRemaining.label}
              </p>
            ) : timeRemaining?.past &&
              status !== "completed" &&
              status !== "cancelled" ? (
              <p className={`mt-1.5 text-[10px] ${muted}`}>
                Deadline passed
              </p>
            ) : (
              <p className={`mt-1.5 text-[10px] ${muted}`}>
                Closing date
              </p>
            )}
          </div>
        </div>

        {/* Bounty reference and winner type */}
        <div
          className={`
            mt-3 flex min-w-0 items-center justify-between gap-3
            rounded-xl border px-3 py-3
            ${subtleSurface}
          `}
        >
          <div className="flex min-w-0 items-center gap-2">
            <FiLayers className="shrink-0 text-[#00A87D]" size={15} />

            <div className="min-w-0">
              <p
                className={`text-[10px] font-semibold uppercase tracking-wider ${muted}`}
              >
                Bounty reference
              </p>

              <p
                className={`mt-1 truncate text-xs font-bold ${secondary}`}
                title={String(bountyId || "Not available")}
              >
                {bountyId
                  ? `#${String(bountyId).slice(-8)}`
                  : "Not available"}
              </p>
            </div>
          </div>

          {winnerType && (
            <div
              className={`
                flex min-w-0 items-center gap-2 rounded-lg border
                px-2.5 py-2
                ${
                  dark
                    ? "border-[#00A87D]/20 bg-[#00A87D]/[0.08]"
                    : "border-[#BDEAD8] bg-[#E6F7F0]"
                }
              `}
              title={`Winner type: ${formattedWinnerType}`}
            >
              <FiCheckCircle
                className="shrink-0 text-[#00A87D]"
                size={13}
              />

              <span
                className={`
                  truncate text-[10px] font-bold
                  ${dark ? "text-[#55DDB1]" : "text-[#008F6A]"}
                `}
              >
                {formattedWinnerType}
              </span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-auto grid grid-cols-2 gap-2.5 pt-5">
          <Link
            to={`/bounty/${bountyId}`}
            onClick={handleViewDetails}
            className={`
              group/details inline-flex min-w-0 items-center
              justify-center gap-2 rounded-xl border
              px-3 py-3 text-xs font-bold transition-all duration-200
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-[#00A87D]
              sm:text-sm
              ${
                dark
                  ? "border-white/[0.10] bg-white/[0.025] text-white/75 hover:border-[#00A87D]/40 hover:bg-[#00A87D]/[0.08] hover:text-[#55DDB1]"
                  : "border-black/[0.08] bg-white text-[#424943] hover:border-[#00A87D]/35 hover:bg-[#F0FAF6] hover:text-[#008F6A]"
              }
            `}
          >
            <span className="truncate">View details</span>

            <FiArrowUpRight
              size={14}
              className="shrink-0 transition-transform group-hover/details:-translate-y-0.5 group-hover/details:translate-x-0.5"
            />
          </Link>

          {/* Creator action */}
          {isCreator ? (
            <Link
              to={`/bounty/${bountyId}`}
              onClick={handleViewDetails}
              className="
                inline-flex min-w-0 items-center justify-center gap-2
                rounded-xl bg-[#00A87D] px-3 py-3
                text-xs font-extrabold text-white
                transition-all duration-200
                hover:-translate-y-0.5 hover:bg-[#008F6A]
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-[#00A87D] focus-visible:ring-offset-2
                sm:text-sm
              "
            >
              <FiLayers className="shrink-0" />
              <span className="truncate">Manage</span>
            </Link>
          ) : isEnrolled ? (
            <div
              className={`
                inline-flex min-w-0 items-center justify-center gap-1.5
                rounded-xl border px-3 py-3
                text-xs font-bold sm:text-sm
                ${
                  dark
                    ? "border-[#00A87D]/25 bg-[#00A87D]/[0.09] text-[#55DDB1]"
                    : "border-[#BDEAD8] bg-[#E6F7F0] text-[#008F6A]"
                }
              `}
              aria-label="You are enrolled in this bounty"
            >
              <FiCheckCircle className="shrink-0" />
              <span className="truncate">Enrolled</span>
            </div>
          ) : status === "active" ? (
            <button
              type="button"
              onClick={handleEnroll}
              disabled={isEnrolling}
              aria-busy={isEnrolling}
              className="
                inline-flex min-w-0 items-center justify-center gap-2
                rounded-xl bg-[#00A87D] px-3 py-3
                text-xs font-extrabold text-white
                transition-all duration-200
                hover:-translate-y-0.5 hover:bg-[#008F6A]
                hover:shadow-[0_8px_20px_rgba(0,168,125,0.18)]
                active:scale-[0.98]
                disabled:cursor-not-allowed disabled:opacity-55
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-[#00A87D] focus-visible:ring-offset-2
                sm:text-sm
              "
            >
              {isEnrolling ? (
                <>
                  <span className="h-3.5 w-3.5 shrink-0 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  <span className="truncate">Joining...</span>
                </>
              ) : (
                <>
                  <FiPlus className="shrink-0" />
                  <span className="truncate">Join bounty</span>
                </>
              )}
            </button>
          ) : (
            <div
              className={`
                inline-flex min-w-0 items-center justify-center gap-1.5
                rounded-xl border px-3 py-3
                text-xs font-bold sm:text-sm
                ${
                  dark
                    ? "border-white/[0.08] bg-white/[0.035] text-white/35"
                    : "border-black/[0.07] bg-[#F4F6F4] text-slate-400"
                }
              `}
            >
              <StatusIcon className="shrink-0" />

              <span className="truncate">
                {status === "completed"
                  ? "Completed"
                  : status === "cancelled"
                    ? "Cancelled"
                    : status === "ended"
                      ? "Ended"
                      : "Coming soon"}
              </span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default BountyCard;