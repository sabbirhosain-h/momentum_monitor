import { ArrowRight } from 'lucide-react';
import React from 'react'
import MomentumPanel from '../MomentumPanel';

export default function Hero({ mounted }) {
  return (
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-28 pt-16 sm:px-8 sm:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <div
            className={`mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3.5 py-1.5 transition-all duration-700 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            <span
              className="flex h-1.5 w-1.5 rounded-full bg-teal-500"
              style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
            />
            <span className="text-xs font-medium text-teal-700">
              Now tracking momentum for 40,000+ people
            </span>
          </div>
  
          <h1
            className={`text-balance text-5xl font-bold leading-[1.05] tracking-tight text-slate-900 transition-all duration-700 sm:text-7xl ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: "80ms" }}
          >
            Your life, in{" "}
            <span className="bg-linear-to-r from-teal-500 via-teal-500 to-sky-500 bg-clip-text text-transparent">
              one steady rhythm
            </span>
          </h1>
  
          <p
            className={`mx-auto mt-6 max-w-xl text-balance text-lg leading-relaxed text-slate-600 transition-all duration-700 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: "160ms" }}
          >
            Momentum Monitor pulls your finances, fitness, and daily journal into
            a single calm dashboard — so progress feels immediate, not abstract.
          </p>
  
          <div
            className={`mt-10 flex flex-col items-center justify-center gap-3 transition-all duration-700 sm:flex-row ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: "240ms" }}
          >
            <button className="group flex w-full items-center justify-center gap-2 rounded-lg bg-linear-to-r from-teal-500 to-sky-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/30 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-teal-500/40 sm:w-auto">
              Start your streak — it's free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <button className="w-full rounded-lg border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 sm:w-auto">
              See how it works
            </button>
          </div>
        </div>
  
        <div
          className={`mx-auto mt-20 max-w-4xl transition-all duration-1000 sm:mt-24 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "320ms" }}
        >
          <MomentumPanel mounted={mounted} />
        </div>
      </section>
    );
}


