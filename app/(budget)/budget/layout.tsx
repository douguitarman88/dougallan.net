
//"use client" // why do i need this here?
//import React, { useState } from "react";
import "./tailwind.css";
import DashboardShell from "../../../components/budget/dashboardshell"; //"@/components/DashboardShell";
import SidebarNavLink from "../../../components/budget/SidebarNavLink";
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { signOut } from '../../(login)/login/actions' //'../login/actions';
import Sidebar from '../../../components/budget/sidebar';
import Script from 'next/script'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  // ADDED FOR TESTING
  const supabase = await createClient()

  // Always use getUser() on the server for security verification, not getSession()
  const { data: { user }, error } = await supabase.auth.getUser();
  
  let firstName = null;
  let lastName = null;
  let firstInitial = '';
  let lastInitial = '';

  if (user) {
    //const firstName = user.user_metadata.first_name;
    firstName = user?.user_metadata?.first_name || "Guest";
    firstInitial = firstName ? firstName[0].toUpperCase() : "";
    //const lastName = user.user_metadata.last_name;
    lastName = user?.user_metadata?.last_name || "Guest";
    lastInitial = firstName ? lastName[0].toUpperCase() : "";

    console.log(`Welcome, ${firstName} ${lastName}!`);
}

  if (error || !user) {
    redirect('/login')
  }

  // Desktop collapse state (fully open vs icon-only thin strip)
  // const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // // Mobile overlay state
  // const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  // END TESTING


  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/flowbite@4.0.1/dist/flowbite.min.css"
          precedence="default"
        />
      </head>
      <body className="bg-slate-50 text-slate-900 antialiased">
        <div className="flex h-screen w-screen overflow-hidden bg-[#f1f5f9] text-[#64748b] font-sans antialiased">

        {/* --- SIDEBAR OVERLAY FOR MOBILE --- */}
              {/* {isMobileOpen && (
                <div 
                  className="fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden"
                  onClick={() => setIsMobileOpen(false)}
                />
              )} */}
        
              {/* --- SIDEBAR COMPONENT --- */}
              <aside
                className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-[#1c2434] text-[#dee4ee] transition-all duration-300 ease-in-out lg:static
                  w-72.5`}
              >
              {/* <aside
                className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-[#1c2434] text-[#dee4ee] transition-all duration-300 ease-in-out lg:static
                  ${isSidebarOpen ? "w-72.5" : "w-0 lg:w-22"} 
                  ${isMobileOpen ? "translate-x-0 w-72.5" : "-translate-x-full lg:translate-x-0"}`}
              > */}
                {/* Sidebar Header */}
                <div className="flex h-20 items-center justify-between px-6 py-5.5">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-[#3c50e0] flex items-center justify-center font-bold text-white text-lg">T</div>
                    {/* {(isSidebarOpen || isMobileOpen) && (
                      <span className="text-2xl font-semibold text-white tracking-wide">TailAdmin</span>
                    )} */}
                  </div>
                  {/* Mobile close button */}
                  {/* <button className="lg:hidden text-slate-400 hover:text-white" onClick={() => setIsMobileOpen(false)}>
                    ✕
                  </button> */}
                </div>
        
                {/* Sidebar Navigation Links */}
                <nav className="flex-1 overflow-y-auto px-4 py-4 scrollbar-thin">
          {/* <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#8a99ad] px-2">
            {(isSidebarOpen || isMobileOpen) ? "MENU" : "•••"}
          </div> */}
          <ul className="space-y-1.5">
            
            {/* Map over data structure supplying nested items values optional array parameter */}
            {[
              { 
                label: "Dashboard", 
                icon: "📊", 
                subItems: [
                  { label: "eCommerce", href: "/dashboard" },
                  { label: "Analytics", href: "#" },
                  { label: "Marketing", href: "#" },
                ] 
              },
              { 
                label: "AI Assistant", 
                icon: "🤖",
                subItems: [
                  { label: "Text Generator", href: "#" },
                  { label: "Image Generator", href: "#" },
                ]
              },
              { label: "Calendar", icon: "📅" },
              { label: "Profile", icon: "👤" },
              { label: "Settings", icon: "⚙️" },
            ].map((item, index) => (
              <SidebarNavLink
                key={index}
                label={item.label}
                icon={item.icon}
                isSidebarOpen={true}//{isSidebarOpen}
                isMobileOpen={false}//{isMobileOpen}
                subItems={item.subItems}
              />
            ))}
            
          </ul>
        </nav>
        
                {/* <nav className="flex-1 overflow-y-auto px-4 py-4 scrollbar-thin">
                  <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#8a99ad] px-2">
                    {(isSidebarOpen || isMobileOpen) ? "MENU" : "•••"}
                  </div>
                  <ul className="space-y-1.5">
                    {[
                      { label: "Dashboard", icon: "📊", active: true },
                      { label: "Calendar", icon: "📅" },
                      { label: "Profile", icon: "👤" },
                      { label: "Forms", icon: "📋" },
                      { label: "Tables", icon: "grid_view" },
                      { label: "Settings", icon: "⚙️" },
                    ].map((item, index) => (
                      <li key={index}>
                        <a
                          href="#"
                          className={`flex items-center gap-2.5 rounded-sm px-4 py-3 font-medium transition-colors hover:bg-[#333a48] hover:text-white
                            ${item.active ? "bg-[#333a48] text-white" : "text-[#a6b5cc]"}
                            ${!isSidebarOpen && !isMobileOpen ? "justify-center" : ""}`}
                        >
                          <span className="text-lg">{item.icon}</span>
                          {(isSidebarOpen || isMobileOpen) && <span>{item.label}</span>}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav> */}
              </aside>
              {/* --- MAIN CONTENT WRAPPER --- */}
      <div className="flex flex-1 flex-col overflow-hidden">
        
        {/* --- TOP HEADER NAVIGATION --- */}
        {/* <Header /> */}
        <header className="flex h-20 w-full items-center justify-between border-b border-[#e2e8f0] bg-white px-4 shadow-sm md:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            {/* Mobile Sidebar Hamburger Toggle */}
            {/* <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="rounded-sm border border-[#e2e8f0] bg-white p-1.5 shadow-sm hover:bg-slate-50 lg:hidden text-black"
            >
              ☰
            </button> */}

            {/* Desktop Sidebar Collapse Toggle */}
            {/* <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hidden rounded-sm border border-[#e2e8f0] bg-white p-1.5 shadow-sm hover:bg-slate-50 lg:block text-black"
            >
              ☰
            </button> */}

            {/* Search Bar */}
            <div className="hidden sm:block">
              
            </div>
          </div>

          {/* Top Header Controls (User/Notification block) */}
          <div className="flex items-center gap-4 text-[#1c2434]">
            {/* <div className="relative flex h-8 w-8 items-center justify-center rounded-full border border-[#e2e8f0] bg-[#eff4fb] hover:text-[#3c50e0] cursor-pointer">
              🔔
            </div> */}
            <div className="flex items-center gap-3">
              <div className="hidden text-right md:block">
                <span className="block text-sm font-medium text-black"><strong>{firstName}&nbsp;{lastName} </strong></span>
                {/* <span className="block text-xs font-medium text-[#64748b]">Admin</span> */}

                {/* 1. Only show the logout button if a user session actually exists */}
                {user && (
                  <form action={signOut}>
                    <button 
                      type="submit" 
                      style={{
                      //   //padding: '0.5rem 1rem',
                      //   //backgroundColor: '#ef4444',
                      //   color: 'inherit',
                      //   border: 'none',
                      //   //borderRadius: '4px',
                         cursor: 'pointer',
                      //   fontWeight: 'bold'
                      }}
                      className={"block text-sm font-bold text-black"}
                    >
                      Log Out
                    </button>
                  </form>
                )}
              </div>
              <div className="h-11 w-11 rounded-full bg-slate-300 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center bg-[#3c50e0] text-white font-bold">{firstInitial}{lastInitial}</div>
              </div>
            </div>
          </div>
        </header>

        {/* --- MAIN CENTRAL WORKSPACE --- */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-10">
          <div className="mx-auto">
            {/* max-w-270 */}
            {children}
          </div>
        </main>

      </div>

        {/* <DashboardShell><main>{children}</main></DashboardShell> */}
        </div>
        
        <Script 
          src="https://cdn.jsdelivr.net/npm/flowbite@4.0.1/dist/flowbite.min.js" 
          strategy="afterInteractive" 
        />

      </body>
    </html>
  );
}
