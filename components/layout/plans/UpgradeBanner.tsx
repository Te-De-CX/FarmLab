"use client";

import { PLANT_IMAGE } from "@/libs/data/data";
import Image from "next/image";

interface UpgradeBannerProps {
  onUpgrade?: () => void;
}

export default function UpgradeBanner({ onUpgrade }: UpgradeBannerProps) {
  return (
    <div
      className="relative w-full rounded-[30px] border-[0.5px] border-white/60 overflow-hidden"
      style={{ background: "#333" }}
    >
      {/* Inner highlight */}
      <div
        className="absolute inset-0 pointer-events-none rounded-[30px]"
        style={{
          boxShadow: "inset 0px 5px 10px 0px rgba(250,250,250,0.05)",
        }}
      />

      <div className="flex items-center justify-between px-5 py-5">
        {/* Text + CTA */}
        <div className="flex flex-col gap-3 w-[237px]">
          <div className="flex flex-col gap-[6px]">
            <h2
              className="text-white text-[18px] leading-normal"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500 }}
            >
              Plan Upgrade
            </h2>
            <p
              className="text-[rgba(222,222,222,0.8)] text-[12px] leading-[21px] w-[199px]"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400 }}
            >
              Earn more by upgrading your plan, the higher your plan the Better
            </p>
          </div>

          {/* Upgrade button */}
          <button
            onClick={onUpgrade}
            className="relative flex items-center justify-center w-[147px] h-[42px] rounded-[15px] border-2 border-white/20 overflow-hidden transition-transform duration-150 active:scale-95"
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
              className="relative text-[#232323] text-[14px]"
              style={{ fontFamily: "'PT Serif', serif", fontWeight: 400 }}
            >
              Upgrade Plan
            </span>
          </button>
        </div>

        {/* Plant image */}
        <div className="relative w-[140px] h-[150px] flex items-center justify-center">
          <div
            className="relative w-[123px] h-[134px]"
            style={{ transform: "rotate(7.8deg)" }}
          >
            <Image
              src={PLANT_IMAGE}
              alt="Plant"
              fill
              className="object-contain"
              sizes="123px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}