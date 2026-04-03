import { useApp } from "../context/AppContext";
import { getExpense, getHighestCategory } from "../utils/calculations";
import { MdCategory, MdList, MdAttachMoney } from "react-icons/md";

export default function Insights({ selectedMonth }) {
  const { transactions } = useApp();

  const current = transactions.filter((t) =>
    t.date.startsWith(selectedMonth)
  );

  const prevMonth =
    selectedMonth.slice(0, 5) +
    String(Number(selectedMonth.slice(5)) - 1).padStart(2, "0");

  const prev = transactions.filter((t) =>
    t.date.startsWith(prevMonth)
  );

  const currentExp = getExpense(current);
  const prevExp = getExpense(prev);

  const percent =
    prevExp === 0
      ? 0
      : (((currentExp - prevExp) / prevExp) * 100).toFixed(1);

  const highest = getHighestCategory(current);

  const avg =
    current.length === 0
      ? 0
      : (currentExp / current.length).toFixed(2);

  return (
    <div className="
      bg-white text-black border border-black
      dark:bg-gray-900 dark:text-white 
      p-4 md:p-5 rounded-xl shadow-lg mt-3 w-full
    ">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-sm md:text-base">Insights</h3>
      </div>

      {/* Content */}
      <div className="space-y-4 text-sm">

        {/* Highest Spending */}
        <div className="
          flex items-center justify-between
          pb-3
        ">
          <div className="flex items-center gap-3">
            <div className="bg-pink-500/20 text-pink-400 p-2 rounded">
              <MdCategory />
            </div>

            <div>
              <p className="text-gray-600 dark:text-gray-300">
                Highest Spending
              </p>
              <p className="font-medium">
                {highest || "N/A"} – ₹{currentExp.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Total Transactions */}
        <div className="
          flex items-center justify-between
          pb-3
        ">
          <div className="flex items-center gap-3">
            <div className="bg-purple-500/20 text-purple-400 p-2 rounded">
              <MdList />
            </div>

            <div>
              <p className="text-gray-600 dark:text-gray-300">
                Total Transactions
              </p>
              <p className="font-medium">
                {current.length} transactions
              </p>
            </div>
          </div>
        </div>

        {/* Avg Expense */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-green-500/20 text-green-400 p-2 rounded">
              <MdAttachMoney />
            </div>

            <div>
              <p className="text-gray-600 dark:text-gray-300">
                Avg. Daily Expense
              </p>
              <p className="font-medium">
                ₹{avg}
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}