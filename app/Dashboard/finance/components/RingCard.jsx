"use client";

// Presentational only — takes plain props, holds no Finance-specific logic
// or context access. Kept generic so it's reusable outside this module too.

import { Pencil } from "lucide-react";
import { CARD, CARD_BORDER, TEXT_PRIMARY, TEXT_SECONDARY, TEXT_PLACEHOLDER, ERROR } from "../lib/constants";
import { formatMoney } from "../lib/utils";

export default function RingCard({
  label,
  value,
  progress,
  caption,
  delta,
  deltaInverse = false,
  color,
  trackColor,
  icon,
  editable = false,
  onEdit,
}) {
  const size = 168;
  const stroke = 14;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - Math.min(1, Math.max(0, progress)));
  const hasDelta = typeof delta === "number" && !Number.isNaN(delta);
  const positive = hasDelta && (deltaInverse ? delta <= 0 : delta >= 0);

  return (
    <div
      className="relative flex flex-col items-center rounded-xl border p-5 shadow-sm"
      style={{ backgroundColor: CARD, borderColor: CARD_BORDER }}
    >
      {editable && (
        <button
          onClick={onEdit}
          className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full hover:bg-gray-100"
          style={{ color: TEXT_PLACEHOLDER }}
          aria-label={`Edit ${label}`}
        >
          <Pencil className="h-4 w-4" style={{ color: TEXT_SECONDARY }} />
        </button>
      )}

      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={trackColor} strokeWidth={stroke} />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.8s ease, stroke 0.3s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <span className="mb-1 flex h-7 w-7 items-center justify-center rounded-full" style={{ backgroundColor: trackColor }}>
            {icon}
          </span>
          <span
            className="text-lg font-bold tabular-nums leading-tight tracking-tight"
            style={{ color: value < 0 ? ERROR : TEXT_PRIMARY }}
          >
            {formatMoney(value)}
          </span>
        </div>
      </div>

      <p className="mt-3 text-xs font-semibold uppercase tracking-wide" style={{ color: TEXT_SECONDARY }}>{label}</p>
      <p className="mt-0.5 text-[11px]" style={{ color: TEXT_PLACEHOLDER }}>{caption}</p>
      {hasDelta && (
        <p className={`mt-1 text-xs font-semibold ${positive ? "text-green-700" : "text-red-600"}`}>
          {delta >= 0 ? "↑" : "↓"} {Math.abs(delta)}% vs last week
        </p>
      )}
    </div>
  );
}
