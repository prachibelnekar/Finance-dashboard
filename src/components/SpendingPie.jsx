import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { useApp } from "../context/AppContext";

const COLORS = ["#ef4444", "#3b82f6", "#22c55e", "#facc15", "#a855f7"];

export default function SpendingPie() {
  const { transactions } = useApp();

  const map = {};

  transactions.forEach(t => {
    if (t.type === "expense") {
      map[t.category] = (map[t.category] || 0) + t.amount;
    }
  });

  const data = Object.keys(map).map(k => ({
    name: k,
    value: map[k],
  }));

  return (
    <div className="
      bg-white text-black border border-black
      dark:bg-gray-900 dark:text-white 
      p-4 rounded-xl w-full
    ">
      <h3 className="font-bold mb-3 text-sm md:text-base">
        Spending Breakdown
      </h3>

      <ResponsiveContainer width="100%" height={210}>
        <PieChart>

          {/* ✅ Centered Pie */}
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="45%"
            outerRadius={85}
            innerRadius={45}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>

          {/* Tooltip */}
          <Tooltip formatter={(value) => `₹${value}`} />

          {/* ✅ FIXED Legend (always bottom) */}
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            iconType="circle"
            wrapperStyle={{
              color: "currentColor",
              fontSize: "12px",
              marginTop: "10px"
            }}
          />

        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}