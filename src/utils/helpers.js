export const groupByMonth = (transactions) => {
  const map = {};

  transactions.forEach((t) => {
    const month = t.date.slice(0, 7);

    if (!map[month]) {
      map[month] = { income: 0, expense: 0 };
    }

    if (t.type === "income") {
      map[month].income += t.amount;
    } else {
      map[month].expense += t.amount;
    }
  });

  return map;
};