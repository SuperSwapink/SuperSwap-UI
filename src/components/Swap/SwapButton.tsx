"use client";

import { useWeb3Modal } from "@web3modal/wagmi/react";
import {
  useAccount,
  useBalance,
  usePublicClient,
  useSwitchChain,
  useWalletClient,
} from "wagmi";
import useSwapParams from "../../hooks/useSwapParams";
import { Amount, Token, tryParseAmount, WETH9 } from "@/packages/currency";
import Spinner from "../Spinner";
import React, { useState } from "react";
import { ApprovalState, useTokenApproval } from "@/hooks/useTokenApproval";
import { ChainId } from "@/packages/chain";
import { UseQueryResult } from "@tanstack/react-query";
import useSettings from "@/hooks/useSettings";
import { AGGREGATOR_ADDR } from "@/contracts";
import { getXFusionTxData } from "@/utils/trade";
import AggregatorABI from "@/contracts/AggregatorABI";
import toast from "react-hot-toast";
import CustomToast from "../CustomToast";
import { createPublicClient, erc20Abi } from "viem";
import { routeProcessor3Abi, acrossPortalAbi } from "@/packages/abi";
import {
  ACROSS_PORTAL_ADDRESS,
  config,
  ROUTE_PROCESSOR_3_ADDRESS,
} from "@/packages/config";
import {
  addressToBytes32,
  waitForDepositTx,
  waitForFillTx,
} from "@across-protocol/app-sdk";
import { ACROSS_STATUS } from "@/packages/across";
import { delay } from "@/utils";

interface SwapButtonProps {
  trade: UseQueryResult<any, Error>;
}

