// components/layout/plans/PlansList.tsx
"use client";

import { FarmPlan } from "@/libs/types";
import PlanCard from "./PlanCard";

interface PlansListProps {
  plans: FarmPlan[];
  onPlanPress?: (plan: FarmPlan) => void;
}

function Divider() {
  return (
    <div className="w-full h-px relative">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute inset-0 bg-white/[0.02]" />
    </div>
  );
}

export default function PlansList({ plans, onPlanPress }: PlansListProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Section label */}
      <p
        className="text-[#b0b0b0] text-sm"
        style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400 }}
      >
        Your Plans
      </p>

      {/* Cards with dividers */}
      <div className="flex flex-col gap-4">
        {plans.map((plan, index) => (
          <div key={plan.id} className="flex flex-col gap-4">
            <PlanCard plan={plan} onPress={onPlanPress} />
            {index < plans.length - 1 && <Divider />}
          </div>
        ))}
      </div>
    </div>
  );
}