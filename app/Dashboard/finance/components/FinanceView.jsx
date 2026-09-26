"use client";

// Client-side layout only — assembles the module's components in order.
// No data fetching, no derived math: everything here either reads from
// useFinance() (inside the components below) or is pure layout.

import HeroPanel from "./HeroPanel";
import SnapshotRings from "./SnapshotRings";
import EntryForm from "./EntryForm";
import WeeklyChart from "./WeeklyChart";
import CategoryBreakdown from "./CategoryBreakdown";
import MiniCalendar from "./MiniCalendar";
import RecentEntries from "./RecentEntries";
import { PAGE_BG } from "../lib/constants";

// Robust, neutral sans-serif for a clear, trustworthy financial UI.
// Loaded via a plain <link> tag rather than next/font/google — this avoids
// depending on Next's font-manifest build step, which needs no more than a
// standard <link> to work in any Next.js setup (App Router, Pages Router,
// Turbopack or webpack) with zero build-time coupling. Falls back to the
// system UI stack immediately if the stylesheet hasn't loaded yet or fails.
const FINANCE_FONT_STACK =
  "'Roboto', system-ui, -apple-system, 'Segoe UI', sans-serif";

export default function FinanceView() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
      />
      <div
        className="min-h-screen w-full p-4 sm:p-8"
        style={{ backgroundColor: PAGE_BG, fontFamily: FINANCE_FONT_STACK }}
      >
        <div className="mx-auto max-w-6xl">
          <HeroPanel />
          <SnapshotRings />

          <div className="mb-6 grid gap-4 lg:grid-cols-[1fr_1fr_0.9fr]">
            <EntryForm />
            <div className="grid gap-4">
              <WeeklyChart />
              <CategoryBreakdown />
            </div>
            <MiniCalendar />
          </div>

          <RecentEntries />
        </div>
      </div>
    </>
  );
}
