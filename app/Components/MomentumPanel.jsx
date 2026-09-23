import { Droplet, Flame, Moon, Wallet } from 'lucide-react';
import React from 'react'
import MomentumRing from './MomentumRing';

export default function MomentumPanel({ mounted }) {
  const metrics = [
    {
      icon: <Flame className="h-4 w-4 text-white" />,
      iconBg: "bg-teal-500",
      label: "Fitness streak",
      value: "18 days",
      delta: "Personal best",
      deltaColor: "text-teal-600",
    },
    {
      icon: <Wallet className="h-4 w-4 text-white" />,
      iconBg: "bg-emerald-500",
      label: "Finance summary",
      value: "+$1,240",
      delta: "This month",
      deltaColor: "text-emerald-600",
    },
    {
      icon: <Moon className="h-4 w-4 text-white" />,
      iconBg: "bg-sky-500",
      label: "Sleep pattern",
      value: "7h 42m",
      delta: "Avg this week",
      deltaColor: "text-sky-600",
    },
    {
      icon: <Droplet className="h-4 w-4 text-white" />,
      iconBg: "bg-sky-400",
      label: "Water intake",
      value: "2.4 / 3L",
      delta: "80% of goal",
      deltaColor: "text-sky-600",
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/6 transition-shadow hover:shadow-2xl hover:shadow-slate-900/8 sm:p-8">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-[220px_1px_1fr] sm:items-center">
        <div className="flex flex-col items-center justify-center gap-3">
          <MomentumRing percent={76} start={mounted} />
          <div className="text-center">
            <p className="text-sm font-semibold text-slate-900">
              Overall momentum
            </p>
            <p className="text-xs text-slate-500">Across all three trackers</p>
          </div>
        </div>

        <div className="hidden h-full w-px bg-slate-200 sm:block" />

        <dl className="divide-y divide-slate-100">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className={`flex items-center justify-between gap-4 py-3.5 transition-all duration-500 first:pt-0 last:pb-0 ${
                mounted ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0"
              }`}
              style={{ transitionDelay: `${480 + i * 90}ms` }}
            >
              <div className="flex items-center gap-3">
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg shadow-sm ${m.iconBg}`}>
                  {m.icon}
                </div>
                <dt className="text-sm text-slate-500">{m.label}</dt>
              </div>
              <dd className="text-right">
                <span className="block text-sm font-semibold tabular-nums tracking-tight text-slate-900">
                  {m.value}
                </span>
                <span className={`block text-xs font-medium ${m.deltaColor}`}>
                  {m.delta}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
