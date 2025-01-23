import Link from "next/link"
import React from "react"
import X from "../svgs/X"
import Telegram from "../svgs/Telegram"
import Globe from "../svgs/Globe"
import Github from "../svgs/Github"
import Image from "next/image"
import Docs from "../svgs/Docs"

import InkSwap from "../../assets/swap/InkSwap.png"
import InkySwap from "../../assets/swap/InkySwap.png"
import SquidSwap from "../../assets/swap/SquidSwap.png"
import DyorSwap from "../../assets/swap/DyorSwap.png"
import ReservoirSwap from "../../assets/swap/ReservoirSwap.png"
import VelodromeSwap from "../../assets/swap/VelodromeSwap.png"

function Footer() {
  return (
    <div className="absolute bottom-0 left-0 w-full flex flex-col justify-center items-center gap-3 pt-10 pb-6">
      <h2 className="text-xl font-bold text-[#1f1d1a] dark:text-white">
        SuperSwap
      </h2>
      <div className="flex items-center gap-4">
        <Link
          href={"https://superswap.ink"}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center w-10 h-10 bg-[#2f8af529] rounded-full text-[#2f8af5] hover:bg-[#2f8af51f] transition-all"
        >
          <Globe className="w-5 h-5" />
        </Link>
        <Link
          href={"https://x.com/superswapink"}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center w-10 h-10 bg-[#2f8af529] rounded-full text-[#2f8af5] hover:bg-[#2f8af51f] transition-all"
        >
          <X className="w-5 h-5" />
        </Link>
        <Link
          href={"https://t.me/SuperSwapink"}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center w-10 h-10 bg-[#2f8af529] rounded-full text-[#2f8af5] hover:bg-[#2f8af51f] transition-all"
        >
          <Telegram className="w-5 h-5" />
        </Link>
        <Link
          href={"https://github.com/SuperSwapink"}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center w-10 h-10 bg-[#2f8af529] rounded-full text-[#2f8af5] hover:bg-[#2f8af51f] transition-all"
        >
          <Github className="w-5 h-5" />
        </Link>
        <Link
          href={"https://superswapink.gitbook.io/docs"}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center w-10 h-10 bg-[#2f8af529] rounded-full text-[#2f8af5] hover:bg-[#2f8af51f] transition-all"
        >
          <Docs className="w-5 h-5" />
        </Link>
      </div>
      <p className="text-[#1f1d1a] dark:text-white text-sm">
        © 2025 SuperSwap.
      </p>
      <div className="flex items-center space-x-2">
        <span className="text-xs text-[#6c86ad]">Aggregating: </span>
        {[
          InkSwap,
          InkySwap,
          SquidSwap,
          DyorSwap,
          ReservoirSwap,
          VelodromeSwap,
        ].map((item, i) => (
          <Image
            key={i}
            src={item.src}
            width={item.width}
            height={item.height}
            alt="swap"
            className={`w-4 h-4 ${item === InkySwap ? 'invert dark:invert-0': ''}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Footer
