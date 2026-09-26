"use client"
import FormField from '@/app/UI/(dbUI)/FormField';
import { Lock, MailIcon } from 'lucide-react';
import React, { useState } from 'react'

export default function LoginForm() {
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
            console.log(email, password, remember)
        } finally {
            setLoading(false);
        }
    };
    return (
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
    )
}
