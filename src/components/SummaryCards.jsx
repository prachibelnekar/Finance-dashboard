import { useApp } from "../context/AppContext";
import { getIncome, getExpense, getBalance } from "../utils/calculations";
import { FaWallet } from "react-icons/fa";
import { MdArrowDownward, MdArrowUpward } from "react-icons/md";
import { GiPiggyBank } from "react-icons/gi";

export default function SummaryCards({ selectedMonth }) {
  const { transactions } = useApp();

  const filteredTx = transactions.filter(t =>
    t.date.startsWith(selectedMonth)
  );

  const income = getIncome(filteredTx);
  const expense = getExpense(filteredTx);
  const balance = getBalance(filteredTx);
  const savings = income - expense;

  const Card = ({ title, value, icon, color }) => (
    <div className="
      flex items-center gap-4
      bg-white text-black border border-black
      dark:bg-gray-900 dark:text-white 
      p-4 md:p-5 rounded-xl shadow-md
      hover:scale-[1.02] transition
    ">
      
      <div className={`p-3 rounded-lg ${color}`}>
        {icon}
      </div>

      <div>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          {title}
        </p>

        <h2 className="text-lg md:text-xl font-bold">
          ₹{value.toLocaleString()}
        </h2>

        <p className="text-xs text-gray-500 dark:text-gray-400">
          {selectedMonth}
        </p>
      </div>

    </div>
  );

  return (
    <div className="
      grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
      gap-4
    ">

      <Card
        title="Total Balance"
        value={balance}
        icon={<FaWallet size={20} />}
        color="bg-blue-500/20 text-blue-400"
      />

      <Card
        title="Income"
        value={income}
        icon={<MdArrowUpward size={20} />}
        color="bg-green-500/20 text-green-400"
      />

      <Card
        title="Expense"
        value={expense}
        icon={<MdArrowDownward size={20} />}
        color="bg-red-500/20 text-red-400"
      />

      <Card
        title="Savings"
        value={savings}
        icon={<GiPiggyBank size={20} />}
        color="bg-purple-500/20 text-purple-400"
      />

    </div>
  );
}