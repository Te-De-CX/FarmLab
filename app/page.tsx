"use client";

import { useState } from "react";
import { NavTab, FarmPlan } from "@/libs/types";
import { MOCK_PROFILE, MOCK_PLANS } from "@/libs/data/data";
import StatusBar from "@/components/ui/Statusbar";
import BottomNav from "@/components/ui/BottomNav";
import HomeContent from "@/components/section/HomeContent";
import AddPlanModal from "@/components/layout/plans/AddPlanModal";
import WalletPage from "@/components/layout/others/WalletPage";
import ProfilePage from "@/components/layout/others/ProfilePage";

export default function PlansPage() {
  const [activeTab, setActiveTab] = useState<NavTab>("home");
  const [showAddModal, setShowAddModal] = useState(false);
  const [plans, setPlans] = useState<FarmPlan[]>(MOCK_PLANS);

  function handleAddPlan(planName: string) {
    const newPlan: FarmPlan = {
      id: `plan-${Date.now()}`,
      name: planName,
      tier: "starter",
      nextHarvestIn: "24hrs 0 min",
      cyclesCompleted: 0,
      totalCycles: 30,
      progressColor: "green",
    };
    setPlans((prev) => [...prev, newPlan]);
  }

  return (
    <div className="relative w-[430px] h-[932px] overflow-hidden mx-auto" style={{ background: "#1a1a1a" }}>
      {/* <StatusBar /> */}
      <div
        className="absolute top-[61px] left-[20px] right-[20px] bottom-[124px] overflow-y-auto no-scrollbar"
        style={{ scrollbarWidth: "none" }}
      >
        {activeTab === "home" && (
          <HomeContent
            plans={plans}
            onPlanPress={(p) => console.log("plan pressed", p.id)}
          />
        )}
        {activeTab === "wallet" && <WalletPage />}
        {activeTab === "profile" && <ProfilePage />}
      </div>

      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onAddPress={() => setShowAddModal(true)}
      />

      <AddPlanModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddPlan}
      />
    </div>
  );
}