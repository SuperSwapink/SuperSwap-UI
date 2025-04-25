"use client";

import { DEFAULT_IMAGE_URL } from "@/constants";
import { ChainId, isChainId } from "@/packages/chain";
import { Amount, Token, Type } from "@/packages/currency";
import { usePrice } from "@/packages/prices";
import Image from "next/image";
import { useAccount, useBalance } from "wagmi";
import TokenImportWarningModal from "./TokenImportWarningModal";
import { useState } from "react";
import useLocalTokenStorage from "@/hooks/useLocalTokenStorage";
import CurrencyIcon from "./CurrencyIcon";

interface TokenListItemProps {
  token: Type;
  onSelectItem: any;
  balance?: bigint;
  className?: string;
}

const TokenListItem: React.FC<TokenListItemProps> = ({
  token,
  onSelectItem,
  balance,
  className,
}) => {
  const { address, chainId } = useAccount();
  // const { data: balance } = useBalance({
  //   address,
  //   chainId: token.chainId,
  //   token: token instanceof Token ? token.address : undefined,
  //   query: { enabled: Boolean(address), refetchInterval: 30000 },
  // })
  // const balance = { value: 0n }
  const [warningOpen, setWarningOpen] = useState(false);
  const { importToken } = useLocalTokenStorage();

  const { data: price } = usePrice({
    address: token.wrapped.address,
    chainId: token.chainId,
    enabled: (balance ?? 0n) > 0n,
  });

  return (
    <>
      <div
        className={`flex items-center justify-between w-full px-3 md:px-4 py-2 md:py-3 rounded-xl hover:bg-[#f8f9fd] dark:hover:bg-[#060a1080] transition-all cursor-pointer ${
          className ?? ""
        }`}
        onClick={() => {
          token.isCustom ? setWarningOpen(true) : onSelectItem(token);
        }}
      >
        <div className="flex items-center">
          <CurrencyIcon
            src={token?.icon ?? DEFAULT_IMAGE_URL}
            width={32}
            height={32}
            alt="token"
            className="size-6 md:size-8 rounded-full"
          />
          <div className="ml-2 md:ml-4">
            <div className="flex items-center">
              <span className="text-[#222] dark:text-white font-semibold text-sm md:text-base max-w-[150px] whitespace-nowrap overflow-hidden text-ellipsis">
                {token.name}
              </span>
              <span className="text-[#222] dark:text-white text-xs md:text-sm ml-2">
                {token.symbol}
              </span>
            </div>
            <div className="text-xs md:text-sm text-[#a0a0a0]">
              {token.category}
            </div>
          </div>
        </div>
        {token.isCustom ? (
          <button className="bg-[#2f8af529] text-[#2f8af5] enabled:hover:bg-[#2f8af51f] transition-all rounded-full text-sm py-1.5 px-4">
            Import
          </button>
        ) : balance && balance > 0n ? (
          <div className="flex flex-col items-end">
            <span className="text-[#222] dark:text-white text-xs md:text-sm font-semibold">
              {Number(
                Amount.fromRawAmount(token, balance).toExact()
              ).toLocaleString("en-US", {
                maximumFractionDigits: 9,
              })}
            </span>
            {price ? (
              <span className="text-[#a0a0a0] text-xs md:text-sm">
                $
                {(
                  price * Number(Amount.fromRawAmount(token, balance).toExact())
                ).toFixed(2)}
              </span>
            ) : undefined}
          </div>
        ) : null}
      </div>

      {token.isCustom ? (
        <TokenImportWarningModal
          open={warningOpen}
          onClose={() => setWarningOpen(false)}
          onConfirm={() => {
            importToken({
              address: token.wrapped.address,
              chainId: token.chainId,
              name: token.name ?? "",
              symbol: token.symbol ?? "",
              decimals: token.decimals,
              category: token.category,
              icon: token.icon,
            });
            onSelectItem(token);
          }}
          token={token}
          isCustom={token.isCustom}
        />
      ) : null}
    </>
  );
};

export default TokenListItem;
