import { FarmPlan, FarmProfile } from "@/libs/types";

export const MOCK_PROFILE: FarmProfile = {
  walletAddress: "Tfre893nnso4",
  completedHarvests: 10,
  activePlan: "starter",
};

export const MOCK_PLANS: FarmPlan[] = [
  {
    id: "plan-1",
    name: "Starter Plan",
    tier: "starter",
    nextHarvestIn: "3hrs 33 min",
    cyclesCompleted: 12,
    totalCycles: 30,
    progressColor: "green",
    earnings: 120,
  },
  {
    id: "plan-2",
    name: "Basic Plan",
    tier: "basic",
    nextHarvestIn: "5hrs 20 min",
    cyclesCompleted: 8,
    totalCycles: 30,
    progressColor: "white",
    earnings: 280,
  },
  {
    id: "plan-3",
    name: "Pro Plan",
    tier: "pro",
    nextHarvestIn: "1hr 15 min",
    cyclesCompleted: 25,
    totalCycles: 30,
    progressColor: "green",
    earnings: 750,
  },
];

export const PLANT_IMAGE =
  "https://www.figma.com/api/mcp/asset/f476808d-9465-48da-91fd-193943566460";
export const LOGO_IMAGE =
  "https://www.figma.com/api/mcp/asset/50f1a0df-5111-4c12-998a-7da4edffe9e4";
export const ICONS_IMAGE =
  "https://www.figma.com/api/mcp/asset/32733bf9-1967-4291-b60f-e5442ea50f59";
export const HOME_ICON =
  "https://www.figma.com/api/mcp/asset/e61cdfdf-9941-4d21-9c99-1fd87a4828dc";
export const WALLET_ICON =
  "https://www.figma.com/api/mcp/asset/2967c666-1c7f-4f6c-be76-85884dac5ba2";
export const PROFILE_ICON =
  "https://www.figma.com/api/mcp/asset/2c49de47-47ef-4903-9541-a3f84435461c";
export const ADD_ICON =
  "https://www.figma.com/api/mcp/asset/2f1b5ae9-76be-4d82-9f23-d3df8774872e";