"use client";

import { TrendingUp, TrendingDown, Trash2 } from "lucide-react";
import { CARD, CARD_BORDER, TEXT_PRIMARY, TEXT_PLACEHOLDER, SUCCESS, SUCCESS_SOFT, ERROR, ERROR_SOFT } from "../lib/constants";
import { useFinance } from "../context/FinanceContext";

export default function RecentEntries() {
  const { recentEntries, categoryMeta, removeEntry } = useFinance();

  return (
    <div className="mb-6 rounded-xl border p-6 shadow-sm" style={{ backgroundColor: CARD, borderColor: CARD_BORDER }}>
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-lg font-bold" style={{ color: TEXT_PRIMARY }}>Recent entries</h2>
        <span className="text-xs" style={{ color: TEXT_PLACEHOLDER }}>Last {recentEntries.length} logged</span>
      </div>
      <div className="divide-y" style={{ borderColor: CARD_BORDER }}>
        {recentEntries.map((entry) => {
          const cat = entry.category ? categoryMeta(entry.category) : null;
          const isIncome = entry.type === "income";
          const badgeBg = isIncome ? SUCCESS_SOFT : ERROR_SOFT;
          const formattedDate = new Date(entry.date + "T00:00:00").toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
          });
          return (
            <div key={entry.id} className="group flex items-center gap-3 py-3.5 first:pt-0 last:pb-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: badgeBg }}>
                {isIncome ? <TrendingUp className="h-4 w-4 text-green-700" /> : <TrendingDown className="h-4 w-4 text-red-700" />}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold" style={{ color: TEXT_PRIMARY }}>{entry.name}</p>
                <p className="mt-0.5 flex items-center gap-1.5 text-xs" style={{ color: TEXT_PLACEHOLDER }}>
                  {cat && <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: cat.color }} />}
                  <span>{cat ? cat.label : "Income"}</span>
                  <span>·</span>
                  <span>{formattedDate}</span>
                </p>
              </div>

              <span className={`shrink-0 text-sm font-semibold tabular-nums ${isIncome ? "text-green-700" : "text-red-700"}`}>
                {isIncome ? "+" : "-"}${entry.amount.toFixed(2)}
              </span>

              <button
                onClick={() => removeEntry(entry.id)}
                className="shrink-0 opacity-0 transition-opacity hover:text-red-500 group-hover:opacity-100"
                aria-label={`Remove ${entry.name}`}
              >
                <Trash2 className="h-3.5 w-3.5" style={{ color: TEXT_PLACEHOLDER }} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
