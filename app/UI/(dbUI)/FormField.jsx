import React from 'react'

export default function FormField({ id, label, icon, type, placeholder, value, onChange, error }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-slate-500">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </span>
        <input
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full rounded-lg border bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:ring-2 ${
            error
              ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/20"
              : "border-slate-200 focus:border-teal-500 focus:ring-teal-500/20"
          }`}
        />
      </div>
      {error && <p className="mt-1.5 text-xs text-rose-500">{error}</p>}
    </div>
  );
}
