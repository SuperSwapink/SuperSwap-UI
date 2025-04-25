"use client";

import { useEffect, useRef, useState } from "react";
import ChevronDown from "../svgs/ChevronDown";
import TokenListModal from "../TokenListModal";
import {
  Amount,
  Token,
  Type,
  USDC,
  defaultCurrencies,
} from "@/packages/currency";
import { DEFAULT_IMAGE_URL, NATIVE_GAS_FEE } from "@/constants";
import Image from "next/image";
import { useAccount, useBalance } from "wagmi";
import { ChainId, isChainId, SUPPORTED_CHAINS } from "@/packages/chain";
import { usePrice } from "@/packages/prices";
import CurrencyIcon from "../CurrencyIcon";
import { removeLeadingZeros } from "@/utils";

interface SwapSideProps {
  side: "From" | "To";
  amount: string | undefined;
  setAmount?: any;
  token?: Type;
  setToken: any;
  className?: string;
  hideSide?: boolean;
  hideBalance?: boolean;
  disabled?: boolean;
  primaryTokens?: boolean;
}

const SwapSide: React.FC<SwapSideProps> = ({
  side,
  amount,
  setAmount,
  token,
  setToken,
  hideBalance,
  hideSide,
  className,
  primaryTokens,
  disabled,
}) => {
  const { address } = useAccount();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tokenSelectorRef = useRef<HTMLDivElement>(null);
  const amountInputRef = useRef<HTMLInputElement>(null);

  const fastTokens = !token;

  const { data: balance } = useBalance({
    chainId: token?.chainId,
    address,
    token: token instanceof Token ? token.address : undefined,
    query: {
      enabled: Boolean(address) && Boolean(token),
      refetchInterval: 10000,
    },
  });

  const { data: price } = usePrice({
    address: token?.wrapped?.address,
    chainId: token?.chainId,
    enabled: Number(amount) > 0,
  });

  const onMax = () => {
    if (balance && token) {
      if (token?.isNative) {
        setAmount?.(
          Amount.fromRawAmount(
            token,
            balance.value >= NATIVE_GAS_FEE
              ? balance.value - NATIVE_GAS_FEE
              : 0n
          ).toExact()
        );
      } else setAmount?.(Amount.fromRawAmount(token, balance.value).toExact());
    } else {
      setAmount?.("0");
    }
  };

  const onAmountInput = (e: string) => {
    if (
      e === "" ||
      RegExp(`^\\d*(?:\\\\[.])?\\d*$`).test(
        e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      )
    ) {
      setAmount(removeLeadingZeros(e));
    }
  };

  useEffect(() => {
    if (amountInputRef.current)
      amountInputRef.current.style.paddingRight = `${
        (tokenSelectorRef.current?.clientWidth ?? 0) + 10
      }px`;
  }, [token, balance]);

  return (
    <>
      <div className={className ?? ""}>
        <div className="flex items-start justify-between">
          {!hideSide && (
            <div className="flex items-center">
              <h2 className="text-[#6c86ad] font-semibold">{side}</h2>
              {token ? (
                <div className="flex items-center ml-2">
                  <Image
                    src={SUPPORTED_CHAINS[token.chainId].icon.src}
                    width={SUPPORTED_CHAINS[token.chainId].icon.width}
                    height={SUPPORTED_CHAINS[token.chainId].icon.height}
                    alt="network"
                    className="size-5 rounded-full"
                  />
                  <span className="uppercase text-sm ml-1 font-bold">
                    {SUPPORTED_CHAINS[token.chainId].name}
                  </span>
                </div>
              ) : null}
            </div>
          )}
          {!hideBalance && balance && token ? (
            <button
              className="text-xs text-[#6c86ad] px-2 h-6 font-semibold rounded-full hover:bg-[#2f8af51f] transition-all"
              onClick={onMax}
            >
              <span className="text-[#6c86ad] mr-1">Balance:</span>
              {Number(balance.formatted).toLocaleString("en-US", {
                maximumFractionDigits: 9,
              })}
            </button>
          ) : null}
        </div>
        <div className="relative mt-1">
          <input
            type="text"
            inputMode="decimal"
            value={amount ?? ""}
            pattern="^[0-9]*[.,]?[0-9]*$"
            onChange={(e) => onAmountInput(e.target.value)}
            ref={amountInputRef}
            data-fast={fastTokens}
            className="w-full h-12 max-sm:data-[fast=true]:h-[72px] outline-none text-[30px] bg-transparent text-[#222] dark:text-white font-semibold placeholder:text-[#6c86ad]"
            placeholder="0.0"
          />
          <div
            ref={tokenSelectorRef}
            data-fast={fastTokens}
            className="flex max-sm:data-[fast=true]:flex-col max-sm:data-[fast=true]:items-end absolute max-sm:justify-center bottom-0 right-0 min-h-full items-center space-x-2 max-sm:data-[fast=true]:space-x-0"
          >
            {balance && side === "From" ? (
              <button
                className="text-[#6c86ad] text-xs font-semibold bg-[#2f8af51f] rounded-full h-6 px-2 py-1 hover:bg-[#2f8af529] transition-all"
                onClick={onMax}
              >
                MAX
              </button>
            ) : null}
            {fastTokens ? (
              <div className="flex items-center space-x-2 max-sm:mb-2">
                {defaultCurrencies[ChainId.INK].map((item) => (
                  <Image
                    src={item.icon ?? ""}
                    key={item.name}
                    width={32}
                    height={32}
                    alt="arb"
                    className="w-8 h-8 rounded-full bg-[#2f8af51f] p-1 hover:bg-[#2f8af529] active:bg-[#2f8af529] transition-all cursor-pointer"
                    onClick={() => setToken(item)}
                  />
                ))}
              </div>
            ) : null}
            <div
              onClick={() => setIsModalOpen(true)}
              className="flex h-10 sm:h-12 px-4 rounded-2xl items-center font-semibold text-[#222] dark:text-white hover:bg-[#2f8af51f] transition-all cursor-pointer"
            >
              {token ? (
                <>
                  <CurrencyIcon
                    src={token?.icon ?? DEFAULT_IMAGE_URL}
                    width={20}
                    height={20}
                    className="h-5 w-5 rounded-full mr-2"
                    alt=""
                  />
                  <span>{token?.symbol}</span>
                </>
              ) : (
                "Select Token"
              )}
              <ChevronDown className="ml-2 w-4 h-4" />
            </div>
          </div>
        </div>
        {amount && price !== undefined ? (
          <p className="text-[#6c86ad] text-sm mt-1">
            ~${(Number(price) * Number(amount)).toFixed(2)}
          </p>
        ) : null}
      </div>
      <TokenListModal
        primaryTokens={primaryTokens}
        currentToken={token}
        setToken={setToken}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default SwapSide;
