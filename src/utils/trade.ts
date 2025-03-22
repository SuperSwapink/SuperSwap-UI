import { routeProcessor3Abi } from "@/packages/abi"
import { ChainId } from "@/packages/chain"
import { ROUTE_PROCESSOR_3_ADDRESS } from "@/packages/config"
import { Amount, Token, Type, USDC, USDC_ADDRESS } from "@/packages/currency"
import { Percent } from "@/packages/math"
import { LiquidityProviders, PoolCode, Router } from "@/packages/router"
import { RouteStatus } from "@/packages/tines"
import axios from "axios"
import { Address, encodeFunctionData } from "viem"

const FEE_ENABLED = false

export const getXFusionTrade = async (
  tokenIn: Type,
  tokenOut: Type,
  recipient: Address,
  slippage: number,
  amountIn: string,
  poolsCodeMap?: Map<string, PoolCode>
) => {
  if (!poolsCodeMap) return undefined
  const parsedAmountIn =
    tokenIn.wrapped.address === tokenOut.wrapped.address
      ? BigInt(amountIn)
      : (BigInt(amountIn) * (FEE_ENABLED ? 9900n : 10000n)) / 10000n
  const route = Router.findBestRoute(
    poolsCodeMap,
    tokenIn.chainId,
    tokenIn,
    parsedAmountIn,
    tokenOut,
    10000000,
    100
  )

  console.log(route)

  if (route && route.status === RouteStatus.Success) {
    const amountIn = Amount.fromRawAmount(tokenIn, route.amountInBI.toString())
    const amountOut = Amount.fromRawAmount(
      tokenOut,
      route.amountOutBI.toString()
    )

    const args = Router.routeProcessor3Params(
      poolsCodeMap,
      route,
      tokenIn,
      tokenOut,
      recipient,
      ROUTE_PROCESSOR_3_ADDRESS[tokenIn.chainId],
      [],
      +slippage / 100
    )

    return {
      tokenIn,
      tokenOut,
      recipient,
      slippage,
      amountIn: amountIn.quotient.toString(),
      amountInValue: 0,
      amountOut: amountOut.quotient.toString(),
      amountOutValue: 0,
      priceImpact: Number(
        (route.priceImpact
          ? new Percent(BigInt(Math.round(route.priceImpact * 10000)), 10000n)
          : new Percent(0)
        ).toFixed(6)
      ),
      data: args,
      type: "SuperSwap",
    }
  }
}

export const getBestSwap = async (
  tokenIn: Type,
  tokenOut: Type,
  slippage: number,
  amountIn: string,
  poolsCodeMap?: Map<string, PoolCode>
) => {
  if (!poolsCodeMap) return undefined
  const parsedAmountIn =
    tokenIn.wrapped.address === tokenOut.wrapped.address
      ? BigInt(amountIn)
      : (BigInt(amountIn) * (FEE_ENABLED ? 9900n : 10000n)) / 10000n
  console.log(slippage)

  const reservoirSwap = await axios
    .post("https://apiv2.staging.reservoir.w3us.site/quote", {
      tokenInChainId: 57073,
      tokenIn: tokenIn.wrapped.address,
      tokenOutChainId: 57073,
      tokenOut: tokenOut.wrapped.address,
      amount: parsedAmountIn.toString(),
      sendPortionEnabled: true,
      type: "EXACT_INPUT",
      intent: "quote",
      configs: [
        {
          enableUniversalRouter: true,
          protocols: ["V2", "V3", "MIXED"],
          routingType: "CLASSIC",
          enableFeeOnTransferFeeFetching: true,
        },
      ],
      useUniswapX: false,
      slippageTolerance: slippage.toString(),
    })
    .catch((err) => {})

  let routes = [
    { provider: [LiquidityProviders.InkSwap], protocolFee: 0n },
    { provider: [LiquidityProviders.InkySwap], protocolFee: 0n },
    { provider: [LiquidityProviders.SquidSwap], protocolFee: 0n },
    { provider: [LiquidityProviders.DyorSwap], protocolFee: 3n },
    {
      provider: [
        LiquidityProviders.VelodromeSwapV2,
        LiquidityProviders.VelodromeSwapV3,
      ],
      protocolFee: 0n,
    },
  ]
    .map((provider) => ({
      ...Router.findBestRoute(
        poolsCodeMap,
        ChainId.INK,
        tokenIn,
        parsedAmountIn,
        tokenOut,
        10000000,
        100,
        provider.provider,
        tokenIn === USDC[ChainId.INK] || tokenOut === USDC[ChainId.INK]
          ? undefined
          : (pool) =>
              pool.token0.address.toLowerCase() !==
                USDC[ChainId.INK].address.toLowerCase() &&
              pool.token1.address.toLowerCase() !==
                USDC[ChainId.INK].address.toLowerCase()
      ),
      ...provider,
    }))
    .filter((item) => item.status === "Success")
    .map((route) => ({
      provider: route.provider[0],
      amountOut:
        (BigInt(route.amountOutBI) * (1000n - route.protocolFee)) / 1000n,
      legs: route.legs,
    }))

  console.log(routes)

  if (reservoirSwap?.data?.quote) {
    routes.push({
      provider: LiquidityProviders.ReservoirSwap,
      amountOut: BigInt(reservoirSwap?.data?.quote?.quote ?? "0"),
      legs: [],
    })
  }

  routes.sort((a, b) => (a.amountOut < b.amountOut ? 1 : -1))

  return routes?.[0]
}

export const getXFusionTxData = async (trade: any) => {
  const targetData = encodeFunctionData({
    abi: routeProcessor3Abi,
    functionName: "processRoute",
    args: [
      trade.data?.tokenIn,
      trade.data?.amountIn,
      trade.data?.tokenOut,
      trade.data?.amountOutMin,
      trade.data?.to,
      trade.data?.routeCode,
    ],
  })
  return {
    amountIn: BigInt(trade?.amountIn ?? "0"),
    amountOut: BigInt(trade?.amountOut ?? "0"),
    args: {
      target: ROUTE_PROCESSOR_3_ADDRESS[ChainId.INK],
      tokenIn:
        trade.tokenIn instanceof Token
          ? trade.tokenIn.address
          : "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      targetData,
      amountIn: BigInt(trade.data?.amountIn ?? "0"),
      fee: false,
    },
    value: trade?.data?.value,
  }
}
