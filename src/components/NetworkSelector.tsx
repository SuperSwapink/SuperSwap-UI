"use client"

import Image from "next/image"
import Ink from "@/assets/network/ink.png"
import { useAccount, useSwitchChain } from "wagmi"
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react"
import { CHAIN_IFNO } from "@/constants"
import { ChainId } from "@/packages/chain"

interface NetworkSelectorProps {
  className?: string
}

const NetworkSelector: React.FC<NetworkSelectorProps> = ({ className }) => {
  const { address, chainId } = useAccount()
  const { switchChainAsync } = useSwitchChain()

  const onSwitchChain = (chainId: ChainId) => {
    switchChainAsync?.({ chainId })
  }

  const activeChain =
    chainId &&
    Object.keys(CHAIN_IFNO).findIndex((k) => Number(k) === chainId) > -1
      ? CHAIN_IFNO[chainId as ChainId]
      : undefined

  return (
    <Menu>
      <MenuButton
        data-wrong={activeChain === undefined}
        className={`flex items-center bg-transparent border rounded-xl border-[#e2cdae] data-[wrong=true]:border-[#ff9b9b] px-4 py-3 outline-none hover:bg-[#dfcaaa]/60 transition-all ${
          className ?? ""
        }`}
      >
        {activeChain ? (
          <div className="flex items-center max-sm:hidden">
            <Image
              src={activeChain.image.src}
              width={activeChain.image.width}
              height={activeChain.image.blurHeight}
              alt={activeChain.name}
              className="w-5 h-5"
            />
            <span className="text-[#1f1d1a] font-semibold ml-2">
              {activeChain.name}
            </span>
          </div>
        ) : (
          <span className="text-[#ff5b5b] font-semibold max-sm:hidden">
            Wrong Network
          </span>
        )}
      </MenuButton>
      <Transition
        enter="transition ease-out duration-75"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <MenuItems
          anchor="bottom"
          className="border border-[#e2cdae] rounded-xl mt-2 bg-[#ddd]"
        >
          {Object.values(CHAIN_IFNO).map((item) => (
            <MenuItem
              as={"button"}
              key={item.name}
              className="flex items-center max-sm:hidden py-3 px-4 hover:bg-[#dfcaaa]/60 transition-all w-full"
              onClick={() => onSwitchChain(item.id)}
            >
              <Image
                src={item.image.src}
                width={item.image.width}
                height={item.image.blurHeight}
                alt={item.name}
                className="w-5 h-5"
              />
              <span className="text-[#1f1d1a] font-semibold ml-2">
                {item.name}
              </span>
            </MenuItem>
          ))}
        </MenuItems>
      </Transition>
    </Menu>
  )
}

export default NetworkSelector
