"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  Menu,
  X,
  Sparkles,
  LayoutDashboard,
  Wallet,
  Activity,
  BookOpen,
  UserCircle,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";
import NavButton from "../UI/buttons/NavButton";


const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", url: "dashboard", icon: LayoutDashboard },
  { key: "finance", label: "Finance", url: "dashboard/finance", icon: Wallet },
  { key: "health", label: "Health", url: "dashboard/health", icon: Activity },
  { key: "journal", label: "Journal", url: "dashboard/journal", icon: BookOpen },
];

export default function DBLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("dashboard");
  
  const router = useRouter();
  const handleLogOut = () => {
    router.push("/")
  }
  return (
    <div className="flex min-h-screen w-full bg-slate-100">

      {/* ---------------- Mobile top bar ---------------- */}
      <div className="fixed inset-x-0 top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:hidden">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-linear-to-br from-teal-400 to-sky-500">
            <Sparkles className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-sm font-semibold tracking-tight text-slate-900">
            Momentum Monitor
          </span>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 active:bg-slate-50"
          aria-label="Open menu"
        >
          <Menu className="h-4.5 w-4.5" />
        </button>
      </div>

s
      {/* ---------------- Mobile drawer + backdrop ---------------- */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-[78%] max-w-75 animate-slide-in bg-white p-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-linear-to-br from-teal-400 to-sky-500">
                  <Sparkles className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
                </div>
                <span className="text-sm font-semibold tracking-tight text-slate-900">
                  Momentum Monitor
                </span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
                aria-label="Close menu"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            <div className="my-4 border-t border-slate-100" />

            <nav className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <NavButton
                  key={item.key}
                  item={item}
                  active={active === item.key}
                  collapsed={false}
                  onClick={() => {
                    handleClick();
                    setActive(item.key);
                    setMobileOpen(false);
                  }}
                />
              ))}
            </nav>

            <div className=" border-t border-slate-100 pt-4">
              <NavButton
                item={{ key: "profile", label: "Profile", icon: UserCircle }}
                active={active === "profile"}
                collapsed={false}
                onClick={() => {
                  setActive("profile");
                  setMobileOpen(false);
                }}
              />
              <NavButton
                item={{ key: "logout", label: "Log out", icon: LogOut }}
                active={false}
                collapsed={false}
                danger
                onClick={() => setMobileOpen(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* ---------------- Desktop sidebar ---------------- */}
      <aside
        className={`sticky top-3 z-20 mb-3 ml-3 hidden h-[calc(100vh-24px)] flex-col rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-900/6 transition-all duration-300 md:flex ${collapsed ? "w-19" : "w-60"
          }`}
      >
        <div className="flex items-center justify-between p-4">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-linear-to-br from-teal-400 to-sky-500">
                <Sparkles className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-sm font-semibold tracking-tight text-slate-900">
                Momentum
              </span>
            </div>
          )}
          <button
            onClick={() => setCollapsed((prev) => !prev)}
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900 ${collapsed ? "mx-auto" : ""
              }`}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <Menu className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
          </button>
        </div>

        <div className="mx-4 border-t border-slate-100" />

        <nav className="flex flex-1 flex-col gap-1 p-3">
          {NAV_ITEMS.map((item) => (
            <NavButton
              key={item.key}
              item={item}
              url={item.url}
              active={active === item.key}
              collapsed={collapsed}
              onClick={() => setActive(item.key)
              } 
            />
          ))}
        </nav>

        <div className="mx-4 border-t border-slate-100" />

        <div className="flex flex-col gap-1 p-3">
          <NavButton
            item={{ key: "profile", label: "Profile", icon: UserCircle }}
            active={active === "profile"}
            collapsed={collapsed}
            onClick={() => setActive("profile")}
          />
          <NavButton
            item={{ key: "logout", label: "Log out", icon: LogOut }}
            active={false}
            collapsed={collapsed}
            danger
            // onClick={}
          />
        </div>
      </aside>

      {/* ---------------- Main content panel ---------------- */}
      <div className="relative z-10 flex-1 p-3 pt-3 md:pl-3">
        <div className="relative min-h-[calc(100vh-56px)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:min-h-[calc(100vh-56px)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-linear-to-br from-teal-100 via-white to-sky-200"
          />
          <div className="relative z-10 p-3 sm:p-5">{children}</div>
        </div>
      </div>

      <style>{`
        @keyframes slide-in {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in { animation: slide-in 2ms ease-out; }
      `}</style>
    </div>
  );
}
