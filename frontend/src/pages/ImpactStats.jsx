
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const INITIAL_STATS = {
  bountiesCreated: null,
  bountiesCompleted: null,
  totalPaid: null,
  contributors: null,
};

const STAT_ITEMS = [
  {
    key: "bountiesCompleted",
    label: "Bounties Completed",
    icon: "✓",
    description: "Successfully completed tasks",
    format: (value) => Number(value).toLocaleString(),
  },
  {
    key: "totalPaid",
    label: "USDC Paid Out",
    icon: "$",
    description: "Rewards delivered to contributors",
    format: (value) =>
      `${Number(value).toLocaleString(undefined, {
        maximumFractionDigits: 2,
      })} USDC`,
  },
  {
    key: "contributors",
    label: "Contributors",
    icon: "♙",
    description: "People participating in bounties",
    format: (value) => Number(value).toLocaleString(),
  },
  {
    key: "bountiesCreated",
    label: "Bounties Created",
    icon: "✦",
    description: "Opportunities published",
    format: (value) => Number(value).toLocaleString(),
  },
];

export default function ImpactStats() {
  const [stats, setStats] = useState(INITIAL_STATS);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchStats() {
      try {
        if (!API_URL) {
          throw new Error("VITE_API_URL is not configured");
        }

        // Replace with your existing public aggregate statistics endpoint.
        const response = await fetch(`${API_URL}/bounty/stats`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Could not load platform statistics");
        }

        const data = await response.json();

        // Match these fields to your actual API response.
        const parsedStats = {
          bountiesCreated: data.bountiesCreated,
          bountiesCompleted: data.bountiesCompleted,
          totalPaid: data.totalPaid,
          contributors: data.contributors,
        };

        const validatedStats = {};

        for (const [key, value] of Object.entries(parsedStats)) {
          const number = Number(value);

          validatedStats[key] =
            value !== null &&
            value !== undefined &&
            value !== "" &&
            Number.isFinite(number) &&
            number >= 0
              ? number
              : null;
        }

        setStats(validatedStats);
        setHasError(false);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Failed to load Happy Bounty statistics:", error);
          setHasError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchStats();

    return () => controller.abort();
  }, []);

  return (
    <section
      id="impact"
      className="bg-[#f6f5ef] text-black
        transition-colors duration-300
        dark:bg-[#080908] dark:text-white
        sm:py-8 lg:py-10"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Section heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
          <span
            className="mb-4 inline-flex items-center gap-2 rounded-full
              border border-[#008A66]/25 bg-[#008A66]/5
              px-4 py-2 text-xs font-semibold uppercase
              tracking-[0.18em] text-[#008A66]
              dark:border-[#00D6A0]/20 dark:bg-[#00D6A0]/5
              dark:text-[#00D6A0]"
          >
            <span className="h-2 w-2 rounded-full bg-[#00D6A0]" />
            Our Impact
          </span>

          <h2
            className="text-3xl font-bold tracking-tight
              sm:text-4xl lg:text-5xl"
          >
            Real work.{" "}
            <span className="text-[#008A66] dark:text-[#00D6A0]">
              Real rewards.
            </span>
          </h2>

          <p
            className="mx-auto mt-5 max-w-xl text-sm leading-7
              text-gray-600 dark:text-gray-400 sm:text-base"
          >
            Every bounty creates an opportunity for people to
            contribute, complete tasks, and earn rewards on Arc.
          </p>
        </div>

        {/* Statistics grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2
          lg:grid-cols-4 lg:gap-5">
          {STAT_ITEMS.map((item, index) => {
            const value = stats[item.key];

            return (
              <article
                key={item.key}
                className="group relative overflow-hidden
                  rounded-2xl border border-black/10
                  bg-white p-6 shadow-sm
                  transition-all duration-300
                  hover:-translate-y-1 hover:border-[#008A66]/40
                  hover:shadow-lg hover:shadow-[#008A66]/5
                  dark:border-white/10 dark:bg-[#101713]
                  dark:hover:border-[#00D6A0]/40
                  dark:hover:shadow-[#00D6A0]/5
                  sm:p-7"
              >
                {/* Subtle green accent */}
                <div
                  className="absolute left-0 top-0 h-1 w-0
                    bg-[#00D6A0] transition-all duration-300
                    group-hover:w-full"
                />

                <div className="flex items-start justify-between">
                  <div
                    className="flex h-12 w-12 items-center
                      justify-center rounded-xl border
                      border-[#008A66]/20 bg-[#008A66]/5
                      text-xl font-semibold text-[#008A66]
                      transition-colors duration-300
                      group-hover:bg-[#008A66]/10
                      dark:border-[#00D6A0]/20
                      dark:bg-[#00D6A0]/5
                      dark:text-[#00D6A0]
                      dark:group-hover:bg-[#00D6A0]/10"
                  >
                    {item.icon}
                  </div>

                  <span
                    className="text-xs font-medium
                      text-gray-400 dark:text-gray-500"
                  >
                    0{index + 1}
                  </span>
                </div>

                <div className="mt-7">
                  <p
                    className="break-words text-2xl font-bold
                      tracking-tight text-[#008A66]
                      dark:text-[#00D6A0] sm:text-3xl"
                  >
                    {loading
                      ? "..."
                      : value === null
                        ? "—"
                        : item.format(value)}
                  </p>

                  <h3 className="mt-3 text-base font-semibold">
                    {item.label}
                  </h3>

                  <p
                    className="mt-2 text-sm leading-6
                      text-gray-500 dark:text-gray-400"
                  >
                    {item.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* API status */}
        <div className="mt-8 text-center">
          {hasError ? (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Statistics are temporarily unavailable.
            </p>
          ) : (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Platform statistics · Arc Mainnet
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
