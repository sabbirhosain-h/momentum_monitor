"use client"
import React, { useEffect, useState } from "react";
import Nav from "./Components/(LandingPage)/Nav";
import Hero from "./Components/(LandingPage)/Hero";
// import FeatureGrid from "./Components/FeatureGrid";
import FinalCTA from "./Components/(LandingPage)/FinalCTA";
import Footer from "./Components/(LandingPage)/Footer";
import BackgroundGlow from "./Animations/BackgroundGlow";
import GlobalKeyframes from "./Components/GlobalKeyframes";
import FeatureGrid from "./Components/(LandingPage)/FeatureGrid";

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <div className="min-h-screen w-full bg-white text-slate-900 antialiased overflow-x-hidden">
      <GlobalKeyframes />
      <BackgroundGlow/>
      <Nav />
      <Hero mounted={mounted} />
      {/* <SocialProofStrip /> */}
      <FeatureGrid />
      <FinalCTA />
      <Footer />
    </div>
  );
}










// ----------------------------------------------------------------------------
// Social proof strip
// ----------------------------------------------------------------------------
// function SocialProofStrip() {
//   const [ref, inView] = useInView(0.3);
//   const stats = [
//     { value: "40K+", label: "Active trackers" },
//     { value: "2.1M", label: "Habits logged" },
//     { value: "94%", label: "Weekly retention" },
//     { value: "4.9★", label: "Average rating" },
//   ];
//   return (
//     <section
//       ref={ref}
//       className="relative z-10 border-y border-slate-100 bg-slate-50/60"
//     >
//       <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-6 py-10 sm:grid-cols-4 sm:px-8">
//         {stats.map((s, i) => (
//           <div
//             key={s.label}
//             className={`text-center transition-all duration-600 ${
//               inView ? "translate-y-0 scale-100 opacity-100" : "translate-y-3 scale-95 opacity-0"
//             }`}
//             style={{ transitionDelay: `${i * 90}ms` }}
//           >
//             <p className="bg-gradient-to-r from-teal-600 to-sky-600 bg-clip-text text-2xl font-bold tabular-nums tracking-tight text-transparent sm:text-3xl">
//               {s.value}
//             </p>
//             <p className="mt-1 text-xs text-slate-500">{s.label}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }





