"use client";

import { CARD, CARD_BORDER, PRIMARY, TEXT_PRIMARY, TEXT_SECONDARY, TEXT_PLACEHOLDER, ERROR } from "../lib/constants";
import { useFinance } from "../context/FinanceContext";

const MONTH_YEAR_LABEL = new Date().toLocaleDateString(undefined, { month: "long", year: "numeric" });

export default function MiniCalendar() {
  const { calendarDays } = useFinance();

  return (
    <div className="rounded-xl border p-6 shadow-sm" style={{ backgroundColor: CARD, borderColor: CARD_BORDER }}>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-bold" style={{ color: TEXT_PRIMARY }}>{MONTH_YEAR_LABEL}</h2>
      </div>
      <div className="grid grid-cols-7 gap-y-2 text-center text-[11px]" style={{ color: TEXT_PLACEHOLDER }}>
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <span key={i}>{d}</span>
        ))}
        {calendarDays.map((cell, i) =>
          cell ? (
            <div key={i} className="relative flex flex-col items-center">
              <span
                className="flex h-6 w-6 items-center justify-center rounded-full text-xs"
                style={cell.isToday ? { backgroundColor: PRIMARY, color: "#FFFFFF" } : { color: TEXT_SECONDARY }}
              >
                {cell.day}
              </span>
              {cell.hasEntry && <span className="mt-0.5 h-1 w-1 rounded-full" style={{ backgroundColor: ERROR }} />}
            </div>
          ) : (
            <div key={i} />
          )
        )}
      </div>
    </div>
  );
}
