import GoogleIcon from "@/app/UI/(authUI)/GoogleIcon";
import Scene from "@/app/UI/(authUI)/Scene";
import SignupForm from "./SignupForm";
import BackButton from "@/app/UI/buttons/BackButton";
import { Lock } from "lucide-react";

export const metadata = {
  title: "Momentum Monitor | Sign up",
  description: "Momentum Monitor pulls your finances, fitness, and daily journal into a single calm dashboard",
};
export default function SignupPage() {


  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-br from-emerald-50 via-teal-50 to-amber-50 p-4 sm:p-8" style={{ fontFamily: "'Figtree', system-ui, sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,600&display=swap');`}</style>
     

      <BackButton/>

      <div className="grid w-full max-w-4xl overflow-hidden rounded-4xl bg-white shadow-2xl shadow-teal-900/15 md:grid-cols-[1fr_1.1fr]">

        {/* illustration side */}
        <section className="relative min-h-50 md:min-h-180">
          <Scene />
          <div className="relative z-10 p-7 md:p-10">
            <p className="text-sm font-semibold text-teal-900">Rootwise</p>
            <h1 className="mt-5 max-w-[14ch] text-3xl leading-tight text-teal-950 md:text-4xl" style={{ fontFamily: "'Fraunces', serif" }}>
              Small habits grow big.
            </h1>
            <p className="mt-3 max-w-[30ch] text-sm text-teal-900/80">
              Track your health and your money in one calm place. Free to start.
            </p>
          </div>
          <svg viewBox="0 0 60 600" preserveAspectRatio="none" className="absolute -right-px top-0 hidden h-full w-14 md:block" aria-hidden="true">
            <path d="M60 0 V600 H60 C10 560 -6 470 22 400 C50 330 0 270 12 190 C22 120 40 60 0 0Z" fill="#fff" />
          </svg>
        </section>

        {/* form side */}
        <section className="px-7 py-9 sm:px-10 md:py-10">
          <h2 className="text-2xl font-semibold text-teal-950">Create your account</h2>
          <p className="mt-1 text-sm text-slate-500">It takes about a minute.</p>

          <button type="button" className="mt-5 flex w-full items-center justify-center gap-2.5 rounded-lg border border-slate-200 bg-white py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/40">
            <GoogleIcon /> Sign up with Google
          </button>

          <div className="my-4 flex items-center gap-3 text-xs text-slate-400">
            <span className="h-px flex-1 bg-slate-200" /> or use email <span className="h-px flex-1 bg-slate-200" />
          </div>

          <SignupForm/>

          <p className="mt-5 text-center text-sm text-slate-500">
            Already have an account? <a href="/Login" className="font-semibold text-teal-700 underline-offset-2 hover:underline">Log in</a>
          </p>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-slate-400">
            <span className="text-teal-600"><Lock className="h-5 w-5" /></span>
            Your health and money data is encrypted and never sold.
          </p>
        </section>
      </div>
    </main>
  );
}
