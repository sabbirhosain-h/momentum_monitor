"use client";

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";
import { PRIMARY, PRIMARY_DARK, TEXT_PRIMARY, TEXT_SECONDARY, TEXT_MUTED } from "../lib/constants";
import { formatMoney } from "../lib/utils";
import { useFinance } from "../context/FinanceContext";

const TODAY_LABEL = new Date().toLocaleDateString(undefined, {
  weekday: "long",
  month: "long",
  day: "numeric",
});

export default function HeroPanel() {
  const { netBalance, totalIncome, totalExpenses, range, setRange, trendData } = useFinance();

  return (
    <div className="mb-6 grid gap-6 lg:grid-cols-[1fr_1.3fr] lg:items-start">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: TEXT_MUTED }}>
          Daily Income
        </p>
        <h1
          className="mt-2 text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl"
          style={{ color: TEXT_PRIMARY }}
        >
          Finance
          <br />
          Tracker
        </h1>
        <p className="mt-4 max-w-xs text-base leading-relaxed" style={{ color: TEXT_SECONDARY }}>
          Log it as it happens. Every payment, every cost — one steady
          picture of where you stand.
        </p>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm" style={{ color: TEXT_SECONDARY }}>
            Good day — <span className="font-medium" style={{ color: TEXT_PRIMARY }}>{TODAY_LABEL}</span>
          </p>
        </div>

        <div className="rounded-xl p-6 shadow-lg" style={{ backgroundColor: PRIMARY }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-blue-100">Net balance</p>
              <p className="mt-1 text-3xl font-bold tabular-nums text-white">{formatMoney(netBalance)}</p>
              <p className="mt-1 text-xs font-medium text-blue-100">
                {formatMoney(totalIncome)} in · {formatMoney(totalExpenses)} out
              </p>
            </div>
            <div className="flex gap-1 rounded-lg p-1" style={{ backgroundColor: PRIMARY_DARK }}>
              {[7, 30].map((r) => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  className={`rounded-md px-3 py-1 text-xs font-semibold transition-colors ${
                    range === r ? "bg-white" : "text-blue-100 hover:text-white"
                  }`}
                  style={range === r ? { color: PRIMARY } : undefined}
                >
                  {r}D
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 h-30 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 6, left: 0, right: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.55} />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="label" hide />
                <YAxis hide domain={["auto", "auto"]} />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: "none", background: PRIMARY_DARK, fontSize: 12, color: "#FFFFFF" }}
                  formatter={(v) => [formatMoney(v), "Balance"]}
                />
                <Area type="monotone" dataKey="value" stroke="#FFFFFF" strokeWidth={2} fill="url(#trendFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
