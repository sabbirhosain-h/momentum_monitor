import React from 'react'
import { useFitnessDare } from '../getRandomDare';
import { Flame, RefreshCcw, Timer } from 'lucide-react';

export default function FitnessDareCard() {
  const { dare, timeLeftLabel, percentElapsed,
    //  refreshNow
     } = useFitnessDare(12);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-500 shadow-sm">
            <Flame className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-teal-600">
              Today's dare
            </p>
            <p className="text-xs text-slate-400">Refreshes every 12 hours</p>
          </div>
        </div>

        {/* Dev/testing affordance — remove or hide behind an admin flag
            once 12-hour rotation is verified against real timestamps. */}
        {/* <button
          onClick={refreshNow}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          aria-label="Get a new dare now"
          title="Get a new dare now"
        >
          <RefreshCcw className="h-3.5 w-3.5" />
        </button> */}
      </div>

      <p className="mt-4 text-base font-medium leading-relaxed text-slate-900">
        {dare ?? "Loading your dare…"}
      </p>

      <div className="mt-5">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-linear-to-r from-teal-500 to-sky-500 transition-all duration-1000"
            style={{ width: `${percentElapsed}%` }}
          />
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
          <Timer className="h-3.5 w-3.5" />
          <span>Next dare in {timeLeftLabel}</span>
        </div>
      </div>
    </div>
  );
}
