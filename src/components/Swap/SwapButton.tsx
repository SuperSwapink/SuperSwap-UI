"use client"

import { useWeb3Modal } from "@web3modal/wagmi/react"
import {
  useAccount,
  useBalance,
  usePublicClient,
  useSwitchChain,
  useWalletClient,
} from "wagmi"
import useSwapParams from "../../hooks/useSwapParams"
import { Amount, Token, tryParseAmount } from "@/packages/currency"
import Spinner from "../Spinner"
import React, { useState } from "react"
import { ApprovalState, useTokenApproval } from "@/hooks/useTokenApproval"
import { ChainId } from "@/packages/chain"
import { UseQueryResult } from "@tanstack/react-query"
import useSettings from "@/hooks/useSettings"
import { AGGREGATOR_ADDR } from "@/contracts"
import { getXFusionTxData } from "@/utils/trade"
import AggregatorABI from "@/contracts/AggregatorABI"
import toast from "react-hot-toast"
import CustomToast from "../CustomToast"
import { erc20Abi } from "viem"
import { routeProcessor3Abi, acrossPortalAbi } from "@/packages/abi"
import {
  ACROSS_PORTAL_ADDRESS,
  ROUTE_PROCESSOR_3_ADDRESS,
} from "@/packages/config"
import { addressToBytes32 } from "@across-protocol/app-sdk"

interface SwapButtonProps {
  trade: UseQueryResult<any, Error>
}

