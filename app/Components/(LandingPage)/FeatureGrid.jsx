import useInView from '@/app/Hooks/useInView';
import { Flame, TrendingUp, Wallet } from 'lucide-react';
import React from 'react'


export default function FeatureGrid() {
  const [ref, inView] = useInView(0.2);
    const features = [
      {
        icon: <Wallet className="h-5 w-5 text-white" />,
        iconBg: "bg-gradient-to-br from-amber-400 to-amber-500",
        title: "Finance Tracker",
        copy: "See income against expenses in real time, sorted into the sectors that actually shape your month.",
      },
      {
        icon: <Flame className="h-5 w-5 text-white" />,
        iconBg: "bg-gradient-to-br from-teal-400 to-teal-500",
        title: "Health & Fitness",
        copy: "Log workouts, sleep, and water intake, and watch your weight trend move toward your target.",
      },
      {
        icon: <TrendingUp className="h-5 w-5 text-white" />,
        iconBg: "bg-gradient-to-br from-sky-400 to-sky-500",
        title: "Custom Journal",
        copy: "A daily workspace that looks the way you want it to — your colors, your fonts, your reflection.",
      },
    ];
    return (
      <section id="features" ref={ref} className="relative z-10 mx-auto max-w-7xl px-6 py-28 sm:px-8">
        <div
          className={`mx-auto mb-16 max-w-2xl text-center transition-all duration-700 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Three trackers. One momentum.
          </h2>
          <p className="mt-4 text-slate-600">
            Every part of your day feeds the same dashboard, so you always know
            where you actually stand.
          </p>
        </div>
  
        <div className="grid gap-5 sm:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-700 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-slate-900/6 ${
                inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: `${150 + i * 120}ms` }}
            >
              <div
                className={`mb-5 flex h-10 w-10 items-center justify-center rounded-lg shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${f.iconBg}`}
              >
                {f.icon}
              </div>
              <h3 className="text-base font-semibold text-slate-900">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.copy}</p>
            </div>
          ))}
        </div>
      </section>
    );
}
