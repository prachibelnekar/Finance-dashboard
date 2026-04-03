export const exportCSV = (data) => {
  const header = "Date,Amount,Category,Type\n";

  const rows = data.map(
    (t) => `${t.date},${t.amount},${t.category},${t.type}`
  );

  const blob = new Blob([header + rows.join("\n")], {
    type: "text/csv",
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "transactions.csv";
  a.click();
};