const SwapButton: React.FC<SwapButtonProps> = ({ trade }) => {
  const { address, chainId } = useAccount()
  const { open } = useWeb3Modal()
  const { amountIn, tokenIn, tokenOut, setAmountIn } = useSwapParams()
  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()
  const { switchChainAsync } = useSwitchChain()
  const [loading, setLoading] = useState(false)
  const [approving, setApproving] = useState(false)

  const parsedAmount = tryParseAmount(amountIn, tokenIn)

  const [approvalState, approve, approvalRequest] = useTokenApproval({
    amount: parsedAmount,
    spender:
      tokenIn?.chainId === tokenOut?.chainId
        ? ROUTE_PROCESSOR_3_ADDRESS[tokenIn?.chainId ?? ChainId.INK]
        : ACROSS_PORTAL_ADDRESS[tokenIn?.chainId ?? ChainId.INK],
    enabled: Boolean(parsedAmount),
  })

  const onSwap = async () => {
    console.log(trade.data)
    if (!address || !publicClient || !walletClient) {
      open?.()
    } else if (chainId !== tokenIn?.chainId) {
      switchChainAsync?.({ chainId: tokenIn?.chainId ?? ChainId.INK })
    } else {
      try {
        if (!tokenIn || !tokenOut) return
        await trade.refetch()

        if (!trade.data) return

        const swapTrade = { ...trade.data }

        setLoading(true)

        if (!trade.data.isBridge) {
          const balanceBefore = tokenOut.isNative
            ? await publicClient.getBalance({ address })
            : await publicClient.readContract({
                abi: erc20Abi,
                address: tokenOut.address,
                functionName: "balanceOf",
                args: [address],
              })

          const { request } = await publicClient.simulateContract({
            abi: routeProcessor3Abi,
            address: ROUTE_PROCESSOR_3_ADDRESS[tokenIn.chainId],
            account: address,
            functionName: "processRoute",
            args: [
              swapTrade?.data?.tokenIn,
              swapTrade?.data?.amountIn,
              swapTrade?.data?.tokenOut,
              swapTrade?.data?.amountOutMin,
              swapTrade?.data?.to,
              swapTrade?.data?.routeCode,
            ],
            value: swapTrade?.data?.value,
          })

          const hash = await walletClient.writeContract(request)

          const res = await publicClient.waitForTransactionReceipt({ hash })

          const balanceAfter = tokenOut.isNative
            ? await publicClient.getBalance({ address })
            : await publicClient.readContract({
                abi: erc20Abi,
                address: tokenOut.address,
                functionName: "balanceOf",
                args: [address],
              })

          toast.custom((t) => (
            <CustomToast
              t={t}
              type="success"
              text={`Swap ${Amount.fromRawAmount(
                tokenIn,
                swapTrade.amountIn
              ).toSignificant(6)} ${
                swapTrade.tokenIn.symbol
              } for ${Amount.fromRawAmount(
                tokenOut,
                balanceAfter - balanceBefore
              ).toSignificant(6)} ${swapTrade.tokenOut.symbol}`}
              hash={hash}
            />
          ))
          console.log(res)
        } else {
          console.log(trade.data)
          const { request } = await publicClient.simulateContract({
            abi: acrossPortalAbi,
            address: ACROSS_PORTAL_ADDRESS[tokenIn.chainId],
            account: address,
            functionName: "sendSwapRequest",
            args: [
              trade.data.originalData.calldata,
              {
                depositor: addressToBytes32(address),
                destinationChainId: BigInt(
                  trade.data.depositData.destinationChainId
                ),
                exclusiveRelayer: addressToBytes32(
                  trade.data.depositData.exclusiveRelayer
                ),
                exclusivityDeadline: trade.data.depositData.exclusivityDeadline,
                fillDeadline: trade.data.depositData.fillDeadline,
                inputAmount: trade.data.depositData.inputAmount,
                inputToken: addressToBytes32(trade.data.depositData.inputToken),
                message: trade.data.depositData.message,
                outputAmount: trade.data.depositData.outputAmount,
                outputToken: addressToBytes32(
                  trade.data.depositData.outputToken
                ),
                quoteTimestamp: trade.data.depositData.quoteTimestamp,
                recipient: addressToBytes32(trade.data.depositData.recipient),
              },
            ],
            value: tokenIn.isNative ? trade.data.depositData.inputAmount : 0n,
          })

          const hash = await walletClient.writeContract(request)

          const res = await publicClient.waitForTransactionReceipt({ hash })

          console.log(res)
        }

        setAmountIn("")
      } catch (err: any) {
        console.log(err)
        if (!err?.message?.includes("User rejected the request.")) {
          toast.custom((t) => (
            <CustomToast
              t={t}
              type="error"
              text={`Failed to send the transaction. Please check the slippage and try again later.`}
            />
          ))
        }
      } finally {
        setLoading(false)
      }
    }
  }

  const onApprove = async () => {
    try {
      setApproving(true)
      await approve(approvalRequest)
    } catch (err) {
      console.log(err)
    } finally {
      setApproving(false)
    }
  }

  const { data: balance } = useBalance({
    address,
    token: tokenIn instanceof Token ? tokenIn.address : undefined,
    query: {
      enabled: Boolean(address) && Boolean(tokenIn),
      refetchInterval: 30000,
    },
  })

  const fetching =
    Boolean(tokenIn) &&
    Boolean(tokenOut) &&
    Boolean(parsedAmount?.greaterThan(0n)) &&
    (trade.isFetching || trade.isLoading || trade.isPending)
  const wrongNetworkError = chainId !== tokenIn?.chainId
  const nonAssetError = !tokenIn || !tokenOut
  const nonAmountError = !(
    tokenIn &&
    amountIn &&
    tryParseAmount(amountIn, tokenIn)?.greaterThan(0n)
  )
  const insufficientBalanceError =
    Number(amountIn) > Number(balance?.formatted ?? "0")

  const isError = nonAmountError || nonAssetError || insufficientBalanceError

  return (
    <div className="mt-4">
      {!fetching &&
      !isError &&
      trade.data &&
      (approvalState === ApprovalState.NOT_APPROVED ||
        approvalState === ApprovalState.PENDING) ? (
        <button
          className="flex items-center justify-center h-12 w-full bg-[#2f8af529] text-[#2f8af5] enabled:hover:bg-[#2f8af51f] transition-all rounded-full mt-8 font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
          onClick={onApprove}
          disabled={approving}
        >
          <>
            {approving ? <Spinner className="w-5 h-5 mr-2" /> : null}
            Approve {tokenIn?.symbol}
          </>
        </button>
      ) : null}
      <button
        className="flex items-center justify-center h-12 w-full bg-[#2f8af529] text-[#2f8af5] enabled:hover:bg-[#2f8af51f] transition-all rounded-full font-semibold disabled:opacity-70 disabled:cursor-not-allowed mt-4"
        onClick={onSwap}
        disabled={
          (address &&
            !wrongNetworkError &&
            (isError || !(approvalState === ApprovalState.APPROVED))) ||
          fetching ||
          loading
        }
      >
        {fetching ? (
          <>
            <Spinner className="w-5 h-5 mr-2" />
            Fetching Best Trade
          </>
        ) : loading ? (
          <>
            <Spinner className="w-5 h-5 mr-2" />
            Waiting for Confirmation
          </>
        ) : !address ? (
          "Connect Wallet"
        ) : wrongNetworkError ? (
          "Switch Network"
        ) : nonAssetError ? (
          "Select Asset to Trade"
        ) : nonAmountError ? (
          "Input Amount to Trade"
        ) : insufficientBalanceError ? (
          `Insufficient ${tokenIn?.symbol} Balance`
        ) : (
          "Swap"
        )}
      </button>
    </div>
  )
}

export default SwapButton
