import { useState } from "react";
import { useApp } from "../context/AppContext";

export default function AddTransaction({ setShowForm, selectedMonth }) {
  const { addTx, role } = useApp();

  const [form, setForm] = useState({
    amount: "",
    type: "expense",
    category: "",
  });

  if (role !== "admin") return null;

  const handleSubmit = () => {
    if (!form.amount || !form.category.trim()) return;

    addTx({
      id: Date.now(),
      date: `${selectedMonth}-01`,
      amount: Number(form.amount),
      type: form.type,
      category: form.category.trim().toLowerCase(),
    });

    setForm({ amount: "", type: "expense", category: "" });
    setShowForm(false);
  };

  return (
    <div
      className="
        bg-white text-black border border-black
        dark:bg-gray-900 dark:text-white dark:border-white
        p-4 rounded
        flex flex-col md:flex-row
        gap-3 md:items-center
      "
    >

      {/* Amount */}
      <input
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={(e) =>
          setForm({ ...form, amount: e.target.value })
        }
        className="
          p-2 rounded w-full
          bg-white text-black border border-black
          dark:bg-gray-900 dark:text-white dark:border-white
        "
      />

      {/* Category */}
      <input
        placeholder="Category"
        value={form.category}
        onChange={(e) =>
          setForm({ ...form, category: e.target.value })
        }
        className="
          p-2 rounded w-full
          bg-white text-black border border-black
          dark:bg-gray-900 dark:text-white dark:border-white
        "
      />

      {/* Type */}
      <select
        value={form.type}
        onChange={(e) =>
          setForm({ ...form, type: e.target.value })
        }
        className="
          p-2 rounded w-full
          bg-white text-black border border-black
          dark:bg-gray-900 dark:text-white dark:border-white
        "
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      {/* Add Button */}
      <button
        onClick={handleSubmit}
        className="bg-green-500 px-4 py-2 rounded w-full md:w-auto"
      >
        Add
      </button>

    </div>
  );
}