"use client";

import { FarmPlan } from "@/libs/types";

// Carbs / leaf icon SVG
function CarbsIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Simplified leaf/plant icon */}
      <path
        d="M12 3C12 3 7 7 7 12C7 15.3137 9.23858 18 12 18C14.7614 18 17 15.3137 17 12C17 7 12 3 12 3Z"
        fill="white"
        opacity="0.85"
      />
      <path
        d="M12 3C12 3 8 8.5 8.5 13"
        stroke="white"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.4"
      />
      <line
        x1="12"
        y1="18"
        x2="12"
        y2="21"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

// Adjust icon (two arrows)
function AdjustIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 8H5M5 8C5 9.10457 5.89543 10 7 10C8.10457 10 9 9.10457 9 8C9 6.89543 8.10457 6 7 6C5.89543 6 5 6.89543 5 8ZM5 8H21"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M3 16H15M15 16C15 17.1046 15.8954 18 17 18C18.1046 18 19 17.1046 19 16C19 14.8954 18.1046 14 17 14C15.8954 14 15 14.8954 15 16ZM15 16H21"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

interface PlanCardProps {
  plan: FarmPlan;
  onPress?: (plan: FarmPlan) => void;
}

export default function PlanCard({ plan, onPress }: PlanCardProps) {
  const progressPct = (plan.cyclesCompleted / plan.totalCycles) * 100;

  const progressGradient =
    plan.progressColor === "green"
      ? "linear-gradient(to bottom, #01ff23, #13d82d 45%, #0cba23)"
      : plan.progressColor === "white"
      ? "linear-gradient(to top, #fafafa, #e4e4e4 45%, #ffffff)"
      : "linear-gradient(to bottom, #FFD700, #FFA500)";

  return (
    <div
      className="flex flex-col gap-4 w-full cursor-pointer"
      onClick={() => onPress?.(plan)}
    >
      {/* Plan row */}
      <div
        className="relative flex items-center justify-between w-full h-17.75 pl-3.75 pr-4.5 py-3 rounded-[10px] overflow-hidden transition-opacity active:opacity-80"
        style={{ background: "#232323" }}
      >
        {/* Highlight glow */}
        <div
          className="absolute inset-0 pointer-events-none rounded-[10px]"
          style={{
            boxShadow:
              "inset 0px -4px 10px rgba(250,250,250,0.05), inset 0px 7px 10px rgba(250,250,250,0.10)",
          }}
        />

        {/* Left: icon + info */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10.75 h-10.75 rounded-[21.5px] bg-[#454545]">
            <CarbsIcon />
          </div>

          <div className="flex flex-col gap-2.25 w-34.5">
            <p
              className="text-white text-[16px] leading-normal"
              style={{ fontFamily: "'PT Serif', serif", fontWeight: 400 }}
            >
              {plan.name}
            </p>
            <div className="flex items-center gap-4 text-[#cdcdcd] text-[10px] whitespace-nowrap">
              <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400 }}>
                Next Harvest
              </span>
              <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500 }}>
                {plan.nextHarvestIn}
              </span>
            </div>
          </div>
        </div>

        {/* Right: adjust icon */}
        <AdjustIcon />
      </div>

      {/* Progress section */}
      <div className="flex flex-col gap-1.75 w-full">
        {/* Label row */}
        <div className="flex items-center justify-between text-[12px] whitespace-nowrap">
          <span
            className="text-[#cdcdcd]"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400 }}
          >
            Cycles Completed
          </span>
          <span
            className="text-[#fafafa]"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500 }}
          >
            {plan.cyclesCompleted}/{plan.totalCycles}
          </span>
        </div>

        {/* Progress bar track */}
        <div
          className="flex items-center w-full h-10.25 p-0.5  rounded-[20.5px] border-[0.5px] border-white/30"
          style={{ background: "#333" }}
        >
          <div
            className="h-full rounded-[18px] transition-all duration-700"
            style={{
              width: `${progressPct}%`,
              background: progressGradient,
              minWidth: progressPct > 0 ? "36px" : "0px",
            }}
          />
        </div>
      </div>
    </div>
  );
}