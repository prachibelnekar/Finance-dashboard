import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";

export default function TransactionTable() {
  const { transactions, deleteTx, role } = useApp();

  //  Filters
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");

  //  Pagination
  const [page, setPage] = useState(1);
  const perPage = 4;

  // Dynamic categories
  const categories = [
    ...new Set(
      transactions.map((t) => t.category.trim().toLowerCase())
    ),
  ].sort();

  //  Time filter
  const isWithinRange = (date) => {
    if (timeFilter === "all") return true;

    const txDate = new Date(date);
    const now = new Date();

    if (timeFilter === "3m") {
      const past = new Date();
      past.setMonth(now.getMonth() - 3);
      return txDate >= past;
    }

    if (timeFilter === "1m") {
      const past = new Date();
      past.setMonth(now.getMonth() - 1);
      return txDate >= past;
    }

    return true;
  };

  // Filter logic
  const filtered = transactions.filter((t) => {
    return (
      (typeFilter === "all" || t.type === typeFilter) &&
      (categoryFilter === "all" ||
        t.category.toLowerCase() === categoryFilter) &&
      isWithinRange(t.date)
    );
  });

  // Pagination logic
  const total = filtered.length;
  const totalPages = Math.ceil(total / perPage);
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const paginated = filtered.slice(start, end);

  useEffect(() => {
    setPage(1);
  }, [typeFilter, categoryFilter, timeFilter]);

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [total, page, totalPages]);

  // 🎨 Category colors
  const getCategoryColor = (cat) => {
    const map = {
      food: "bg-red-500/20 text-red-400",
      shopping: "bg-blue-500/20 text-blue-400",
      bills: "bg-yellow-500/20 text-yellow-400",
      transport: "bg-orange-500/20 text-orange-400",
      salary: "bg-green-500/20 text-green-400",
    };
    return map[cat] || "bg-gray-700 text-gray-300";
  };

  // ✨ Format category
  const formatCategory = (cat) =>
    cat.charAt(0).toUpperCase() + cat.slice(1);

  return (
    <div className="
      bg-white text-black border border-black
      dark:bg-gray-900 dark:text-white dark:border-white
      p-4 md:p-5 rounded-xl shadow-lg mt-3 w-full
    ">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-5">
        <h2 className="text-base md:text-lg font-bold">
          Recent Transactions
        </h2>

        <div className="flex flex-wrap gap-2">

          {/* Category */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-1.5 rounded text-sm bg-white text-black border border-black dark:bg-gray-700 dark:text-white dark:border-white"
          >
            <option value="all">All Categories</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>
                {formatCategory(cat)}
              </option>
            ))}
          </select>

          {/* Type */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-1.5 rounded text-sm bg-white text-black border border-black dark:bg-gray-700 dark:text-white dark:border-white"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          {/* Time */}
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="px-3 py-1.5 rounded text-sm bg-white text-black border border-black dark:bg-gray-700 dark:text-white dark:border-white"
          >
            <option value="all">All Time</option>
            <option value="1m">Last 1 Month</option>
            <option value="3m">Last 3 Months</option>
          </select>

        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">

          <thead>
            <tr className="border-b border-black dark:border-white text-gray-600 dark:text-gray-300">
              <th className="text-left py-2">Date</th>
              <th>Category</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginated.map((t) => (
              <tr key={t.id} className="border-b border-black dark:border-white text-center">

                <td className="py-3 whitespace-nowrap">{t.date}</td>

                <td>
                  <span className={`px-2 py-1 rounded text-xs ${getCategoryColor(t.category)}`}>
                    {formatCategory(t.category)}
                  </span>
                </td>

                <td className={t.type === "income" ? "text-green-500" : "text-red-500"}>
                  {t.type}
                </td>

                <td className="font-semibold whitespace-nowrap">
                  {t.type === "income" ? "+" : "-"}₹{t.amount}
                </td>

                <td>
                  {role === "admin" && (
                    <button
                      onClick={() => deleteTx(t.id)}
                      className="px-2 py-1 rounded bg-red-500/20 text-red-500 hover:bg-red-500/30"
                    >
                      🗑
                    </button>
                  )}
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* FOOTER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mt-4 text-sm text-gray-600 dark:text-gray-300">

        <div>
          Showing {total === 0 ? 0 : start + 1}–{Math.min(end, total)} of {total} transactions
        </div>

        <div className="flex flex-wrap items-center gap-2">

          {/* Prev */}
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-2 py-1 rounded border bg-white text-black border-black dark:bg-gray-700 dark:text-white dark:border-white disabled:opacity-50"
          >
            ⬅
          </button>

          {/* Pages */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`
                px-2 py-1 rounded border
                ${page === p
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-black border-black dark:bg-gray-700 dark:text-white dark:border-white"}
              `}
            >
              {p}
            </button>
          ))}

          {/* Next */}
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="px-2 py-1 rounded border bg-white text-black border-black dark:bg-gray-700 dark:text-white dark:border-white disabled:opacity-50"
          >
            ➡
          </button>

        </div>
      </div>

    </div>
  );
}