"use client";

import { useState, useEffect } from "react";
import { NavTab, FarmPlan } from "@/libs/types";
import { MOCK_PROFILE, MOCK_PLANS } from "@/libs/data/data";
import BottomNav from "@/components/ui/BottomNav";
import HomeContent from "@/components/section/HomeContent";
import AddPlanModal from "@/components/layout/plans/AddPlanModal";
import WalletPage from "@/components/layout/others/WalletPage";
import ProfilePage from "@/components/layout/others/ProfilePage";
import Loader from "@/components/ui/Loader";

export default function PlansPage() {
  const [activeTab, setActiveTab] = useState<NavTab>("home");
  const [showAddModal, setShowAddModal] = useState(false);
  const [plans, setPlans] = useState<FarmPlan[]>(MOCK_PLANS);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate page loading (remove or replace with real data fetching)
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

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

  // Show the loader while the app initialises
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#1a1a1a]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-[#1a1a1a]">
      {/* 
        Content area: fills available space, scrollable, 
        with padding at the bottom to avoid overlap with fixed BottomNav.
        Adjust pb-[100px] to match your BottomNav height.
      */}
      <main className="flex-1 overflow-y-auto px-5 pb-[100px] no-scrollbar">
        {activeTab === "home" && (
          <HomeContent
            plans={plans}
            onPlanPress={(p) => console.log("plan pressed", p.id)}
          />
        )}
        {activeTab === "wallet" && <WalletPage />}
        {activeTab === "profile" && <ProfilePage />}
      </main>

      {/* Fixed Bottom Navigation (static at the bottom of the screen) */}
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