"use client"
import GoogleIcon from "@/app/UI/(authUI)/GoogleIcon";
import Scene from "@/app/UI/(authUI)/Scene";
import FormField from "@/app/UI/(dbUI)/FormField";
import { ArrowLeft, Lock, MailIcon } from "lucide-react";
import React, { useState } from "react"


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [remember, setRemember] = useState(true);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const e = {};
        if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Enter the email you signed up with.";
        if (password.length < 8) e.password = "Passwords have at least 8 characters.";
        return e;
    };

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        const e = validate();
        setErrors(e);
        if (Object.keys(e).length) return;
        setLoading(true);
        try {
            console.log(email,password,remember)
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
            <div className="grid w-full max-w-4xl overflow-hidden rounded-4xl bg-white shadow-2xl shadow-teal-900/15 md:grid-cols-[1.05fr_1fr]">
                {/* illustration side */}
                <section className="relative min-h-50 md:min-h-150">
                    <Scene />
                    <div className="relative z-10 p-7 md:p-10">
                        <p className="text-sm font-semibold text-teal-900">Rootwise</p>
                        <h1 className="mt-5 max-w-[15ch] text-3xl leading-tight text-teal-950 md:text-4xl" style={{ fontFamily: "'Fraunces', serif" }}>
                            Good to see you again.
                        </h1>
                        <p className="mt-3 max-w-[30ch] text-sm text-teal-900/80">
                            Your budget, sleep and steps are right where you left them.
                        </p>
                    </div>
                    {/* wavy edge */}
                    <svg viewBox="0 0 60 600" preserveAspectRatio="none" className="absolute -right-px top-0 hidden h-full w-14 md:block" aria-hidden="true">
                        <path d="M60 0 V600 H60 C10 560 -6 470 22 400 C50 330 0 270 12 190 C22 120 40 60 0 0Z" fill="#fff" />
                    </svg>
                </section>

                {/* form side */}
                <section className="px-7 py-9 sm:px-10 md:py-12">
                    <h2 className="text-2xl font-semibold text-teal-950">Log in</h2>
                    <p className="mt-1 text-sm text-slate-500">Pick up where you left off.</p>

                    <button type="button" className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-lg border border-slate-200 bg-white py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/40">
                        <GoogleIcon /> Continue with Google
                    </button>

                    <div className="my-5 flex items-center gap-3 text-xs text-slate-400">
                        <span className="h-px flex-1 bg-slate-200" /> or use email <span className="h-px flex-1 bg-slate-200" />
                    </div>

                    <form onSubmit={handleSubmit} noValidate className="space-y-4">
                        <FormField id="email" label="Email" type="email" icon={<MailIcon className="w-5 h-5" />} placeholder="you@example.com" value={email} onChange={setEmail} error={errors.email} />

                        <FormField id="password" label="Password" type={showPw ? "text" : "password"} icon={<Lock className="w-5 h-5" />} placeholder="At least 8 characters" value={password} onChange={setPassword} error={errors.password} />

                        <div className="flex items-center justify-between text-xs">
                            <label className="flex cursor-pointer items-center gap-2 text-slate-600">
                                <input type="checkbox" checked={showPw} onChange={(e) => setShowPw(e.target.checked)} className="h-4 w-4 rounded border-slate-300 accent-teal-700" />
                                Show password
                            </label>
                            <a href="/forgot-password" className="font-medium text-teal-700 underline-offset-2 hover:underline">Forgot password?</a>
                        </div>

                        <label className="flex cursor-pointer items-center gap-2 text-xs text-slate-600">
                            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="h-4 w-4 rounded border-slate-300 accent-teal-700" />
                            Keep me logged in on this device
                        </label>

                        <button type="submit" disabled={loading} className="w-full rounded-lg bg-linear-to-r from-teal-700 to-emerald-600 py-3 text-sm font-semibold text-white shadow-md shadow-teal-700/20 transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50 focus-visible:ring-offset-2 disabled:opacity-60">
                            {loading ? "Logging in…" : "Log in"}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-slate-500">
                        New here? <a href="/Signup" className="font-semibold text-teal-700 underline-offset-2 hover:underline">Create an account</a>
                    </p>
                    <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-slate-400">
                        <span className="text-teal-600"><Lock className="h-5 w-5" /></span>
                        Your health and money data is encrypted and never sold.
                    </p>
                </section>
            </div>
        </main>
    );
}
