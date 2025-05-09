"use client"

import { useWeb3Modal } from "@web3modal/wagmi/react"
import Wallet from "./svgs/Wallet"
import { useAccount } from "wagmi"

const WalletConnect = () => {
  const { address } = useAccount()
  const { open } = useWeb3Modal()
  const onConnect = () => {
    open?.()
  }

  return (
    <button
      className="flex items-center font-semibold bg-[#2f8af529] hover:bg-[#2f8af51f] rounded-xl text-[#2f8af5] px-4 py-3 outline-none transition-all"
      onClick={onConnect}
    >
      <Wallet className="mr-2" />{" "}
      {address
        ? `${address.slice(0, 4)}...${address.slice(-4)}`
        : "Connect Wallet"}
    </button>
  )
}

export default WalletConnect
