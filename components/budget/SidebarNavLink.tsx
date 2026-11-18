"use client";

import React, { useState } from "react";

interface SubItem {
  label: string;
  href: string;
}

interface SidebarNavLinkProps {
  label: string;
  icon: string;
  isSidebarOpen: boolean;
  isMobileOpen: boolean;
  subItems?: SubItem[];
  active?: boolean;
}

export default function SidebarNavLink({
  label,
  icon,
  isSidebarOpen,
  isMobileOpen,
  subItems,
  active,
}: SidebarNavLinkProps) {
  const [isOpen, setIsOpen] = useState(false);
  const showText = isSidebarOpen || isMobileOpen;

  // If there are no children items, render a standard direct anchor link
  if (!subItems) {
    return (
      <a
        href="#"
        className={`flex items-center gap-2.5 rounded-sm px-4 py-3 font-medium transition-colors hover:bg-[#333a48] hover:text-white
          ${active ? "bg-[#333a48] text-white" : "text-[#a6b5cc]"}
          ${!showText ? "justify-center" : ""}`}
      >
        <span className="text-lg">{icon}</span>
        {showText && <span>{label}</span>}
      </a>
    );
  }

  return (
    <li>
      {/* Top Header Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex w-full items-center justify-between rounded-sm px-4 py-3 font-medium transition-colors hover:bg-[#333a48] hover:text-white text-[#a6b5cc]
          ${isOpen ? "bg-[#333a48] text-white" : ""}
          ${!showText ? "justify-center" : ""}`}
      >
        <div className="flex items-center gap-2.5">
          <span className="text-lg">{icon}</span>
          {showText && <span>{label}</span>}
        </div>

        {/* Dynamic Chevron Arrow Accent Indicator */}
        {showText && (
          <span
            className={`text-xs transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        )}
      </button>

      {/* --- COLLAPSIBLE NESTED CHILD LIST --- */}
      {isOpen && showText && (
        <ul className="mt-1 space-y-1 pl-9 transition-all duration-300">
          {subItems.map((sub, index) => (
            <li key={index}>
              <a
                href={sub.href}
                className="block rounded-sm py-2 text-sm font-medium text-[#a6b5cc] transition-colors hover:text-white"
              >
                {sub.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
