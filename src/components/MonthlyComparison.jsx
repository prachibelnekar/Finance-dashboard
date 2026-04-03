import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid
} from "recharts";
import { useApp } from "../context/AppContext";
import { groupByMonth } from "../utils/helpers";

export default function MonthlyComparison() {
  const { transactions } = useApp();

  const grouped = groupByMonth(transactions);

  const formatMonth = (monthStr) => {
    const date = new Date(monthStr + "-01");
    return date.toLocaleString("default", { month: "short" });
  };

  const data = Object.keys(grouped).map((month) => ({
    Month: formatMonth(month),
    Income: grouped[month].income,
    Expense: grouped[month].expense,
  }));

  return (
    <div className="
      bg-white text-black border border-black
      dark:bg-gray-900 dark:text-white 
      p-4 rounded-xl w-full
    ">
      <h3 className="font-bold mb-3 text-sm md:text-base">
        Monthly Income vs Expense
      </h3>

      <ResponsiveContainer width="100%" height={210}>
        <BarChart data={data}>

          {/* Grid */}
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="currentColor"
            opacity={0.2}
          />

          {/* X Axis */}
          <XAxis
            dataKey="Month"
            stroke="currentColor"
            tick={{ fontSize: 12 }}
          />

          {/* Y Axis */}
          <YAxis
            stroke="currentColor"
            tick={{ fontSize: 12 }}
          />

          {/* Tooltip */}
          <Tooltip formatter={(value) => `₹${value}`} />

          {/* Legend */}
          <Legend
            wrapperStyle={{
              color: "currentColor",
              fontSize: "12px"
            }}
          />

          {/* Income */}
          <Bar
            dataKey="Income"
            fill="#22c55e"
            radius={[6, 6, 0, 0]}
          />

          {/* Expense */}
          <Bar
            dataKey="Expense"
            fill="#ef4444"
            radius={[6, 6, 0, 0]}
          />

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}