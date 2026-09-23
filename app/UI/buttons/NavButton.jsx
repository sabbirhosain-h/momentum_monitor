"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NavButton({ item, active, collapsed, url, onClick, danger = false }) {
  const Icon = item.icon;
  const router = useRouter();
  const [chnage,setChnage] = useState(url)
  const handleClick = () => {
    router.push(`/${chnage}`);
  }
  return (
    <button
      onClick={()=> {
        onClick(),
        handleClick(setChnage(url))
      }
    }
      title={collapsed ? item.label : undefined}
      className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
        collapsed ? "justify-center" : ""
      } ${
        active
          ? "bg-teal-50 text-teal-700"
          : danger
          ? "text-slate-500 hover:bg-rose-50 hover:text-rose-600"
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
      }`}
    >
      <Icon
        className={`h-4.5 w-4.5 shrink-0 ${active ? "text-teal-600" : ""}`}
      />
      {!collapsed && <span>{item.label}</span>}
    </button>
  );
}