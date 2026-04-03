import { useApp } from "../context/AppContext";
import { useState, useRef, useEffect } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { exportCSV } from "../utils/exportCSV";
import { exportJSON } from "../utils/exportJSON";

export default function Navbar({
  dark,
  setDark,
  showForm,
  setShowForm,
  selectedMonth,
  setSelectedMonth
}) {
  const { role, setRole, transactions } = useApp();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="
      flex flex-col md:flex-row justify-between items-start md:items-center
      gap-4 px-4 md:px-6 py-4
      bg-white text-black border-b border-black
      dark:bg-gray-900 dark:text-white 
      shadow-md
    ">

      {/* LEFT */}
      <div>
        <h1 className="text-xl font-bold">📈 Finance Dashboard</h1>
        <p className="text-sm text-gray-500 dark:text-gray-300">
          Track • Analyze • Grow
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex flex-wrap items-center gap-3 md:gap-4 relative">

        {/* Role Switch */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="
            px-3 py-1 rounded border border-black bg-white text-black
            dark:bg-gray-700 dark:text-white dark:border-white
          "
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>

        {/* Month Selector */}
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="
            px-3 py-1 rounded border border-black bg-white text-black
            dark:bg-gray-700 dark:text-white dark:border-white
          "
        >
          <option value="2026-01">January</option>
          <option value="2026-02">February</option>
          <option value="2026-03">March</option>
          <option value="2026-04">April</option>
          <option value="2026-05">May</option>
          <option value="2026-06">June</option>
          <option value="2026-07">July</option>
          <option value="2026-08">August</option>
          <option value="2026-09">September</option>
          <option value="2026-10">October</option>
          <option value="2026-11">November</option>
          <option value="2026-12">December</option>
        </select>

        {/* Mode */}
        <button
          onClick={() => setDark(!dark)}
          className="
            p-2 rounded border border-black bg-white text-black
            hover:bg-gray-100
            dark:bg-gray-700 dark:text-white dark:border-white dark:hover:bg-gray-600
          "
        >
          {dark ? <MdDarkMode size={20} /> : <MdLightMode size={20} />}
        </button>

        {/* Export Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="
              px-3 py-1 rounded border border-black bg-white text-black
              hover:bg-gray-100
              dark:bg-gray-700 dark:text-white dark:border-white dark:hover:bg-gray-600
            "
          >
            ⬇ Export
          </button>

          {open && (
            <div className="
              absolute right-0 mt-2 w-32 overflow-hidden rounded shadow
              bg-white text-black border border-black
              dark:bg-gray-800 dark:text-white dark:border-white
            ">

              <button
                onClick={() => {
                  exportCSV(transactions);
                  setOpen(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                CSV
              </button>

              <button
                onClick={() => {
                  exportJSON(transactions);
                  setOpen(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                JSON
              </button>

            </div>
          )}
        </div>

        {/* Add Transaction */}
        {role === "admin" && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="
              px-4 py-1 rounded
              bg-purple-600 text-white
              hover:bg-purple-700
            "
          >
            {showForm ? "Close" : "+ Add Transaction"}
          </button>
        )}

      </div>
    </div>
  );
}