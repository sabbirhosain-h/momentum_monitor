import React from 'react'

export default function RhythmLine({ variant = "teal" }) {
  const stroke = variant === "sky" ? "#38bdf8" : "#2dd4bf";
  return (
    <svg
      viewBox="0 0 1440 120"
      className="h-22.5 w-[50%] shrink-0 sm:h-30"
      preserveAspectRatio="none"
    >
      <path
        d="M0,60 C120,10 240,10 360,60 C480,110 600,110 720,60 C840,10 960,10 1080,60 C1200,110 1320,110 1440,60"
        fill="none"
        stroke={stroke}
        strokeWidth="2"
      />
    </svg>
  );
}
