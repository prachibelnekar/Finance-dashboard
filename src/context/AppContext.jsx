import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();
export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("tx");
    return saved ? JSON.parse(saved) : [];
  });

  const [role, setRole] = useState("viewer");

  useEffect(() => {
    localStorage.setItem("tx", JSON.stringify(transactions));
  }, [transactions]);

  const addTx = (tx) => setTransactions([...transactions, tx]);
  const deleteTx = (id) => setTransactions(transactions.filter(t => t.id !== id));

  return (
    <AppContext.Provider value={{ transactions, addTx, deleteTx, role, setRole }}>
      {children}
    </AppContext.Provider>
  );
};