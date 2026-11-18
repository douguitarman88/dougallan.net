import React, { useState } from "react";
import SidebarNavLink from '../../../components/budget/SidebarNavLink'
// DEPRECATED
export default function Sidebar() {

    // Desktop collapse state (fully open vs icon-only thin strip)
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    // Mobile overlay state
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    return
    (
        <>
        {/* --- SIDEBAR COMPONENT --- */}
              <aside
                className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-[#1c2434] text-[#dee4ee] transition-all duration-300 ease-in-out lg:static
                  ${isSidebarOpen ? "w-72.5" : "w-0 lg:w-22"} 
                  ${isMobileOpen ? "translate-x-0 w-72.5" : "-translate-x-full lg:translate-x-0"}`}
              >
                {/* Sidebar Header */}
                <div className="flex h-20 items-center justify-between px-6 py-5.5">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-[#3c50e0] flex items-center justify-center font-bold text-white text-lg">T</div>
                    {(isSidebarOpen || isMobileOpen) && (
                      <span className="text-2xl font-semibold text-white tracking-wide">TailAdmin</span>
                    )}
                  </div>
                  {/* Mobile close button */}
                  <button className="lg:hidden text-slate-400 hover:text-white" onClick={() => setIsMobileOpen(false)}>
                    ✕
                  </button>
                </div>
        
                {/* Sidebar Navigation Links */}
                <nav className="flex-1 overflow-y-auto px-4 py-4 scrollbar-thin">
          <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#8a99ad] px-2">
            {(isSidebarOpen || isMobileOpen) ? "MENU" : "•••"}
          </div>
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
                isSidebarOpen={isSidebarOpen}
                isMobileOpen={isMobileOpen}
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
        </>
    );
}