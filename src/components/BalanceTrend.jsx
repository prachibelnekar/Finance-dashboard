import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";
import { useApp } from "../context/AppContext";
import { groupByMonth } from "../utils/helpers";

export default function BalanceTrend() {
  const { transactions } = useApp();

  const grouped = groupByMonth(transactions);

  const data = Object.keys(grouped).map(month => ({
    month,
    balance: grouped[month].income - grouped[month].expense
  }));

  return (
    <div className="
      bg-white text-black border border-black
      dark:bg-gray-900 dark:text-white 
      p-4 rounded-xl
    ">
      <h3 className="font-bold mb-2">Balance Trend</h3>

      <ResponsiveContainer width="100%" height={210}>
        <LineChart data={data}>
          <XAxis dataKey="month" stroke="currentColor" />
          <YAxis stroke="currentColor" />
          <Tooltip />
          <Line type="monotone" dataKey="balance" stroke="#8b5cf6" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}