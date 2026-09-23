import { ArrowRight } from 'lucide-react';
import React from 'react'
import useInView from '../../Hooks/useInView';

export default function FinalCTA() {
  const [ref, inView] = useInView(0.3);
  return (
    <section ref={ref} className="relative z-10 mx-auto max-w-5xl px-6 pb-28 sm:px-8">
      <div
        className={`relative overflow-hidden rounded-2xl bg-linear-to-br from-teal-500 to-sky-500 px-8 py-16 text-center shadow-xl shadow-teal-500/25 transition-all duration-700 sm:px-16 ${
          inView ? "scale-100 opacity-100" : "scale-[0.97] opacity-0"
        }`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-[-10%] h-64 w-64 animate-drift-3 rounded-full bg-white/15 blur-[90px]"
        />
        <h2 className="relative text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Build momentum you can actually see.
        </h2>
        <p className="relative mx-auto mt-4 max-w-md text-teal-50">
          Free to start. No credit card. Your first streak begins the moment
          you sign up.
        </p>
        <button className="group relative mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-7 py-3.5 text-sm font-semibold text-teal-600 shadow-lg transition-all hover:scale-[1.03] hover:shadow-xl">
          Create your free account
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </section>
  );
}
