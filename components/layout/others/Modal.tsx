// components/layout/profile/Modal.tsx
"use client";

import { useEffect, useState } from "react";
import { HiXMark } from "react-icons/hi2";
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setVisible(true), 10);
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setVisible(false);
    // Delay unmounting so exit animation can play
    setTimeout(onClose, 200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className={`absolute inset-0 bg-black/50 backdrop-blur-md transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Modal panel with animation */}
      <div
        className={`
          relative w-full max-w-[390px] mx-auto bg-[#1e1e1e] rounded-[24px]
          border border-white/[0.08] shadow-2xl overflow-hidden
          transition-all duration-300 ease-out
          ${visible ? "translate-y-0 scale-100 opacity-100" : "translate-y-4 scale-95 opacity-0"}
        `}
        style={{
          boxShadow: "0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        {/* Glow effect */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
          <h3
            className="text-white text-lg"
            style={{ fontFamily: "PT Serif, serif", fontWeight: 400 }}
          >
            {title}
          </h3>
          <button
            onClick={handleClose}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 transition-colors group"
          >
            <HiXMark size={18} className="text-white/70 group-hover:text-white transition-colors" />
          </button>
        </div>

        {/* Content */}
        <div className="px-5 py-5 max-h-[65vh] overflow-y-auto no-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
}