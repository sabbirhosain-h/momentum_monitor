"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { CARD, CARD_BORDER, PRIMARY, TEXT_SECONDARY } from "../lib/constants";
import { useFinance } from "../context/FinanceContext";

// Inline panel for manually topping up Total Income. Reads/writes
// baseIncome through context — the value it sets is added on top of
// whatever's already summed from logged income entries.
export default function IncomeEditor({ onClose }) {
  const { baseIncome, setBaseIncome } = useFinance();
  const [inputValue, setInputValue] = useState(String(baseIncome));

  function confirm() {
    const val = Number(inputValue);
    // Ensure the value is a valid number and non-negative before saving
    if (inputValue.trim() !== "" && !Number.isNaN(val) && val >= 0) {
      setBaseIncome(val);
      onClose();
    }
  }

  function handleChange(e) {
    const val = e.target.value;
    // Allow empty input (for clearing field) or valid positive numbers/decimals only
    if (val === "" || (/^\d*\.?\d*$/.test(val) && Number(val) >= 0)) {
      setInputValue(val);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      confirm();
    }
    // Block negative sign, exponent 'e', and plus sign keypresses
    if (["-", "e", "E", "+"].includes(e.key)) {
      e.preventDefault();
    }
  }

  return (
    <div
      className="mb-6 flex flex-wrap items-center gap-2 rounded-xl border p-3 shadow-sm"
      style={{ backgroundColor: CARD, borderColor: CARD_BORDER }}
    >
      <span className="text-xs font-medium" style={{ color: TEXT_SECONDARY }}>
        Add to Total Income (on top of logged entries)
      </span>
      <input
        autoFocus
        type="number"
        min="0"
        step="any"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="w-32 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-800 outline-none focus:border-[#1565C0] focus:ring-2 focus:ring-[#1565C0]/15"
      />
      <button
        onClick={confirm}
        className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold text-white"
        style={{ backgroundColor: PRIMARY }}
      >
        <Check className="h-3.5 w-3.5" /> Save
      </button>
      <button
        onClick={onClose}
        className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs hover:text-gray-800"
        style={{ color: TEXT_SECONDARY }}
      >
        <X className="h-3.5 w-3.5" /> Cancel
      </button>
    </div>
  );
}
