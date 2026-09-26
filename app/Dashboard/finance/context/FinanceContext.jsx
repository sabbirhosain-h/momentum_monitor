"use client";

// ============================================================================
// FINANCE CONTEXT — the single centralized store for this module.
// ============================================================================
// Every entry, category, and derived number (totals, deltas, chart series,
// calendar data) lives and is computed here, once. Components under
// ../components never hold their own copy of entries or do their own totals
// math — they call useFinance() and read/act through this context. That's
// what "centralized" means in practice: one place owns the data and the
// rules for deriving anything from it, so every component always agrees.
//
// initialEntries comes from the server (see ../lib/data.js via page.jsx) and
// seeds the very first render; everything after that is normal client state.
// ============================================================================

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import {
  DEFAULT_CATEGORIES,
  DEFAULT_ACCOUNTS,
  BASE_CATEGORY_COLORS,
} from "../lib/constants";
import { isoDaysAgo, slugify, todayISO } from "../lib/utils";

const FinanceContext = createContext(null);

export function FinanceProvider({ initialEntries = [], children }) {
  const [entries, setEntries] = useState(initialEntries);
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [range, setRange] = useState(7); // hero chart window, in days
  const [baseIncome, setBaseIncome] = useState(0);

  // ---- Actions -------------------------------------------------------
  const addEntry = useCallback((entry) => {
    const withId = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      date: todayISO(),
      account: DEFAULT_ACCOUNTS[0],
      ...entry,
    };
    setEntries((prev) => [withId, ...prev]);
    // In a real app, fire-and-forget (or await) a server action / API call
    // here to persist the entry, e.g. `await createFinanceEntry(withId)`.
  }, []);

  // console.log(addEntry)

  const removeEntry = useCallback((id) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
    // Same note as addEntry: persist the deletion server-side here too.
  }, []);

  const addCategory = useCallback((name) => {
    const trimmed = name.trim();
    if (!trimmed) return null;
    const value = slugify(trimmed) || `custom-${Date.now()}`;
    let created = null;
    setCategories((prev) => {
      const color = BASE_CATEGORY_COLORS[prev.length % BASE_CATEGORY_COLORS.length];
      created = { value, label: trimmed, color };
      return [...prev, created];
    });
    return value;
  }, []);

  const categoryMeta = useCallback(
    (value) => categories.find((c) => c.value === value) || categories[categories.length - 1],
    [categories]
  );

  // ---- Derived data ----------------------------------------------------
  const loggedIncome = useMemo(
    () => entries.filter((e) => e.type === "income").reduce((s, e) => s + e.amount, 0),
    [entries]
  );
  const totalIncome = loggedIncome + baseIncome;

  const totalExpenses = useMemo(
    () => entries.filter((e) => e.type === "expense").reduce((s, e) => s + e.amount, 0),
    [entries]
  );

  const netBalance = totalIncome - totalExpenses;

  const ringMax = Math.max(totalIncome, totalExpenses, 1);
  const incomeProgress = Math.max(0, totalIncome) / ringMax;
  const expenseProgress = Math.max(0, totalExpenses) / ringMax;
  const netProgress = totalIncome > 0 ? Math.min(1, Math.max(0, netBalance / totalIncome)) : 0;

  const sumBetween = useCallback(
    (type, daysAgoStart, daysAgoEnd) =>
      entries
        .filter((e) => e.type === type && e.date >= isoDaysAgo(daysAgoStart) && e.date < isoDaysAgo(daysAgoEnd))
        .reduce((s, e) => s + e.amount, 0),
    [entries]
  );

  const incomeDelta = useMemo(() => {
    const thisWeek = sumBetween("income", 6, -1);
    const lastWeek = sumBetween("income", 13, 6) || 1;
    return Math.round(((thisWeek - lastWeek) / lastWeek) * 100);
  }, [sumBetween]);

  const expenseDelta = useMemo(() => {
    const thisWeek = sumBetween("expense", 6, -1);
    const lastWeek = sumBetween("expense", 13, 6) || 1;
    return Math.round(((thisWeek - lastWeek) / lastWeek) * 100);
  }, [sumBetween]);

  const categoryBreakdown = useMemo(() => {
    const totals = {};
    entries
      .filter((e) => e.type === "expense")
      .forEach((e) => {
        totals[e.category] = (totals[e.category] || 0) + e.amount;
      });
    return Object.entries(totals)
      .map(([value, amount]) => ({ ...categoryMeta(value), amount }))
      .sort((a, b) => b.amount - a.amount);
  }, [entries, categoryMeta]);

  const weeklyData = useMemo(() => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const dateStr = isoDaysAgo(i);
      const label = new Date(dateStr + "T00:00:00").toLocaleDateString(undefined, { weekday: "short" });
      const income = entries.filter((e) => e.date === dateStr && e.type === "income").reduce((s, e) => s + e.amount, 0);
      const expense = entries.filter((e) => e.date === dateStr && e.type === "expense").reduce((s, e) => s + e.amount, 0);
      days.push({ day: label, Income: Math.round(income), Expenses: Math.round(expense) });
    }
    return days;
  }, [entries]);

  const trendData = useMemo(() => {
    const points = [];
    let running = baseIncome;
    for (let i = range - 1; i >= 0; i--) {
      const dateStr = isoDaysAgo(i);
      const dayIncome = entries.filter((e) => e.date === dateStr && e.type === "income").reduce((s, e) => s + e.amount, 0);
      const dayExpense = entries.filter((e) => e.date === dateStr && e.type === "expense").reduce((s, e) => s + e.amount, 0);
      running += dayIncome - dayExpense;
      points.push({
        label: new Date(dateStr + "T00:00:00").toLocaleDateString(undefined, { month: "short", day: "numeric" }),
        value: Math.round(running),
      });
    }
    return points;
  }, [entries, range, baseIncome]);

  const recentEntries = useMemo(
    () => [...entries].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 6),
    [entries]
  );

  const calendarDays = useMemo(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1);
    const startOffset = firstDay.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const entryDates = new Set(entries.map((e) => e.date));

    const cells = [];
    for (let i = 0; i < startOffset; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      const iso = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      cells.push({ day: d, iso, hasEntry: entryDates.has(iso), isToday: d === today.getDate() });
    }
    return cells;
  }, [entries]);

  const value = {
    // raw state
    entries,
    categories,
    range,
    setRange,
    baseIncome,
    setBaseIncome,
    // actions
    addEntry,
    removeEntry,
    addCategory,
    categoryMeta,
    // derived
    totalIncome,
    totalExpenses,
    netBalance,
    incomeProgress,
    expenseProgress,
    netProgress,
    incomeDelta,
    expenseDelta,
    categoryBreakdown,
    weeklyData,
    trendData,
    recentEntries,
    calendarDays,
  };

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>;
}

export function useFinance() {
  const ctx = useContext(FinanceContext);
  if (!ctx) {
    throw new Error("useFinance() must be called within a <FinanceProvider>.");
  }
  return ctx;
}
