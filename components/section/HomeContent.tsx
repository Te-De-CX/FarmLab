// components/layout/home/HomeContent.tsx
import { FarmPlan } from "@/libs/types";
import { MOCK_PROFILE } from "@/libs/data/data";
import ProfileHeader from "@/components/layout/plans/ProfileHeader";
import UpgradeBanner from "@/components/layout/plans/UpgradeBanner";
import PlansList from "@/components/layout/plans/PlansList";

interface HomeContentProps {
  plans: FarmPlan[];
  onPlanPress: (plan: FarmPlan) => void;
}

export default function HomeContent({ plans, onPlanPress }: HomeContentProps) {
  return (
    <div className="flex flex-col gap-8 pb-4">
      <div className="flex flex-col gap-7">
        <ProfileHeader profile={MOCK_PROFILE} onSortPress={() => {}} />
        <UpgradeBanner onUpgrade={() => {}} />
      </div>
      <PlansList plans={plans} onPlanPress={onPlanPress} />
    </div>
  );
}