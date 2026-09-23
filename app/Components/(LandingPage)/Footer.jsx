import { Sparkle } from 'lucide-react';
import React from 'react'

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-slate-100">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row sm:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-linear-to-br from-teal-400 to-sky-500">
            <Sparkle className="h-3 w-3 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-sm font-medium text-slate-600">
            Momentum Monitor
          </span>
        </div>
        <p className="text-xs text-slate-400">
          © 2026 Momentum Monitor. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
