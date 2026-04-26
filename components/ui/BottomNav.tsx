// components/ui/BottomNav.tsx
"use client";

import { NavTab } from "@/libs/types";
import { HiHome, HiWallet, HiUser, HiPlus } from "react-icons/hi2";
import { ReactElement } from "react";

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  onAddPress?: () => void;
}

export default function BottomNav({ activeTab, onTabChange, onAddPress }: BottomNavProps) {
  const navItems: { id: NavTab; icon: ReactElement; label: string }[] = [
    { id: "home", icon: <HiHome size={22} />, label: "Home" },
    { id: "wallet", icon: <HiWallet size={22} />, label: "Wallet" },
    { id: "profile", icon: <HiUser size={22} />, label: "Profile" },
  ];

  return (
    <>
      {/* Gradient blur backdrop – deeper and wider for liquid glass feel */}
      <div
        className="absolute bottom-0 left-0 w-full h-28 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(26,26,26,0.95) 0%, rgba(26,26,26,0.6) 40%, rgba(26,26,26,0) 100%)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      />

      {/* Nav bar row */}
      <div className="fixed z-50 bottom-6 left-5 right-5 flex items-center justify-between">
        {/* Main tabs container – liquid glass pill */}
        <div
          className="relative flex gap-1 p-1 rounded-full border border-white/20 overflow-hidden"
          style={{
            background: "rgba(30, 30, 30, 0.5)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
        >
          {/* Liquid shimmer overlay */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%, rgba(255,255,255,0.02) 100%)",
            }}
          />

          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`relative flex items-center gap-2 rounded-full transition-all duration-300 ease-out ${
                  isActive
                    ? "bg-white/15 p-5 py-4 shadow-inner"
                    : "p-5 hover:bg-white/5"
                }`}
              >
                <span className="text-white">{item.icon}</span>
                {isActive && (
                  <span
                    className="text-white text-xs font-medium whitespace-nowrap"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Add / FAB button – earthy green gradient */}
        <button
          onClick={onAddPress}
          className="flex items-center justify-center w-[60px] h-[60px] rounded-full border-[1.5px] border-white/40 transition-transform duration-200 active:scale-90"
          style={{
            background:
              "linear-gradient(139deg, #00CC1B 8%, #01F321 31%, #01FF23 59%, #01ED21 78%, #019915 103%)",
          }}
        >
          <HiPlus color="white" size={28} />
        </button>
      </div>
    </>
  );
}