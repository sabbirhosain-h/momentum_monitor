"use client"
import React, { useState } from "react";
import GoogleIcon from "@/app/UI/(authUI)/GoogleIcon";
import Scene from "@/app/UI/(authUI)/Scene";
import FormField from "@/app/UI/(dbUI)/FormField";
import { ArrowLeft, Lock, MailIcon, UserIcon } from "lucide-react";

function strength(pw) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw) || pw.length >= 12) s++;
  return s;
}
const STRENGTH_LABEL = ["Too short", "Weak", "Fair", "Good", "Strong"];
const STRENGTH_COLOR = ["bg-slate-200", "bg-rose-400", "bg-amber-400", "bg-emerald-400", "bg-emerald-600"];

export default function SignupPage({ onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const score = password ? strength(password) : 0;

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Tell us what to call you.";
    if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Enter a valid email address.";
    if (password.length < 8) e.password = "Use at least 8 characters.";
    if (confirm !== password) e.confirm = "Passwords don't match.";
    if (!agree) e.agree = "Agree to the terms to create your account.";
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setLoading(true);
    try {
      await onSubmit?.({ name, email, password });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-br from-emerald-50 via-teal-50 to-amber-50 p-4 sm:p-8" style={{ fontFamily: "'Figtree', system-ui, sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,600&display=swap');`}</style>
      <button
        type="button"
        onClick={() => window.history.back()}
        className="absolute left-5 top-5 z-50 flex items-center gap-2 rounded-lg
                   bg-white/80 px-3 py-2 text-sm font-medium text-teal-900
                   shadow-sm backdrop-blur-md transition-all duration-200
                   hover:-translate-x-0.5 hover:bg-white hover:shadow-md
                   focus-visible:outline-none focus-visible:ring-2
                   focus-visible:ring-teal-500/50"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>
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

          <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
            <FormField id="name" label="Full name" type="text" icon={<UserIcon />} placeholder="Alex Morgan" value={name} onChange={setName} error={errors.name} />

            <FormField id="email" label="Email" type="email" icon={<Lock className="w-5 h-5" />} placeholder="you@example.com" value={email} onChange={setEmail} error={errors.email} />

            <div>
              <FormField id="password" label="Password" type="password" icon={<Lock className="w-5 h-5" />} placeholder="At least 8 characters" value={password} onChange={setPassword} error={errors.password} />
              {password && (
                <div className="mt-2 flex items-center gap-2" aria-live="polite">
                  <div className="flex flex-1 gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <span key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= score ? STRENGTH_COLOR[score] : "bg-slate-200"}`} />
                    ))}
                  </div>
                  <span className="w-14 text-right text-xs text-slate-500">{STRENGTH_LABEL[score]}</span>
                </div>
              )}
            </div>

            <FormField id="confirm" label="Repeat password" type="password" icon={<Lock className="w-5 h-5" />} placeholder="Type it again" value={confirm} onChange={setConfirm} error={errors.confirm} />



            <div>
              <label className="flex cursor-pointer items-start gap-2 text-xs text-slate-600">
                <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-teal-700" />
                <span>
                  I agree to the <a href="/terms" className="font-medium text-teal-700 underline underline-offset-2">Terms of Service</a> and <a href="/privacy" className="font-medium text-teal-700 underline underline-offset-2">Privacy Policy</a>.
                </span>
              </label>
              {errors.agree && <p className="mt-1.5 text-xs text-rose-500">{errors.agree}</p>}
            </div>

            <button type="submit" disabled={loading} className="w-full rounded-lg bg-linear-to-r from-teal-700 to-emerald-600 py-3 text-sm font-semibold text-white shadow-md shadow-teal-700/20 transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50 focus-visible:ring-offset-2 disabled:opacity-60">
              {loading ? "Creating account…" : "Create account"}
            </button>
          </form>

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
