import React from 'react'

export default function GlobalKeyframes() {
  return (
    <style>{`
      @keyframes drift-1 {
        0%, 100% { transform: translate(0px, 0px) scale(1); }
        50% { transform: translate(40px, 30px) scale(1.08); }
      }
      @keyframes drift-2 {
        0%, 100% { transform: translate(0px, 0px) scale(1); }
        50% { transform: translate(-30px, 40px) scale(1.05); }
      }
      @keyframes drift-3 {
        0%, 100% { transform: translate(0px, 0px) scale(1); }
        50% { transform: translate(20px, -30px) scale(1.1); }
      }
      @keyframes wave-scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      @keyframes pulse-dot {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 1; }
      }
      .animate-drift-1 { animation: drift-1 14s ease-in-out infinite; }
      .animate-drift-2 { animation: drift-2 18s ease-in-out infinite; }
      .animate-drift-3 { animation: drift-3 16s ease-in-out infinite; }
      .animate-wave { animation: wave-scroll 22s linear infinite; }
      @media (prefers-reduced-motion: reduce) {
        .animate-drift-1, .animate-drift-2, .animate-drift-3, .animate-wave {
          animation: none;
        }
      }
    `}</style>
  );
}
