"use client";

import Image from "next/image";
import { useAccount, useSwitchChain } from "wagmi";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { ChainId, SUPPORTED_CHAINS } from "@/packages/chain";

interface NetworkSelectorProps {
  className?: string;
}

const NetworkSelector: React.FC<NetworkSelectorProps> = ({ className }) => {
  const { address, chainId } = useAccount();
  const { switchChainAsync } = useSwitchChain();

  const onSwitchChain = (chainId: ChainId) => {
    switchChainAsync?.({ chainId });
  };

  const activeChain =
    chainId &&
    Object.keys(SUPPORTED_CHAINS).findIndex((k) => Number(k) === chainId) > -1
      ? SUPPORTED_CHAINS[chainId as ChainId]
      : undefined;

  return address ? (
    <Menu>
      <MenuButton
        data-wrong={activeChain === undefined}
        className={`flex items-center text-[#2f8af5] bg-[#2f8af529] rounded-xl px-4 py-3 outline-none hover:bg-[#2f8af51f] transition-all z-10 ${
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
              className={`w-5 h-5 rounded-full ${
                activeChain.iconLight ? "hidden dark:block" : ""
              }`}
            />
            {activeChain.iconLight ? (
              <Image
                src={activeChain.iconLight.src}
                width={activeChain.iconLight.width}
                height={activeChain.iconLight.blurHeight}
                alt={activeChain.name}
                className={`w-5 h-5 rounded-full dark:hidden`}
              />
            ) : null}
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
      <MenuItems>
        <MenuItem>
          <div
            className="fixed inset-0 bg-black/10 backdrop-blur z-[2]"
            aria-hidden="true"
          />
        </MenuItem>
      </MenuItems>
      <MenuItems
        anchor="bottom"
        className="origin-top-right rounded-xl mt-2 bg-white dark:bg-[#131823] z-50"
      >
        {Object.values(SUPPORTED_CHAINS).map((item) => (
          <MenuItem
            as={"button"}
            key={item.name}
            className="flex items-center py-3 px-4 hover:bg-[#2f8af51f] transition-all w-full"
            onClick={() => onSwitchChain(item.id)}
          >
            <Image
              src={item.icon.src}
              width={item.icon.width}
              height={item.icon.blurHeight}
              alt={item.name}
              className={`w-5 h-5 rounded-full ${
                item.iconLight ? "hidden dark:block" : ""
              }`}
            />
            {item.iconLight ? (
              <Image
                src={item.iconLight.src}
                width={item.iconLight.width}
                height={item.iconLight.blurHeight}
                alt={item.name}
                className={`w-5 h-5 rounded-full dark:hidden`}
              />
            ) : null}
            <span className="text-[#222] dark:text-white font-semibold ml-2">
              {item.name}
            </span>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  ) : null;
};

export default NetworkSelector;