const SwapButton: React.FC<SwapButtonProps> = ({ trade }) => {
  const { address, chainId } = useAccount();
  const { open } = useWeb3Modal();
  const { amountIn, tokenIn, tokenOut, setAmountIn, setTokenIn, setTokenOut } =
    useSwapParams();
  const originPublicClient = usePublicClient({
    chainId: tokenIn?.chainId ?? ChainId.INK,
  });
  const destPublicClient = usePublicClient({
    chainId: tokenOut?.chainId ?? ChainId.INK,
  });
  const { data: walletClient } = useWalletClient();
  const { switchChainAsync } = useSwitchChain();
  const [loading, setLoading] = useState(false);
  const [approving, setApproving] = useState(false);

  const parsedAmount = tryParseAmount(amountIn, tokenIn);

  const [approvalState, approve, approvalRequest] = useTokenApproval({
    amount: parsedAmount,
    spender:
      tokenIn?.chainId === tokenOut?.chainId
        ? ROUTE_PROCESSOR_3_ADDRESS[tokenIn?.chainId ?? ChainId.INK]
        : ACROSS_PORTAL_ADDRESS[tokenIn?.chainId ?? ChainId.INK],
    enabled: Boolean(parsedAmount),
  });

  const onSwap = async () => {
    if (!address || !originPublicClient || !walletClient || !destPublicClient) {
      open?.();
    } else if (chainId !== tokenIn?.chainId) {
      switchChainAsync?.({ chainId: tokenIn?.chainId ?? ChainId.INK });
    } else {
      try {
        if (!tokenIn || !tokenOut) return;
        await trade.refetch();

        if (!trade.data) return;

        const swapTrade = { ...trade.data };

        setLoading(true);

        const curTokenIn = tokenIn;
        const curTokenOut = tokenOut;
        const curTrade = trade.data;

        if (!trade.data.isBridge) {
          const balanceBefore = tokenOut.isNative
            ? await originPublicClient.getBalance({ address })
            : await originPublicClient.readContract({
                abi: erc20Abi,
                address: tokenOut.address,
                functionName: "balanceOf",
                args: [address],
              });

          const { request } = await originPublicClient.simulateContract({
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
          });

          const hash = await walletClient.writeContract(request);

          const res = await originPublicClient.waitForTransactionReceipt({
            hash,
          });

          const balanceAfter = curTokenOut.isNative
            ? await originPublicClient.getBalance({ address })
            : await originPublicClient.readContract({
                abi: erc20Abi,
                address: curTokenOut.address,
                functionName: "balanceOf",
                args: [address],
              });

          toast.custom((t) => (
            <CustomToast
              t={t}
              type="success"
              text={`Swap ${Amount.fromRawAmount(
                curTokenIn,
                swapTrade.amountIn
              ).toSignificant(6)} ${
                swapTrade.tokenIn.symbol
              } for ${Amount.fromRawAmount(
                curTokenOut,
                balanceAfter - balanceBefore
              ).toSignificant(6)} ${swapTrade.tokenOut.symbol}`}
              hash={hash}
              chainId={curTokenIn.chainId}
            />
          ));

          console.log(res);
        } else {
          const balanceBefore = tokenOut.isNative
            ? await destPublicClient.getBalance({ address })
            : await destPublicClient.readContract({
                abi: erc20Abi,
                address: tokenOut.address,
                functionName: "balanceOf",
                args: [address],
              });
          const wethBalanceBefore = await originPublicClient.readContract({
            abi: erc20Abi,
            address: WETH9[tokenOut.chainId].address,
            functionName: "balanceOf",
            args: [address],
          });

          const currentDestBlock = await destPublicClient.getBlockNumber();

          console.log(
            {
              tokenIn: trade.data.originalData.calldata.tokenIn,
              amountIn: trade.data.originalData.calldata.amountIn,
              tokenOut: trade.data.originalData.calldata.tokenOut,
              amountOutMin: trade.data.originalData.calldata.amountOutMin,
              routeCode: trade.data.originalData.calldata.routeCode,
            },
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
              outputToken: addressToBytes32(trade.data.depositData.outputToken),
              quoteTimestamp: trade.data.depositData.quoteTimestamp,
              recipient: addressToBytes32(trade.data.depositData.recipient),
            },
            {
              value: tokenIn.isNative
                ? trade.data.originalData.calldata.amountIn
                : 0n,
            }
          );

          const { request } = await originPublicClient.simulateContract({
            abi: acrossPortalAbi,
            address: ACROSS_PORTAL_ADDRESS[tokenIn.chainId],
            account: address,
            functionName: "sendSwapRequest",
            args: [
              {
                tokenIn: trade.data.originalData.calldata.tokenIn,
                amountIn: trade.data.originalData.calldata.amountIn,
                tokenOut: trade.data.originalData.calldata.tokenOut,
                amountOutMin: trade.data.originalData.calldata.amountOutMin,
                routeCode: trade.data.originalData.calldata.routeCode,
              },
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
            value: tokenIn.isNative
              ? trade.data.originalData.calldata.amountIn
              : 0n,
          });

          const hash = await walletClient.writeContract(request);

          const { depositId } = await waitForDepositTx({
            originChainId: curTokenIn.chainId,
            publicClient: originPublicClient,
            transactionHash: hash,
          });

          const destinationChainClient = createPublicClient({
            ...config[curTokenOut.chainId][0],
          });

          const fillStatus = await waitForFillTx({
            deposit: {
              destinationChainId: curTrade.depositData.destinationChainId,
              destinationSpokePoolAddress:
                curTrade.depositData.destinationSpokePoolAddress,
              message: curTrade.depositData.message,
              originChainId: curTrade.depositData.originChainId,
            },
            depositId,
            destinationChainClient: destinationChainClient as any,
            fromBlock: currentDestBlock - 100n,
          });

          // await delay(10000)

          const balanceAfter = curTokenOut.isNative
            ? await destPublicClient.getBalance({ address })
            : await destPublicClient.readContract({
                abi: erc20Abi,
                address: curTokenOut.address,
                functionName: "balanceOf",
                args: [address],
              });
          const wethBalanceAfter = await originPublicClient.readContract({
            abi: erc20Abi,
            address: WETH9[tokenOut.chainId].address,
            functionName: "balanceOf",
            args: [address],
          });

          const isFailedSwap =
            balanceAfter <= balanceBefore &&
            wethBalanceAfter >= wethBalanceBefore;

          toast.custom((t) =>
            !isFailedSwap ? (
              <CustomToast
                t={t}
                type="success"
                text={`Swap ${Amount.fromRawAmount(
                  curTokenIn,
                  swapTrade.amountIn
                ).toSignificant(6)} ${
                  swapTrade.tokenIn.symbol
                } for ${Amount.fromRawAmount(
                  curTokenOut,
                  balanceAfter - balanceBefore
                ).toSignificant(6)} ${swapTrade.tokenOut.symbol}`}
                hash={hash}
                chainId={curTokenIn.chainId}
              />
            ) : (
              <CustomToast
                t={t}
                type="info"
                text={
                  <>
                    Part of your cross-chain swap was completed successfully,
                    but the final step couldn&apos;t be executed due to high
                    volatility. As a protective measure, you&apos;ve received
                    wETH on the destination chain instead of
                    {curTokenOut.symbol} to prevent a poor-rate swap.
                    <br />
                    <br />
                    You can now swap your wETH to {curTokenOut.symbol} on
                    SuperSwap — with 0% fees on this transaction.
                  </>
                }
              ></CustomToast>
            )
          );
          if (isFailedSwap) {
            setTokenIn(WETH9[curTokenOut.chainId]);
            setTokenOut(curTokenOut);
          }
          console.log(fillStatus);
        }

        setAmountIn("");
      } catch (err: any) {
        console.log(err);
        if (!err?.message?.includes("User rejected the request.")) {
          toast.custom((t) => (
            <CustomToast
              t={t}
              type="error"
              text={`Failed to send the transaction. Please check the slippage and try again later.`}
            />
          ));
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const onApprove = async () => {
    try {
      setApproving(true);
      await approve(approvalRequest);
    } catch (err) {
      console.log(err);
    } finally {
      setApproving(false);
    }
  };

  const { data: balance } = useBalance({
    address,
    token: tokenIn instanceof Token ? tokenIn.address : undefined,
    query: {
      enabled: Boolean(address) && Boolean(tokenIn),
      refetchInterval: 30000,
    },
  });

  const fetching =
    Boolean(tokenIn) &&
    Boolean(tokenOut) &&
    Boolean(parsedAmount?.greaterThan(0n)) &&
    (trade.isFetching || trade.isLoading || trade.isPending);
  const wrongNetworkError = chainId !== tokenIn?.chainId;
  const nonAssetError = !tokenIn || !tokenOut;
  const nonAmountError = !(
    tokenIn &&
    amountIn &&
    tryParseAmount(amountIn, tokenIn)?.greaterThan(0n)
  );
  const insufficientBalanceError =
    Number(amountIn) > Number(balance?.formatted ?? "0");

  const isError = nonAmountError || nonAssetError || insufficientBalanceError;

  const acrossError =
    tokenIn && tokenOut && tokenIn.chainId !== tokenOut.chainId && trade.data
      ? trade.data?.status === ACROSS_STATUS.LOW_AMOUNT
        ? "Amount Too Low"
        : trade.data?.status === ACROSS_STATUS.HIGH_AMOUNT
        ? "Amount Too High"
        : trade.data?.status === ACROSS_STATUS.NO_ROUTE
        ? "No Route"
        : trade.data?.status === ACROSS_STATUS.FAILED
        ? "Failed to Fetch"
        : undefined
      : undefined;

  return (
    <div className="mt-4">
      {!fetching &&
      !acrossError &&
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
          Boolean(acrossError) ||
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
        ) : acrossError ? (
          acrossError
        ) : insufficientBalanceError ? (
          `Insufficient ${tokenIn?.symbol} Balance`
        ) : (
          "Swap"
        )}
      </button>
    </div>
  );
};

export default SwapButton;
