import React from 'react'
import RhythmLine from './RhythmLine';

export default function BackgroundGlow() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-linear-to-b from-slate-50 via-white to-white"
    >
      <div className="absolute -top-40 left-[-10%] h-140 w-140 animate-drift-1 rounded-full bg-teal-300/30 blur-[110px]" />
      <div className="absolute -top-20 right-[-15%] h-130 w-130 animate-drift-2 rounded-full bg-sky-300/30 blur-[110px]" />
      <div className="absolute top-140 left-[10%] h-105 w-105 animate-drift-3 rounded-full bg-amber-200/25 blur-[110px]" />

      {/* Rhythm lines — the brand signature. Two copies of the same path
          placed side by side and scrolled left in a seamless loop reads as
          a heartbeat / steady pulse, echoing "one steady rhythm". */}
      <div className="absolute left-0 top-[10%] w-[200%] opacity-[0.35] sm:top-[14%]">
        <div className="flex animate-wave">
          <RhythmLine />
          <RhythmLine />
        </div>
      </div>
      <div className="absolute left-0 top-[26%] w-[200%] opacity-[0.2] sm:top-[30%]">
        <div className="flex animate-wave" style={{ animationDuration: "30s", animationDirection: "reverse" }}>
          <RhythmLine variant="sky" />
          <RhythmLine variant="sky" />
        </div>
      </div>
    </div>
  );
}
