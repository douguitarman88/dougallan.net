import React, { useState } from "react";
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { signOut } from '../../(login)/login/actions' //'../login/actions'

export default async function Header() {

const supabase = await createClient()

  // Always use getUser() on the server for security verification, not getSession()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/login')
  }

    return (
        <>
        {/* --- TOP HEADER NAVIGATION --- */}
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
              <input
                type="text"
                placeholder="Type to search..."
                className="w-64 bg-transparent pl-4 text-black focus:outline-hidden"
              />
            </div>
          </div>

          {/* Top Header Controls (User/Notification block) */}
          <div className="flex items-center gap-4 text-[#1c2434]">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full border border-[#e2e8f0] bg-[#eff4fb] hover:text-[#3c50e0] cursor-pointer">
              🔔
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden text-right md:block">
                {/* 1. Only show the logout button if a user session actually exists */}
        {user && (
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
        )}
                <span className="block text-sm font-medium text-black">{user.email}</span>
                <span className="block text-xs font-medium text-[#64748b]">Admin</span>
              </div>
              <div className="h-11 w-11 rounded-full bg-slate-300 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center bg-[#3c50e0] text-white font-bold">MC</div>
              </div>
            </div>
          </div>
        </header>
        </>
    )
}