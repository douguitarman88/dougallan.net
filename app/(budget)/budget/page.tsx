import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { signOut } from '../../(login)/login/actions' //'../login/actions'
import DashboardCharts from "@/components/budget/DashboardCharts";
import SideBarTest from '@/components/budget/sidebar';


export default async function BudgetPage() {
  const supabase = await createClient();
  // 2. Fetch the user profile data securely on the backend
  const { data: { user } } = await supabase.auth.getUser()

  // 3. Call your Postgres RPC function directly from the server!
  let budgetPage = null
  let budgetCategoryAmounts = null;
  let budgetRecurringIncome = null;
  let transactions = null;

  if (user) {
    const { data: budgetData } = await supabase.rpc("getbudgetpage_budget", {
      p_budgetid: 1
    })
    budgetPage = budgetData?.[0];

    const { data: budgetCategoryAmountsData } = await supabase.rpc("getbudgetpage_budgetcatamounts", {
      p_budgetid: 1
    })
    budgetCategoryAmounts = budgetCategoryAmountsData

    const { data: budgetRecurringIncomeData } = await supabase.rpc("getbudgetpage_recurringincome", {
      p_budgetid: 1
    })
    budgetRecurringIncome = budgetRecurringIncomeData

    const { data: transactionsData } = await supabase.rpc("getbudgetpage_transactions", {
      p_budgetid: 1
    })
    transactions = transactionsData
  }
//console.log(budgetCategoryAmounts)



  const firstName = user?.user_metadata?.first_name || "Guest"
  // const supabase = await createClient()

  // // Always use getUser() on the server for security verification, not getSession()
  // const { data: { user }, error } = await supabase.auth.getUser()

  // if (error || !user) {
  //   redirect('/login')
  // }

  return (
    <main className="flex-1 overflow-y-auto">
     <div className="p-10 lg:p-0 space-y-12">
        <div className="flex items-end justify-between border-b border-slate-200 pb-12">
           <div>
              <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em]">Integrated Layout</span>
              <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Current Budget</h1>
              <h1>Welcome {firstName} to your Budget</h1>
              {budgetPage && <p>{budgetPage.budgetname}</p>}
      {/* <p>Logged in as: <strong>{user.email}</strong></p> */}

      {/* 1. Only show the logout button if a user session actually exists */}
        {/* {user && (
          <form action={signOut}>
            <button 
              type="submit" 
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Log Out
            </button>
          </form>
        )} */}
           </div>
        </div>

        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
           <div className="h-[40rem] bg-white rounded-[4rem] border border-slate-200 shadow-sm p-12">
              <div className="h-full w-full bg-slate-50/50 rounded-[3rem] border border-dashed border-slate-200"></div>
           </div>
           <div className="space-y-12">
              <div className="h-72 bg-white rounded-[3rem] border border-slate-200 shadow-sm p-10"></div>
              <div className="h-72 bg-white rounded-[3rem] border border-slate-200 shadow-sm p-10"></div>
           </div>
        </div> */}

        {/* --- INJECT THE RECHARTS LAYOUT INTERACTIVITY HERE --- */}
        {/* <SideBarTest /> */}
      <DashboardCharts budgetPage={budgetPage} budgetCategoryAmounts={budgetCategoryAmounts} budgetRecurringIncome={budgetRecurringIncome} transactions={transactions} />

     </div>
  </main>
    // <main style={{ padding: '2rem' }}>
      // <h1>Welcome to your Budget</h1>
      // <p>Logged in as: <strong>{user.email}</strong></p>

      // {/* 1. Only show the logout button if a user session actually exists */}
      //   {user && (
      //     <form action={signOut}>
      //       <button 
      //         type="submit" 
      //         style={{
      //           padding: '0.5rem 1rem',
      //           backgroundColor: '#ef4444',
      //           color: 'white',
      //           border: 'none',
      //           borderRadius: '4px',
      //           cursor: 'pointer',
      //           fontWeight: 'bold'
      //         }}
      //       >
      //         Log Out
      //       </button>
      //     </form>
      //   )}
    // </main>
  )
}