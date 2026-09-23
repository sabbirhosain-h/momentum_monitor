export default function Scene() {
  return (
    <svg viewBox="0 0 400 620" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#D9F5E4" />
          <stop offset="0.6" stopColor="#F4FBE6" />
          <stop offset="1" stopColor="#FFF6D8" />
        </linearGradient>
        <linearGradient id="h1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#A9E0C0" />
          <stop offset="1" stopColor="#7CCBA0" />
        </linearGradient>
        <linearGradient id="h2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4FB58A" />
          <stop offset="1" stopColor="#2C8C6D" />
        </linearGradient>
        <linearGradient id="h3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1F6E5A" />
          <stop offset="1" stopColor="#0F3F35" />
        </linearGradient>
      </defs>

      <rect width="400" height="620" fill="url(#sky)" />
      <circle cx="285" cy="150" r="46" fill="#F6D67A" opacity="0.9" />
      <circle cx="285" cy="150" r="72" fill="#F6D67A" opacity="0.25" />

      {/* heartbeat line drifting across the sky */}
      <path d="M0 230 H120 l14 -26 l20 52 l14 -26 H400" fill="none" stroke="#FFFFFF" strokeOpacity="0.75" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

      <path d="M0 330 C90 280 170 300 250 320 C320 336 370 320 400 300 V620 H0Z" fill="url(#h1)" />
      <path d="M0 400 C80 350 170 350 250 385 C320 415 370 400 400 380 V620 H0Z" fill="url(#h2)" />

      {/* small pines */}
      {[[60, 372, 1], [92, 384, 0.8], [318, 398, 0.9], [350, 388, 0.7]].map(([x, y, s], i) => (
        <path key={i} d={`M${x} ${y} l${-14 * s} ${34 * s} h${28 * s}z M${x} ${y - 16 * s} l${-11 * s} ${28 * s} h${22 * s}z`} fill="#1F7A5F" opacity="0.85" />
      ))}

      <path d="M0 500 C90 450 190 460 270 490 C330 512 375 500 400 485 V620 H0Z" fill="url(#h3)" />

      {/* rising savings path: reads as a trail up the hill and as a growth chart */}
      <path d="M40 585 C110 560 130 520 190 500 C240 484 250 440 300 410" fill="none" stroke="#F6D67A" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 9" />
      {[[40, 585], [190, 500], [300, 410]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="6" fill="#F6D67A" stroke="#0F3F35" strokeWidth="2" />
      ))}

      {/* tree whose canopy is leaves plus one gold coin */}
      <rect x="296" y="360" width="6" height="52" rx="3" fill="#0F3F35" />
      <circle cx="299" cy="346" r="26" fill="#3FA982" />
      <circle cx="281" cy="360" r="15" fill="#4FB58A" />
      <circle cx="318" cy="358" r="15" fill="#2C8C6D" />
      <circle cx="304" cy="338" r="11" fill="#F6D67A" stroke="#E0B94F" strokeWidth="2" />
      <path d="M304 333v10M300 338h8" stroke="#B8902F" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}