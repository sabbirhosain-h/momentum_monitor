"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { CARD, CARD_BORDER, TEXT_PRIMARY, TEXT_PLACEHOLDER, SUCCESS, ERROR } from "../lib/constants";
import { useFinance } from "../context/FinanceContext";

export default function WeeklyChart() {
  const { weeklyData } = useFinance();

  return (
    <div className="rounded-xl border p-6 shadow-sm" style={{ backgroundColor: CARD, borderColor: CARD_BORDER }}>
      <h2 className="mb-4 text-lg font-bold" style={{ color: TEXT_PRIMARY }}>Last 7 days</h2>
      <div className="h-40 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyData} barGap={4}>
            <CartesianGrid vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: TEXT_PLACEHOLDER }} />
            <YAxis hide />
            <Tooltip contentStyle={{ borderRadius: 8, border: `1px solid ${CARD_BORDER}`, background: CARD, fontSize: 12 }} />
            <Bar dataKey="Income" fill={SUCCESS} radius={[4, 4, 0, 0]} />
            <Bar dataKey="Expenses" fill={ERROR} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
