// components/layout/plans/ProfileHeader.tsx
"use client";

import { FarmProfile } from "@/libs/types";
import { LOGO_IMAGE } from "@/libs/data/data";
import Image from "next/image";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { useTelegramUserId } from "@/libs/hooks/useTelegramUserId";

interface ProfileHeaderProps {
  profile: FarmProfile;
  onSortPress?: () => void;
}

export default function ProfileHeader({ profile, onSortPress }: ProfileHeaderProps) {
    const telegramUserId = useTelegramUserId();
//   const shortAddress =
    // profile.walletAddress.length > 12
    //   ? `${profile.walletAddress.slice(0, 10)}…`
    //   : profile.walletAddress;

    const effectiveWalletAddress = telegramUserId ?? profile.walletAddress;

  return (
    <div className="flex items-center justify-between w-full">
      {/* Left: avatar + wallet info */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-11 h-11 rounded-full border border-white/10 bg-[#1a1a1a] p-1.5">
          <Image
            src={LOGO_IMAGE}
            alt="FarmCity Logo"
            width={28}
            height={22}
            className="w-auto h-auto object-contain"
          />
        </div>

        <div className="flex flex-col gap-0.5">
          <p
            className="text-white text-sm leading-tight"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500 }}
          >
            {effectiveWalletAddress}
          </p>
          <div className="flex items-center gap-1.5 text-[#b0b0b0]">
            {/* Tiny leaf icon */}
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path
                d="M5 1C5 1 3 3.5 3 6C3 7.5 4.5 9 5 9C5.5 9 7 7.5 7 6C7 3.5 5 1 5 1Z"
                fill="#b0b0b0"
                opacity="0.6"
              />
            </svg>
            <p
              className="text-[11px]"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400 }}
            >
              {profile.completedHarvests} Harvests
            </p>
          </div>
        </div>
      </div>

      {/* Sort button */}
      <button
        onClick={onSortPress}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-[#232323] border border-white/[0.06] hover:bg-white/5 transition-colors active:scale-90"
      >
        <HiOutlineArrowsUpDown size={18} className="text-white/70" />
      </button>
    </div>
  );
}