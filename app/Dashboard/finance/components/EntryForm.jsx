"use client";

import { useState } from "react";
import { Plus, Tag, PlusCircle } from "lucide-react";
import SelectField from "@/app/UI/(dbUI)/SelectField";
import FormField from "@/app/UI/(dbUI)/FormField";
import { CARD, CARD_BORDER, PRIMARY, ERROR, TEXT_PRIMARY, TEXT_SECONDARY, NEW_CATEGORY_VALUE } from "../lib/constants";
import { todayISO } from "../lib/utils";
import { useFinance } from "../context/FinanceContext";

export default function EntryForm() {
  const { categories, addEntry, addCategory } = useFinance();

  const [form, setForm] = useState({
    type: "income",
    name: "",
    amount: "",
    category: categories[0]?.value ?? "",
    date: todayISO(),
  });

  const [errors, setErrors] = useState({});
  const [newCategoryName, setNewCategoryName] = useState("");

  function updateForm(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function confirmNewCategory() {
    const value = addCategory(newCategoryName);
    if (value) {
      updateForm("category", value);
      setNewCategoryName("");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const next = {};
    if (!form.name.trim()) {
      next.name = form.type === "income" ? "Name this income" : "Name this expense";
    }
    if (!form.amount || Number(form.amount) <= 0) {
      next.amount = "Enter a valid positive amount";
    }
    if (form.type === "expense" && form.category === NEW_CATEGORY_VALUE) {
      next.category = "Confirm the new category first";
    }
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    // Send null for category if type is income
    const entryData = {
      type: form.type,
      name: form.name.trim(),
      amount: Number(form.amount),
      category: form.type === "expense" ? form.category : null,
      date: form.date,
    };
    console.log(entryData)
    addEntry(entryData);

    setForm((prev) => ({ ...prev, name: "", amount: "" }));
  }

  return (
    <div className="rounded-xl border p-6 shadow-sm" style={{ backgroundColor: CARD, borderColor: CARD_BORDER }}>
      <h2 className="text-lg font-bold" style={{ color: TEXT_PRIMARY }}>Add an entry</h2>

      <div className="mt-4 flex rounded-lg border border-gray-200 bg-gray-50 p-1">
        <button
          type="button"
          onClick={() => updateForm("type", "income")}
          className={`flex-1 rounded-md py-1.5 text-xs font-semibold transition-all ${
            form.type === "income" ? "text-white" : "hover:text-gray-800"
          }`}
          style={form.type === "income" ? { backgroundColor: PRIMARY } : { color: TEXT_SECONDARY }}
        >
          Income
        </button>
        <button
          type="button"
          onClick={() => updateForm("type", "expense")}
          className={`flex-1 rounded-md py-1.5 text-xs font-semibold transition-all ${
            form.type === "expense" ? "text-white" : "hover:text-gray-800"
          }`}
          style={form.type === "expense" ? { backgroundColor: ERROR } : { color: TEXT_SECONDARY }}
        >
          Expense
        </button>
      </div>

      <form onSubmit={handleSubmit} noValidate className="mt-4 space-y-4">
        <FormField
          id="entry-name"
          label={form.type === "income" ? "Income source" : "Expense title"}
          icon={<Tag className="h-4 w-4" />}
          type="text"
          placeholder={form.type === "income" ? "e.g. Freelance payment" : "e.g. Groceries"}
          value={form.name}
          onChange={(v) => updateForm("name", v)}
          error={errors.name}
        />
        <FormField
          id="entry-amount"
          label="Amount"
          icon={<span className="text-xs font-semibold">$</span>}
          type="number"
          min="0.01"
          step="any"
          placeholder="0.00"
          value={form.amount}
          onChange={(v) => {
            // Block typed negative numbers directly on input
            if (v !== "" && Number(v) < 0) return;
            updateForm("amount", v);
          }}
          error={errors.amount}
        />
        {form.type === "expense" && (
          <>
            <SelectField
              id="entry-category"
              label="Category"
              icon={<Tag className="h-4 w-4" />}
              value={form.category}
              onChange={(v) => updateForm("category", v)}
              error={errors.category}
              options={[
                ...categories.map((c) => ({ value: c.value, label: c.label })),
                { value: NEW_CATEGORY_VALUE, label: "+ Add custom category" },
              ]}
            />
            {form.category === NEW_CATEGORY_VALUE && (
              <div className="flex items-center gap-2 rounded-lg border border-dashed p-2.5" style={{ borderColor: `${PRIMARY}66`, backgroundColor: `${PRIMARY}0D` }}>
                <input
                  autoFocus
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), confirmNewCategory())}
                  placeholder="New category name"
                  className="flex-1 rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-[#1565C0] focus:ring-2 focus:ring-[#1565C0]/15"
                />
                <button
                  type="button"
                  onClick={confirmNewCategory}
                  className="flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-semibold text-white"
                  style={{ backgroundColor: PRIMARY }}
                >
                  <PlusCircle className="h-3.5 w-3.5" /> Add
                </button>
              </div>
            )}
          </>
        )}
        <FormField
          id="entry-date"
          label="Date"
          icon={<span className="text-xs">📅</span>}
          type="date"
          value={form.date}
          onChange={(v) => updateForm("date", v)}
        />
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-transform hover:scale-[1.01]"
          style={{ backgroundColor: form.type === "income" ? PRIMARY : ERROR }}
        >
          <Plus className="h-4 w-4" />
          Add {form.type === "income" ? "income" : "expense"}
        </button>
      </form>
    </div>
  );
}
