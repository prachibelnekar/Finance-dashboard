# Finance-dashboard
This project is a frontend-only finance dashboard designed to demonstrate:
-UI/UX design thinking
-Component-based architecture
-State management
-Data visualization

Users can view financial summaries, explore transactions, and gain insights into their spending behavior.

Tech Stack : 
-Frontend: React (Vite)
-Styling: Tailwind CSS
-Charts: Recharts
-Icons: React Icons
-State Management: Context API
-Storage: LocalStorage

Features : 
Dashboard Overview : 

Summary cards:
-Total Balance
-Income
-Expenses
-Savings

Time-based visualization:
- Balance Trend (Line Chart)
Categorical visualization:
- Spending Breakdown (Pie Chart)
- Monthly comparison (Bar Chart)
  
Transactions Section -
-View all transactions with:
   -Date
   -Amount
   -Category
   -Type (Income/Expense)
Functionalities:
-Filter by category, type, and time
-Pagination
-Delete transactions (Admin only)
Role-Based UI (Simulated)
Viewer - Can only view data
Admin - Can add transactions ,  delete transactions
Role switch available via dropdown in navbar

Insights Section : 
- Highest spending category
- Total transactions count
- Average daily expense

Export Functionality : 
Export transactions as: CSV / JSON

UI/UX Enhancements
-Dark mode toggle
-Responsive layout
-Clean and modern design
-Interactive charts
-Smooth UI transitions

Data Persistence : 
- Transactions stored in localStorage
- Data persists across page reloads
  
State Management
Managed using React Context API:

Global state includes:
-Transactions
-User role
-Local component state for:
-Filters
-Pagination
-Form inputs
-UI toggles

Project Structure : 
src/
│
├── components/
│   ├── Navbar.jsx
│   ├── SummaryCards.jsx
│   ├── TransactionTable.jsx
│   ├── AddTransaction.jsx
│   ├── BalanceTrend.jsx
│   ├── SpendingPie.jsx
│   ├── MonthlyComparison.jsx
│   ├── Insights.jsx
│   ├── RoleSwitcher.jsx
│
├── context/
│   └── AppContext.jsx
│
├── utils/
│   ├── calculations.js
│   ├── helpers.js
│   ├── exportCSV.js
│   ├── exportJSON.js
│   ├── format.js
│
├── App.jsx
└── main.jsx
