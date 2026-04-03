export const getIncome = (transactions) =>
  transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

export const getExpense = (transactions) =>
  transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

export const getBalance = (transactions) =>
  getIncome(transactions) - getExpense(transactions);

export const getHighestCategory = (transactions) => {
  const map = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      map[t.category] = (map[t.category] || 0) + t.amount;
    }
  });

  return Object.entries(map).sort((a, b) => b[1] - a[1])[0]?.[0];
};