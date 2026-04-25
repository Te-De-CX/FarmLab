export type PlanTier = "starter" | "basic" | "pro" | "premium";

export interface FarmPlan {
  id: string;
  name: string;
  tier: PlanTier;
  nextHarvestIn: string; // e.g. "3hrs 33min"
  cyclesCompleted: number;
  totalCycles: number;
  progressColor: "green" | "white" | "yellow";
  earnings?: number;
}

export interface FarmProfile {
  walletAddress: string;
  completedHarvests: number;
  activePlan?: string;
}

export type NavTab = "home" | "wallet" | "profile";