"use client";

import SettingPopup from "@/components/SettingPopup";
import SwapPanel from "@/components/Swap/SwapPanel";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="max-w-[650px] lg:w-[50%] md:pt-20 pt-10 w-[90%]">
        <div className="flex items-center justify-between">
          <button className="bg-transparent border border-[#e2cdae] rounded-full text-[#1f1d1a] py-3 px-4 bg-[#e4e4e4] font-semibold">
            Swap
          </button>
          <SettingPopup />
        </div>
        <SwapPanel />
      </div>
    </div>
  );
}
