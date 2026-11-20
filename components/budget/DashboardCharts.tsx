"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

import FlowbiteTableExample from '../../components/budget/FlowbiteTableExample';

interface DashboardChartsProps {
  budgetPage: BudgetPage;
  budgetCategoryAmounts: BudgetCategoryAmounts[];
  budgetRecurringIncome: BudgetRecurringIncome[];
  transactions: Transactions[];
}

interface BudgetPage {
  budgetName: string;
  budgetMonthYear: number; 
  startBalance: number;
  endBalance: number;
  increaseInSavings: number;
  decreaseInSavings: number; 
  createDate: Date;
}

// I made these interface number properties all lowercase to match database columns. Otherwise it breaks. Why?
interface BudgetCategoryAmounts {
  categoryid: bigint; 
  categoryname: string; 
  plannedamount: number; 
  actualamount: number;
  onetimeamount: number; 
  expensesdifference: number;
  isrecurring: boolean;
  recurringexpenseid: bigint;
  recurringincomeid: bigint;
}

interface BudgetRecurringIncome {
  categoryid: bigint;
  categoryname: string; 
  plannedamount: number; 
  actualamount: number;
  onetimeamount: number; 
  incomedifference: number;
  isrecurring: boolean;
  recurringexpenseID: bigint;
  recurringincomeID: bigint;
}

interface Transactions {
  budgetid: bigint, 
  transactionid: bigint, 
  transactiondescription: string, 
  categoryid: bigint, 
  categoryname: string, 
  amount: number, 
  transactiondate: Date, 
  isrecurring: boolean,
  createdby: string 
}

// ==========================================
// 📊 TIME-SERIES EXPERIMENTAL DATASETS
// ==========================================

const datasets = {
  "7days": {
    mainSales: [
      { name: "Mon", revenue: 1200, profit: 800 },
      { name: "Tue", revenue: 900, profit: 400 },
      { name: "Wed", revenue: 1600, profit: 1100 },
      { name: "Thu", revenue: 2100, profit: 1500 },
      { name: "Fri", revenue: 1800, profit: 1200 },
      { name: "Sat", revenue: 2400, profit: 1900 },
      { name: "Sun", revenue: 3100, profit: 2400 },
    ],
    traffic: [
      { name: "Desktop", value: 120 },
      { name: "Mobile", value: 290 },
      { name: "Tablet", value: 40 },
    ],
    categories: [
      { name: "Electronics", value: 150 },
      { name: "Clothing", value: 250 },
      { name: "Appliances", value: 80 },
      { name: "Accessories", value: 120 },
    ]
  },
  "month": {
    mainSales: [
      { name: "Week 1", revenue: 6200, profit: 3400 },
      { name: "Week 2", revenue: 7800, profit: 4100 },
      { name: "Week 3", revenue: 9100, profit: 5800 },
      { name: "Week 4", revenue: 11200, profit: 7200 },
    ],
    traffic: [
      { name: "Desktop", value: 850 },
      { name: "Mobile", value: 1420 },
      { name: "Tablet", value: 210 },
    ],
    categories: [
      { name: "Electronics", value: 900 },
      { name: "Clothing", value: 1200 },
      { name: "Appliances", value: 450 },
      { name: "Accessories", value: 600 },
    ]
  },
  "year": {
    mainSales: [
      { name: "Q1", revenue: 34000, profit: 18900 },
      { name: "Q2", revenue: 45000, profit: 22100 },
      { name: "Q3", revenue: 52000, profit: 31000 },
      { name: "Q4", revenue: 68000, profit: 43000 },
    ],
    traffic: [
      { name: "Desktop", value: 5400 },
      { name: "Mobile", value: 8900 },
      { name: "Tablet", value: 1200 },
    ],
    categories: [
      { name: "Electronics", value: 6200 },
      { name: "Clothing", value: 4100 },
      { name: "Appliances", value: 2900 },
      { name: "Accessories", value: 1800 },
    ]
  }
};

const COLORS = ["#3c50e0", "#80caee", "#f2994a", "#1c2434"];
type FilterType = "7days" | "month" | "year";

