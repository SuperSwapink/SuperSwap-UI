"use client";

import { Dialog, DialogPanel, Transition } from "@headlessui/react";
import Close from "./svgs/Close";
import Magnifier from "./svgs/Magnifier";
import TokenListItem from "./TokenListItem";
import useTokenList from "../hooks/useTokenList";
import { Amount, Token, Type } from "@/packages/currency";
import { useEffect, useState } from "react";
import { useAccount, useReadContracts } from "wagmi";
import { Address, erc20Abi, getAddress, isAddress } from "viem";
import { ChainId, SUPPORTED_CHAINS } from "@/packages/chain";
import Image from "next/image";
import useTokenBalances from "@/hooks/useTokenBalances";
import useTokenPrices from "@/hooks/useTokenPrices";

interface TokenListModalProps {
  currentToken?: Type;
  setToken: any;
  open: boolean;
  onClose: any;
  primaryTokens?: boolean;
}

const TokenListModal: React.FC<TokenListModalProps> = ({
  currentToken,
  setToken,
  open,
  onClose,
  primaryTokens,
}) => {
  const [filter, setFilter] = useState("");
  const { address } = useAccount();
  const [selectedChain, setSelectedChain] = useState<ChainId>(ChainId.INK);
  const tokenList = useTokenList(selectedChain, primaryTokens);
  const { prices } = useTokenPrices();
  const { data: balances } = useTokenBalances(
    selectedChain,
    address,
    tokenList,
    open
  );

  useEffect(() => {
    setFilter("");
    setSelectedChain(currentToken?.chainId ?? ChainId.INK);
  }, [open]);

  const { data: tokenInfo } = useReadContracts({
    contracts: [
      {
        abi: erc20Abi,
        address: filter as Address,
        functionName: "name",
        chainId: selectedChain,
      },
      {
        abi: erc20Abi,
        address: filter as Address,
        functionName: "symbol",
        chainId: selectedChain,
      },
      {
        abi: erc20Abi,
        address: filter as Address,
        functionName: "decimals",
        chainId: selectedChain,
      },
    ],
    query: {
      enabled: isAddress(filter),
      refetchInterval: 10000,
    },
  });

  const onSelectItem = (token: Type) => {
    setToken(token);
    onClose();
  };

  const onChainChange = (id: ChainId) => {
    setSelectedChain(id);
  };

  const tokens = [
    ...tokenList.filter(
      (item) =>
        item.name?.match(new RegExp(filter, "i")) ||
        item.symbol?.match(new RegExp(filter, "i")) ||
        (!item.isNative && item.address.toLowerCase() === filter.toLowerCase())
    ),
    ...(isAddress(filter) &&
    tokenInfo &&
    tokenInfo[0].result &&
    tokenInfo[1].result &&
    tokenInfo[2].result &&
    tokenList.findIndex(
      (item) =>
        !item.isNative && item.address.toLowerCase() === filter.toLowerCase()
    ) === -1
      ? [
          new Token({
            address: getAddress(filter),
            chainId: selectedChain,
            name: tokenInfo[0]?.result,
            symbol: tokenInfo[1]?.result,
            decimals: tokenInfo[2]?.result ?? 18,
            isCustom: 1,
          }),
        ]
      : []),
  ];

  const sortedTokens = tokens
    .filter((item) => item.chainId === selectedChain)
    .sort((a, b) =>
      Number(
        Amount.fromRawAmount(
          a,
          balances?.[selectedChain]?.[
            (a.isNative
              ? "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
              : a.address
            ).toLowerCase()
          ] ?? 0n
        ).toExact()
      ) *
        (prices?.[`${selectedChain}:${a.wrapped.address}`.toLowerCase()] ?? 0) >
      Number(
        Amount.fromRawAmount(
          b,
          balances?.[selectedChain]?.[
            (b.isNative
              ? "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
              : b.address
            ).toLowerCase()
          ] ?? 0n
        ).toExact()
      ) *
        (prices?.[
          `${selectedChain}:${b.wrapped.address.toLowerCase()}`.toLowerCase()
        ] ?? 0)
        ? -1
        : 1
    );

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
              <DialogPanel className="relative w-full max-w-xl bg-white dark:bg-[#131823] rounded-2xl backdrop-blur-2xl overflow-hidden">
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
                <div className="flex justify-between px-4 mt-2">
                  <span className="text-xs text-[#a0a0a0] min-w-[100px] w-[100px] md:w-[200px]">
                    Network
                  </span>
                  <div className="flex justify-between w-full px-2">
                    <span className="text-xs text-[#a0a0a0]">Token</span>
                    <span className="text-xs text-[#a0a0a0]">Balance</span>
                  </div>
                </div>
                <div className="flex rounded-es-2xl rounded-ee-2xl p-3 md:p-4">
                  <div className="flex flex-col min-w-[100px] w-[100px] md:w-[200px] h-[66vh] overflow-y-auto space-y-1 [&::-webkit-scrollbar]:!hidden border-r-4 border-[#323740]">
                    {Object.values(SUPPORTED_CHAINS)
                      .sort((a, b) => (a.id === ChainId.INK ? -1 : 1))
                      .map((chain) => (
                        <div
                          key={chain.name}
                          data-active={chain.id === selectedChain}
                          className="flex items-center p-1 md:p-2 rounded-md hover:bg-[#060a1080] transition-all cursor-pointer data-[active=true]:bg-[#060a1080]"
                          onClick={() => onChainChange(chain.id)}
                        >
                          <Image
                            src={chain.icon.src}
                            width={chain.icon.width}
                            height={chain.icon.height}
                            alt={chain.name}
                            className={`size-5 rounded-full ${
                              chain.iconLight ? "hidden dark:block" : ""
                            }`}
                          />
                          {chain.iconLight ? (
                            <Image
                              src={chain.iconLight.src}
                              width={chain.iconLight.width}
                              height={chain.iconLight.height}
                              alt={chain.name}
                              className={`size-5 rounded-full dark:hidden`}
                            />
                          ) : null}
                          <span className="ml-1 md:ml-2 text-[10px] md:text-sm uppercase">
                            {chain.name}
                          </span>
                        </div>
                      ))}
                  </div>
                  <div className="flex flex-col space-y-2 h-[66vh] overflow-y-auto w-full">
                    {sortedTokens.map((item) => (
                      <TokenListItem
                        key={item.id}
                        token={item}
                        balance={
                          balances?.[selectedChain]?.[
                            (item.isNative
                              ? "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
                              : item.address
                            ).toLowerCase()
                          ]
                        }
                        onSelectItem={onSelectItem}
                      />
                    ))}
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default TokenListModal;
