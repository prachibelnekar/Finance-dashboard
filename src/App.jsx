import { useState, useEffect } from "react"; 
import Navbar from "./components/Navbar";
import SummaryCards from "./components/SummaryCards";
import TransactionTable from "./components/TransactionTable";
import Insights from "./components/Insights";
import { AppProvider } from "./context/AppContext";
import AddTransaction from "./components/AddTransaction";
import BalanceTrend from "./components/BalanceTrend";
import SpendingPie from "./components/SpendingPie";
import MonthlyComparison from "./components/MonthlyComparison";

export default function App() {
  const [dark, setDark] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("2026-04");

  useEffect(() => {
  if (dark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}, [dark]);

  return (
    <AppProvider>
      <div
        className={
          dark
            ? "bg-black text-white min-h-screen"
            : "bg-gray-100 text-black min-h-screen" // ✅ softer light mode
        }
      >

        <Navbar
          dark={dark}
          setDark={setDark}
          showForm={showForm}
          setShowForm={setShowForm}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />

        <div className="p-4 md:p-6">

          {showForm && (
            <AddTransaction
              setShowForm={setShowForm}
              selectedMonth={selectedMonth}
            />
          )}

          <div className="mb-6">
            <SummaryCards selectedMonth={selectedMonth} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">

            <div className="md:col-span-4">
              <BalanceTrend />
            </div>

            <div className="md:col-span-3">
              <SpendingPie />
            </div>

            <div className="md:col-span-5">
              <MonthlyComparison selectedMonth={selectedMonth} />
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">

            <div className="md:col-span-2">
              <TransactionTable />
            </div>

            <Insights selectedMonth={selectedMonth} />

          </div>

        </div>
      </div>
    </AppProvider>
  );
}