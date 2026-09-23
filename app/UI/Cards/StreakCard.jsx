import { Circle } from "lucide-react";

const COLOR_MAP = {
  teal: {
    ring: "#14b8a6",
    iconBg: "bg-teal-500/90",
    text: "text-teal-600",
    glow: "bg-teal-400/20",
  },
  amber: {
    ring: "#f59e0b",
    iconBg: "bg-amber-500/90",
    text: "text-amber-600",
    glow: "bg-amber-400/20",
  },
  sky: {
    ring: "#0ea5e9",
    iconBg: "bg-sky-500/90",
    text: "text-sky-600",
    glow: "bg-sky-400/20",
  },
};

function DayRing({ day, strokeColor, iconBg, icon }) {
  const size = 90;
  const stroke = 6;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;

  const percent = Math.min(day * 10, 100);
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div
      className="relative z-20 -mt-12"
      style={{ width: size, height: size }}
    >
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-full opacity-40 blur-xl"
        style={{ backgroundColor: strokeColor }}
      />

      {/* Ring */}
      <svg
        width={size}
        height={size}
        className="relative -rotate-90 drop-shadow-md"
      >
        {/* Background ring */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#e2e8f0"
          strokeOpacity="0.7"
          strokeWidth={stroke}
        />

        {/* Progress ring */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={strokeColor}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700 ease-out"
        />
      </svg>

      {/* Icon */}
      <div
        className={`absolute inset-2.5 flex items-center justify-center rounded-full text-white shadow-lg ${iconBg}`}
      >
        {icon}
      </div>
    </div>
  );
}

function StreakCard({
  icon,
  label,
  color,
  comment,
  day = 0,
}) {
  const c = COLOR_MAP[color] || COLOR_MAP.teal;

  return (
    <div className="group relative pt-12">
      {/* Background glow */}
      <div
        className={`absolute inset-x-6 top-8 h-20 rounded-full blur-2xl ${c.glow}`}
      />

      {/* Card */}
      <div
        className="
          relative
          overflow-visible
          rounded-2xl
          border border-white/60
          bg-white/45
          p-5
          pt-12
          text-center
          shadow-[0_8px_30px_rgba(15,23,42,0.08)]
          backdrop-blur-xl
          transition-all
          duration-300
          hover:-translate-y-2
          hover:bg-white/60
          hover:shadow-[0_16px_40px_rgba(15,23,42,0.12)]
        "
      >
        {/* Ring positioned above the card */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2">
          <DayRing
            day={day}
            strokeColor={c.ring}
            iconBg={c.iconBg}
            icon={icon}
          />
        </div>

        {/* Card content */}
        <div className="relative z-10">
          <p className="text-sm font-semibold tracking-wide text-slate-800">
            {label}
          </p>

          <p className={`mt-1 text-xs font-semibold ${c.text}`}>
            Day {day} streak
          </p>

          <div className="mx-auto mt-3 h-px w-10 bg-slate-300/60" />

          <p className="mt-3 text-xs leading-5 text-slate-500">
            {comment}
          </p>
        </div>
      </div>
    </div>
  );
}

export default StreakCard;