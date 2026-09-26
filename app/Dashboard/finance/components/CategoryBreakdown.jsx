"use client";

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { CARD, CARD_BORDER, TEXT_PRIMARY, TEXT_SECONDARY, TEXT_PLACEHOLDER } from "../lib/constants";
import { useFinance } from "../context/FinanceContext";

export default function CategoryBreakdown() {
  const { categoryBreakdown } = useFinance();

  return (
    <div className="rounded-xl border p-6 shadow-sm" style={{ backgroundColor: CARD, borderColor: CARD_BORDER }}>
      <h2 className="mb-4 text-lg font-bold" style={{ color: TEXT_PRIMARY }}>Expense breakdown</h2>
      {categoryBreakdown.length === 0 ? (
        <p className="py-6 text-center text-sm" style={{ color: TEXT_PLACEHOLDER }}>No expenses logged yet.</p>
      ) : (
        <div className="flex items-center gap-5">
          <div className="h-30 w-30 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryBreakdown} dataKey="amount" nameKey="label" innerRadius={36} outerRadius={56} paddingAngle={2} strokeWidth={0}>
                  {categoryBreakdown.map((c) => (
                    <Cell key={c.value} fill={c.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 8, border: `1px solid ${CARD_BORDER}`, background: CARD, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 space-y-1.5">
            {categoryBreakdown.slice(0, 4).map((c) => (
              <div key={c.value} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5" style={{ color: TEXT_SECONDARY }}>
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: c.color }} />
                  {c.label}
                </span>
                <span className="font-semibold tabular-nums" style={{ color: TEXT_PRIMARY }}>${c.amount.toFixed(0)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
