// components/layout/plans/AddPlanModal.tsx
"use client";

import { useState, useEffect } from "react";
import {
  HiOutlineXMark,
  HiOutlineCheckCircle,
  HiOutlineStar,
  HiOutlineSparkles,
} from "react-icons/hi2";

interface AddPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd?: (planName: string) => void;
}

interface PlanOption {
  id: string;
  name: string;
  price: string;
  roi: string;
  duration: string;
  icon: React.ReactNode;
  description: string;
}

const AVAILABLE_PLANS: PlanOption[] = [
  {
    id: "starter",
    name: "Starter Plan",
    price: "$10",
    roi: "20% ROI",
    duration: "30 days",
    icon: <HiOutlineSparkles size={22} />,
    description: "Begin your farm journey with a small stake.",
  },
  {
    id: "basic",
    name: "Basic Plan",
    price: "$50",
    roi: "35% ROI",
    duration: "30 days",
    icon: <HiOutlineStar size={22} />,
    description: "Steady growth with moderate returns.",
  },
  {
    id: "pro",
    name: "Pro Plan",
    price: "$200",
    roi: "55% ROI",
    duration: "30 days",
    icon: <HiOutlineSparkles size={22} />,
    description: "Accelerate your earnings with higher yield.",
  },
  {
    id: "premium",
    name: "Premium Plan",
    price: "$500",
    roi: "80% ROI",
    duration: "30 days",
    icon: <HiOutlineSparkles size={22} />,
    description: "Maximum returns for experienced farmers.",
  },
];

export default function AddPlanModal({ isOpen, onClose, onAdd }: AddPlanModalProps) {
  const [selected, setSelected] = useState<string | null>(null);
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
    setTimeout(onClose, 200);
  };

  const handleAdd = () => {
    if (selected) {
      const plan = AVAILABLE_PLANS.find((p) => p.id === selected);
      onAdd?.(plan?.name ?? "");
      handleClose();
    }
  };

  if (!isOpen) return null;

  // Find selected plan details for CTA text
  const selectedPlan = AVAILABLE_PLANS.find((p) => p.id === selected);

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end">
      {/* Backdrop with fade */}
      <div
        onClick={handleClose}
        className={`absolute inset-0 bg-black/50 backdrop-blur-md transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Sheet with slide-up animation */}
      <div
        className={`
          relative rounded-t-[28px] border-t border-x border-white/[0.08]
          bg-[#1a1a1a] p-6 flex flex-col gap-5
          transition-transform duration-300 ease-out
          ${visible ? "translate-y-0" : "translate-y-full"}
        `}
        style={{
          boxShadow: "0 -8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        {/* Glow effect behind the sheet */}
        <div className="absolute -top-12 right-10 w-36 h-36 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Handle bar */}
        <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto -mt-1 mb-1" />

        {/* Header with close button */}
        <div className="flex items-center justify-between">
          <h3
            className="text-white text-xl"
            style={{ fontFamily: "PT Serif, serif", fontWeight: 400 }}
          >
            Choose a Plan
          </h3>
          <button
            onClick={handleClose}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          >
            <HiOutlineXMark size={18} className="text-white/70" />
          </button>
        </div>

        {/* Plan list */}
        <div className="flex flex-col gap-3 max-h-[50vh] overflow-y-auto no-scrollbar">
          {AVAILABLE_PLANS.map((plan) => {
            const isActive = selected === plan.id;
            return (
              <button
                key={plan.id}
                onClick={() => setSelected(plan.id)}
                className={`
                  flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200
                  active:scale-[0.98] group
                  ${
                    isActive
                      ? "border-emerald-400/60 bg-gradient-to-r from-emerald-500/10 to-emerald-500/5"
                      : "border-white/[0.06] bg-[#232323] hover:bg-[#2a2a2a]"
                  }
                `}
                style={
                  isActive
                    ? { boxShadow: "0 0 15px rgba(46, 213, 115, 0.15)" }
                    : {}
                }
              >
                {/* Icon */}
                <div
                  className={`flex items-center justify-center w-11 h-11 rounded-full transition-colors ${
                    isActive
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-white/5 text-white/60 group-hover:text-white/80"
                  }`}
                >
                  {plan.icon}
                </div>

                {/* Plan details */}
                <div className="flex-1 flex flex-col items-start gap-0.5 min-w-0">
                  <span
                    className="text-white text-sm font-medium truncate"
                    style={{ fontFamily: "PT Serif, serif" }}
                  >
                    {plan.name}
                  </span>
                  <span className="text-[#a0a0a0] text-xs" style={{ fontFamily: "Poppins, sans-serif" }}>
                    {plan.duration} · {plan.roi}
                  </span>
                  {/* Description visible only when selected */}
                  {isActive && (
                    <span
                      className="text-emerald-400/80 text-[11px] mt-1 leading-tight"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {plan.description}
                    </span>
                  )}
                </div>

                {/* Price + check indicator */}
                <div className="flex items-center gap-2">
                  <span
                    className={`text-base font-semibold whitespace-nowrap ${
                      isActive ? "text-emerald-400" : "text-white"
                    }`}
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {plan.price}
                  </span>
                  {isActive && <HiOutlineCheckCircle size={20} className="text-emerald-400" />}
                </div>
              </button>
            );
          })}
        </div>
                  <button
          disabled={!selected}
          onClick={handleAdd}
            className="relative flex items-center justify-center w-full h-14 rounded-[15px] border-2 border-white/20 overflow-hidden transition-transform duration-150 active:scale-95"
          >
            {/* Green gradient bg */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180.45deg, #27FA43 1.33%, #05B41D 89.31%)",
              }}
            />
            {/* Inner gloss */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                boxShadow:
                  "inset -2px -4px 10px rgba(255,255,255,0.1), inset 2px 4px 10px rgba(255,255,255,0.25)",
              }}
            />
            <span
              className="relative text-[#232323] text-[14px] flex items-center justify-center gap-3"
              style={{ fontFamily: "'PT Serif', serif", fontWeight: 400 }}
            >
              {selectedPlan ? (
              <>
                Add {selectedPlan.name}{" "}
                <HiOutlineSparkles size={18} />
              </>
            ) : (
              "Select a Plan"
            )}
            </span>
          </button>
      </div>
    </div>
  );
}