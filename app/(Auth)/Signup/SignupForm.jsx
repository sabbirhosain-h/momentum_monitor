"use client"
import FormField from '@/app/UI/(dbUI)/FormField';
import { Lock, UserIcon } from 'lucide-react';
import React, { useState } from 'react'


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

export default function SignupForm({ onSubmit }) {
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
  )
}
