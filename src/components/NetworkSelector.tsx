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
import { ChainId, SUPPORTED_CHAINS } from "@/packages/chain"

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
    Object.keys(SUPPORTED_CHAINS).findIndex((k) => Number(k) === chainId) > -1
      ? SUPPORTED_CHAINS[chainId as ChainId]
      : undefined

  return address ? (
    <Menu>
      <MenuButton
        data-wrong={activeChain === undefined}
        className={`flex items-center text-[#2f8af5] bg-[#2f8af529] rounded-xl px-4 py-3 outline-none hover:bg-[#2f8af51f] transition-all ${
          className ?? ""
        }`}
      >
        {activeChain ? (
          <div className="flex items-center">
            <Image
              src={activeChain.icon.src}
              width={activeChain.icon.width}
              height={activeChain.icon.blurHeight}
              alt={activeChain.name}
              className="w-5 h-5 rounded-full"
            />
            <span className="text-[#2f8af5] font-semibold ml-2">
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
          className="rounded-xl mt-2 bg-white dark:bg-[#131823]"
        >
          {Object.values(SUPPORTED_CHAINS).map((item) => (
            <MenuItem
              as={"button"}
              key={item.name}
              className="flex items-center max-sm:hidden py-3 px-4 hover:bg-[#2f8af51f] transition-all w-full"
              onClick={() => onSwitchChain(item.id)}
            >
              <Image
                src={item.icon.src}
                width={item.icon.width}
                height={item.icon.blurHeight}
                alt={item.name}
                className="w-5 h-5 rounded-full"
              />
              <span className="text-[#222] dark:text-white font-semibold ml-2">
                {item.name}
              </span>
            </MenuItem>
          ))}
        </MenuItems>
      </Transition>
    </Menu>
  ) : null
}

export default NetworkSelector
