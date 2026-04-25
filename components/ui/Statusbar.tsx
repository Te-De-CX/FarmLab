import { ICONS_IMAGE } from "@/libs/data/data";
import Image from "next/image";

interface StatusBarProps {
  time?: string;
}

export default function StatusBar({ time = "12:30" }: StatusBarProps) {
  return (
    <div className="absolute top-6 left-[21px] right-[21px] flex items-center justify-between h-4">
      <span
        className="text-white/90 text-[14px] font-medium tracking-[0.014px]"
        style={{ fontFamily: "Roboto, sans-serif" }}
      >
        {time}
      </span>
      <Image
        src={ICONS_IMAGE}
        alt="Status icons"
        width={70}
        height={12}
        className="w-[70px] h-3 object-contain"
      />
    </div>
  );
}