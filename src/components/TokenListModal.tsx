"use client"

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react"
import Close from "./svgs/Close"
import Magnifier from "./svgs/Magnifier"
import TokenListItem from "./TokenListItem"
import useTokenList from "../hooks/useTokenList"
import { Token, Type } from "@/packages/currency"
import { useState } from "react"
import { useAccount, useReadContracts } from "wagmi"
import { Address, erc20Abi, getAddress, isAddress } from "viem"
import { ChainId } from "@/packages/chain"
import { TOKEN_LIST } from "@/packages/config"
import TokenImportWarningModal from "./TokenImportWarningModal"
import HelpToolTip from "./HelpToolTip"
import Link from "next/link"
import useLocalTokenStorage from "@/hooks/useLocalTokenStorage"

interface TokenListModalProps {
  currentToken?: Type
  setToken: any
  open: boolean
  onClose: any
  primaryTokens?: boolean
}

const TokenListModal: React.FC<TokenListModalProps> = ({
  setToken,
  open,
  onClose,
  primaryTokens,
}) => {
  const tokenList = useTokenList(primaryTokens)
  const [filter, setFilter] = useState("")
  const { localTokenList } = useLocalTokenStorage()

  const { data: tokenInfo } = useReadContracts({
    contracts: [
      { abi: erc20Abi, address: filter as Address, functionName: "name" },
      { abi: erc20Abi, address: filter as Address, functionName: "symbol" },
      { abi: erc20Abi, address: filter as Address, functionName: "decimals" },
    ],
    query: {
      enabled: isAddress(filter),
    },
  })

  const onSelectItem = (token: Type) => {
    setToken(token)
    onClose()
  }

  const tokens = [
    ...tokenList.filter(
      (item) =>
        item.name?.match(new RegExp(filter, "i")) ||
        item.symbol?.match(new RegExp(filter, "i")) ||
        (!item.isNative && item.address.toLowerCase() === filter.toLowerCase())
    ),
    ...(filter.length >= 0
      ? localTokenList
          .filter(
            (item) =>
              item.name?.match(new RegExp(filter, "i")) ||
              item.symbol?.match(new RegExp(filter, "i")) ||
              item.address.toLowerCase() === filter.toLowerCase()
          )
          .map(
            (item) =>
              new Token({
                chainId: ChainId.INK,
                address: item.address,
                name: item.name,
                symbol: item.symbol,
                decimals: item.decimals,
                category: item.category,
                icon: item.icon,
              })
          )
      : []),
    ...(isAddress(filter) &&
    tokenInfo &&
    tokenList.findIndex(
      (item) =>
        !item.isNative && item.address.toLowerCase() === filter.toLowerCase()
    ) === -1 &&
    TOKEN_LIST.findIndex(
      (item) => item.address.toLowerCase() === filter.toLowerCase()
    ) === -1 &&
    localTokenList.findIndex(
      (item) => item.address.toLowerCase() === filter.toLowerCase()
    ) === -1
      ? [
          new Token({
            address: getAddress(filter),
            chainId: ChainId.INK,
            name: tokenInfo[0]?.result,
            symbol: tokenInfo[1]?.result,
            decimals: tokenInfo[2]?.result ?? 18,
            isCustom: 1,
          }),
        ]
      : []),
    ...(filter.length >= 0
      ? TOKEN_LIST.filter(
          (item) =>
            (item.name?.match(new RegExp(filter, "i")) ||
              item.symbol?.match(new RegExp(filter, "i"))) &&
            localTokenList.findIndex(
              (k) => k.address.toLowerCase() === item.address.toLowerCase()
            ) === -1
        ).map(
          (item) =>
            new Token({
              address: item.address,
              name: item.name,
              symbol: item.symbol,
              chainId: ChainId.INK,
              decimals: item.decimals,
              icon: item.icon,
              isCustom: 2,
            })
        )
      : []),
  ]

  return (
    <>
      <Transition appear show={open}>
        <Dialog
          as="div"
          className="relative z-10 focus:outline-none"
          onClose={onClose}
        >
          <div
            className="fixed inset-0 bg-black/10 backdrop-blur"
            aria-hidden="true"
          />
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center">
              <DialogPanel className="relative w-full max-w-md bg-white dark:bg-[#131823] rounded-2xl backdrop-blur-2xl overflow-hidden">
                <h3 className="px-6 py-4 text-xl font-semibold text-[#222] dark:text-white">
                  Select a token
                </h3>
                <button
                  className="flex items-center justify-center absolute w-10 h-10 top-2 right-3"
                  onClick={onClose}
                >
                  <Close className="w-3 h-3 text-[#222] dark:text-white" />
                </button>
                <div className="relative mx-4">
                  <div className="absolute flex items-center justify-center min-w-12 w-12 h-12">
                    <Magnifier className="w-4 h-4 text-[#6c86ad]" />
                  </div>
                  <input
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    placeholder="Search by name, symbol or address"
                    className="w-full h-12 text-lg outline-none bg-transparent text-[#222] dark:text-white rounded-xl transition-all bg-[#f3f5fa] focus:border-[#f3f5fa] focus:shadow-[#2f8af5_0px_0px_0px_1px] pl-10 pr-4 placeholder:text-[#6c86ad]"
                  />
                </div>
                <div className="flex items-center mx-4 text-xs text-[#222] dark:text-white my-2 font-medium">
                  <span>Whitelist Your Token</span>
                  <HelpToolTip className="ml-1">
                    <div className="whitespace-nowrap">Please contact:</div>
                    <Link
                      href={"mailto:team@superswap.ink"}
                      className="underline text-[#2f8af5]"
                    >
                      team@superswap.ink
                    </Link>
                  </HelpToolTip>
                </div>
                <div className="flex flex-col rounded-es-2xl rounded-ee-2xl p-4 space-y-2 h-[66vh] overflow-y-auto">
                  {tokens.map((item) => (
                    <TokenListItem
                      key={item.id}
                      token={item}
                      onSelectItem={onSelectItem}
                    />
                  ))}
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default TokenListModal
