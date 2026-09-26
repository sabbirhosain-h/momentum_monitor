"use client";

import { useState } from "react";
import { Wallet, TrendingDown, PiggyBank } from "lucide-react";
import RingCard from "./RingCard";
import IncomeEditor from "./IncomeEditor";
import { useFinance } from "../context/FinanceContext";
import { SUCCESS, SUCCESS_SOFT, ERROR, ERROR_SOFT, PRIMARY, PRIMARY_LIGHT, TEXT_SECONDARY } from "../lib/constants";

// Pulls everything it needs straight from context — no props required from
// its parent beyond being inside <FinanceProvider>. The income-editor
// open/closed flag is local UI state (not app data), so it stays here
// rather than in the shared context.
export default function SnapshotRings() {
  const {
    totalIncome,
    totalExpenses,
    netBalance,
    incomeProgress,
    expenseProgress,
    netProgress,
    incomeDelta,
    expenseDelta,
  } = useFinance();

  const [editingIncome, setEditingIncome] = useState(false);

  return (
    <>
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <RingCard
          label="Income"
          value={totalIncome}
          progress={incomeProgress}
          caption={`${Math.round(incomeProgress * 100)}% of the larger total`}
          delta={incomeDelta}
          color={SUCCESS}
          trackColor={SUCCESS_SOFT}
          icon={<Wallet className="h-4 w-4 text-green-700" />}
          editable
          onEdit={() => setEditingIncome(true)}
        />
        <RingCard
          label="Expenses"
          value={totalExpenses}
          progress={expenseProgress}
          caption={totalIncome > 0 ? `${Math.round((totalExpenses / totalIncome) * 100)}% of income spent` : "No income logged"}
          delta={expenseDelta}
          deltaInverse
          color={ERROR}
          trackColor={ERROR_SOFT}
          icon={<TrendingDown className="h-4 w-4 text-red-700" />}
        />
        <RingCard
          label="Net balance"
          value={netBalance}
          progress={netProgress}
          caption={totalIncome > 0 ? `${Math.round(Math.max(0, netBalance / totalIncome) * 100)}% of income kept` : "No income logged"}
          color={netBalance >= 0 ? PRIMARY : ERROR}
          trackColor={PRIMARY_LIGHT}
          icon={<PiggyBank className="h-4 w-4" style={{ color: TEXT_SECONDARY }} />}
        />
      </div>

      {editingIncome && <IncomeEditor onClose={() => setEditingIncome(false)} />}
    </>
  );
}