export default function DashboardCharts({ 
  budgetPage, 
  budgetCategoryAmounts, 
  budgetRecurringIncome,
  transactions
}: DashboardChartsProps) {
  const [hasMounted, setHasMounted] = useState(false);
  // Track selected dropdown period state
  const [timeFilter, setTimeFilter] = useState<FilterType>("month");
// console.log('Dash Charts comp', budgetPage)
// console.log('Start Bal', budgetPage?.startbalance)
// console.log('Budget Cat Amounts', budgetCategoryAmounts)

const expensePlanned = budgetCategoryAmounts.reduce((sum, item) => sum + (item.plannedamount || 0), 0);
const expenseActual = budgetCategoryAmounts.reduce((sum, item) => sum + (item.actualamount || 0), 0);
const expenseOneTime = budgetCategoryAmounts.reduce((sum, item) => sum + (item.onetimeamount || 0), 0);
console.log('Expense Planned', expensePlanned)
console.log('Expense Actual', expenseActual)
console.log('Expense One Time', expenseOneTime)
console.log(budgetCategoryAmounts)

const incomePlanned = budgetRecurringIncome.reduce((sum, item) => sum + (item.plannedamount || 0), 0);
const incomeActual = budgetRecurringIncome.reduce((sum, item) => sum + (item.actualamount || 0), 0);
const incomeOneTime = budgetRecurringIncome.reduce((sum, item) => sum + (item.onetimeamount || 0), 0);
console.log('Income Planned', incomePlanned)
console.log('Income Actual', incomeActual)
console.log('Income One Time', incomeOneTime)
//console.log(budgetRecurringIncome)

const budgetData = {
  mainSales: [
      { name: "", startBalance: budgetPage?.startBalance, endBalance: budgetPage?.endBalance, difference: (Number(budgetPage?.startBalance) - Number(budgetPage?.endBalance)) }
    ]
};
const budgetDataExpenses = {
  expenses: [
    { name: "Expense Planned", value: budgetCategoryAmounts?.reduce((sum, item) => sum + (item.plannedamount || 0), 0) },
    { name: "Expense Actual", value: budgetCategoryAmounts?.reduce((sum, item) => sum + (item.actualamount || 0), 0) },
    { name: "Expense One Time", value: budgetCategoryAmounts?.reduce((sum, item) => sum + (item.onetimeamount || 0), 0) }
    ]
}
const budgetDataIncome = {
  income: [
    { name: "Income Planned", value: budgetRecurringIncome?.reduce((sum, item) => sum + (item.plannedamount || 0), 0) },
    { name: "Income Actual", value: budgetRecurringIncome?.reduce((sum, item) => sum + (item.actualamount || 0), 0) },
    { name: "Income One Time", value: budgetRecurringIncome?.reduce((sum, item) => sum + (item.onetimeamount || 0), 0) }
    ]
}

let fetchedTransactions: Transactions[];
fetchedTransactions = transactions;

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return (
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 animate-pulse">
        <div className="col-span-1 h-80 rounded-sm bg-white lg:col-span-12"></div>
      </div>
    );
  }

  // Bind active dynamic data based on current state hook
  const activeData = datasets[timeFilter];

  return (
    <div className="space-y-6">
      
      {/* --- TIMELINE SELECTOR SUB-HEADER CARD --- */}
      <div className="flex items-center justify-between rounded-sm border border-[#e2e8f0] bg-white px-6 py-4 shadow-xs">
        <div>
          <h2 className="text-sm font-semibold text-[#1c2434]">Analytics Scope</h2>
          <p className="text-xs text-[#64748b]">Filter data layers application-wide</p>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={budgetData.mainSales}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" tickLine={false} fontSize={12} />
                <YAxis stroke="#64748b" tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#1c2434", borderRadius: "4px", border: "none" }}
                  labelStyle={{ color: "#fff", fontWeight: "bold" }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: "15px", fontSize: "14px" }} />
                <Bar dataKey="startBalance" name="Start Balance" fill="#3c50e0" maxBarSize={40} />
                <Bar dataKey="endBalance" name="End Balance" fill="#80caee" maxBarSize={40} />
                <Bar dataKey="difference" name="Difference" fill="#F46524" maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>   
        
        {/* TailAdmin Premium Native Styled Dropdown */}
        <div className="relative z-20 inline-block bg-[#f1f5f9] rounded-md px-2 py-1 border border-[#e2e8f0]">
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value as FilterType)}
            className="relative z-20 inline-flex text-sm font-medium bg-transparent text-[#1c2434] pr-8 pl-2 py-1.5 outline-hidden appearance-none cursor-pointer"
          >
            <option value="7days">Last 7 Days</option>
            <option value="month">Last Month</option>
            <option value="year">This Year</option>
          </select>
          {/* Custom Arrow Accent Icon */}
          <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2 text-xs pointer-events-none text-[#64748b]">
            ▼
          </span>
        </div>
      </div>

      {/* MINE */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        
        {/* DONUT GRAPH */}
        <div className="col-span-1 rounded-sm border border-[#e2e8f0] bg-white p-6 shadow-xs lg:col-span-6">
          <h3 className="text-lg font-bold text-[#1c2434] mb-1">Income</h3>
          <p className="text-xs text-[#64748b] mb-4">Income by type</p>
          
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={budgetDataIncome.income}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {budgetDataIncome.income.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" layout="vertical" align="right" verticalAlign="middle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* STANDARD PIE GRAPH */}
        <div className="col-span-1 rounded-sm border border-[#e2e8f0] bg-white p-6 shadow-xs lg:col-span-6">
          <h3 className="text-lg font-bold text-[#1c2434] mb-1">Expense</h3>
          <p className="text-xs text-[#64748b] mb-4">Expenses split by expense type</p>
          
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={budgetDataExpenses.expenses}
                  cx="50%"
                  cy="50%"
                  outerRadius={85}
                  labelLine={false}
                  dataKey="value"
                >
                  {budgetDataExpenses.expenses.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" layout="vertical" align="right" verticalAlign="middle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        
        {/* DONUT GRAPH */}
        {/* <div className="col-span-1 rounded-sm border border-[#e2e8f0] bg-white p-6 shadow-xs lg:col-span-6">
          <h3 className="text-lg font-bold text-[#1c2434] mb-1">Recurring Expenses</h3>
          <p className="text-xs text-[#64748b] mb-4">Recurring Expenses</p>
          
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <FlowbiteTableExample rawRows={fetchedBudgets} />
            </ResponsiveContainer>
          </div>
        </div> */}
        <FlowbiteTableExample rawRows={fetchedTransactions} />

        {/* STANDARD PIE GRAPH */}
        <div className="col-span-1 rounded-sm border border-[#e2e8f0] bg-white p-6 shadow-xs lg:col-span-6">
          <h3 className="text-lg font-bold text-[#1c2434] mb-1">Daily Expenses</h3>
          <p className="text-xs text-[#64748b] mb-4">Daily Expenses</p>
          
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={budgetDataExpenses.expenses}
                  cx="50%"
                  cy="50%"
                  outerRadius={85}
                  labelLine={false}
                  dataKey="value"
                >
                  {budgetDataExpenses.expenses.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" layout="vertical" align="right" verticalAlign="middle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
      
      {/* END MINE */}

      {/* --- BAR GRAPH ROW --- */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="col-span-1 rounded-sm border border-[#e2e8f0] bg-white p-6 shadow-xs lg:col-span-12">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-[#1c2434]">Profit & Revenue</h3>
            <p className="text-xs text-[#64748b]">Showing metrics relative to filters</p>
          </div>
          
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={activeData.mainSales}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" tickLine={false} fontSize={12} />
                <YAxis stroke="#64748b" tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#1c2434", borderRadius: "4px", border: "none" }}
                  labelStyle={{ color: "#fff", fontWeight: "bold" }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: "15px", fontSize: "14px" }} />
                <Bar dataKey="revenue" name="Total Revenue" fill="#3c50e0" maxBarSize={40} />
                <Bar dataKey="profit" name="Net Profit" fill="#80caee" maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* --- DONUT & PIE GRID SPLIT ROW --- */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        
        {/* DONUT GRAPH */}
        <div className="col-span-1 rounded-sm border border-[#e2e8f0] bg-white p-6 shadow-xs lg:col-span-6">
          <h3 className="text-lg font-bold text-[#1c2434] mb-1">Traffic Channels</h3>
          <p className="text-xs text-[#64748b] mb-4">Device classification shares</p>
          
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={activeData.traffic}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {activeData.traffic.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" layout="vertical" align="right" verticalAlign="middle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* STANDARD PIE GRAPH */}
        <div className="col-span-1 rounded-sm border border-[#e2e8f0] bg-white p-6 shadow-xs lg:col-span-6">
          <h3 className="text-lg font-bold text-[#1c2434] mb-1">Category Distribution</h3>
          <p className="text-xs text-[#64748b] mb-4">Sales split by inventory type</p>
          
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={activeData.categories}
                  cx="50%"
                  cy="50%"
                  outerRadius={85}
                  labelLine={false}
                  dataKey="value"
                >
                  {activeData.categories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" layout="vertical" align="right" verticalAlign="middle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}




// V1
// "use client";

// import React, { useState, useEffect } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell
// } from "recharts";

// // Mock Data matching a typical TailAdmin eCommerce flow
// const monthlySalesData = [
//   { name: "Jan", revenue: 4000, profit: 2400 },
//   { name: "Feb", revenue: 3000, profit: 1398 },
//   { name: "Mar", revenue: 9800, profit: 5700 },
//   { name: "Apr", revenue: 3908, profit: 2780 },
//   { name: "May", revenue: 4800, profit: 1890 },
//   { name: "Jun", revenue: 6800, profit: 4300 },
// ];

// const trafficSourceData = [
//   { name: "Desktop", value: 450 },
//   { name: "Mobile", value: 320 },
//   { name: "Tablet", value: 130 },
// ];

// const categoryDistributionData = [
//   { name: "Electronics", value: 400 },
//   { name: "Clothing", value: 300 },
//   { name: "Appliances", value: 200 },
//   { name: "Accessories", value: 100 },
// ];

// // TailAdmin Palette Colors
// const COLORS = ["#3c50e0", "#80caee", "#f2994a", "#1c2434"];

// export default function DashboardCharts() {
//   const [hasMounted, setHasMounted] = useState(false);

//   // Prevent Next.js SSR hydration crashes from internal Recharts window calculations
//   useEffect(() => {
//     setHasMounted(true);
//   }, []);

//   if (!hasMounted) {
//     return (
//       <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 animate-pulse">
//         <div className="col-span-1 h-80 rounded-sm bg-white lg:col-span-8"></div>
//         <div className="col-span-1 h-80 rounded-sm bg-white lg:col-span-4"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
      
//       {/* --- TOP ROW: BAR GRAPH (ACCOMODATING MAIN SITE METRICS) --- */}
//       <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
//         <div className="col-span-1 rounded-sm border border-[#e2e8f0] bg-white p-6 shadow-xs lg:col-span-12">
//           <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
//             <div>
//               <h3 className="text-xl font-bold text-[#1c2434]">Profit & Revenue Analytics</h3>
//               <p className="text-xs text-[#64748b]">Monthly performance overview</p>
//             </div>
//           </div>
          
//           <div className="h-80 w-full">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart
//                 data={monthlySalesData}
//                 margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
//                 <XAxis dataKey="name" stroke="#64748b" tickLine={false} fontSize={12} />
//                 <YAxis stroke="#64748b" tickLine={false} axisLine={false} fontSize={12} />
//                 <Tooltip 
//                   contentStyle={{ backgroundColor: "#1c2434", borderRadius: "4px", border: "none" }}
//                   labelStyle={{ color: "#fff", fontWeight: "bold" }}
//                 />
//                 <Legend iconType="circle" wrapperStyle={{ paddingTop: "15px", fontSize: "14px" }} />
//                 {/* Revenue Bar */}
//                 <Bar dataKey="revenue" name="Total Revenue" fill="#3c50e0" radius={[4, 4, 0, 0]} maxBarSize={40} />
//                 {/* Profit Bar */}
//                 <Bar dataKey="profit" name="Net Profit" fill="#80caee" radius={[4, 4, 0, 0]} maxBarSize={40} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>

//       {/* --- BOTTOM ROW: PIE GRAPH & DONUT GRAPH SPLIT --- */}
//       <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        
//         {/* DONUT CHART BLOCK */}
//         <div className="col-span-1 rounded-sm border border-[#e2e8f0] bg-white p-6 shadow-xs lg:col-span-6">
//           <h3 className="text-lg font-bold text-[#1c2434] mb-1">Traffic Channels</h3>
//           <p className="text-xs text-[#64748b] mb-4">Device classification shares</p>
          
//           <div className="h-64 w-full flex items-center justify-center">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={trafficSourceData}
//                   cx="50%"
//                   cy="50%"
//                   innerRadius={60} // Creates the internal hole for the Donut shape
//                   outerRadius={85}
//                   paddingAngle={3}
//                   dataKey="value"
//                 >
//                   {trafficSourceData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//                 <Legend iconType="circle" layout="vertical" align="right" verticalAlign="middle" />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* STANDARD PIE CHART BLOCK */}
//         <div className="col-span-1 rounded-sm border border-[#e2e8f0] bg-white p-6 shadow-xs lg:col-span-6">
//           <h3 className="text-lg font-bold text-[#1c2434] mb-1">Category Distribution</h3>
//           <p className="text-xs text-[#64748b] mb-4">Sales split by inventory type</p>
          
//           <div className="h-64 w-full flex items-center justify-center">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={categoryDistributionData}
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={85} // Filled completely to make a standard solid Pie
//                   labelLine={false}
//                   dataKey="value"
//                 >
//                   {categoryDistributionData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//                 <Legend iconType="circle" layout="vertical" align="right" verticalAlign="middle" />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//       </div>

//     </div>
//   );
// }
