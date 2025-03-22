import Coin from "../svgs/Coin"
import InkSwapImg from "../../assets/swap/InkSwap.png"
import InkySwapImg from "../../assets/swap/InkySwap.png"
import SquidSwapImg from "../../assets/swap/SquidSwap.png"
import DyorSwapImg from "../../assets/swap/DyorSwap.png"
import ReservoirSwapImg from "../../assets/swap/ReservoirSwap.png"
import VelodromeSwapImg from "../../assets/swap/VelodromeSwap.png"
import LogoDark from "../../assets/logo-mb-dark.png"
import LogoLight from "../../assets/logo-mb-light.png"
import Image from "next/image"
import useSwapTrade from "@/hooks/useSwapTrade"
import useSwapParams from "@/hooks/useSwapParams"
import { Amount } from "@/packages/currency"
import { LiquidityProviders } from "@/packages/router"
import useEachSwapTrade, {
  SUPPORTED_SWAPCOMP_NETWORKS,
} from "@/hooks/useEachSwapTrade"

const metadata = {
  [LiquidityProviders.InkSwap]: { image: InkSwapImg, name: "InkSwap" },
  [LiquidityProviders.InkySwap]: { image: InkySwapImg, name: "InkySwap" },
  [LiquidityProviders.SquidSwap]: { image: SquidSwapImg, name: "SquidSwap" },
  [LiquidityProviders.DyorSwap]: { image: DyorSwapImg, name: "DyorSwap" },
  [LiquidityProviders.ReservoirSwap]: {
    image: ReservoirSwapImg,
    name: "ReservoirSwap",
  },
  [LiquidityProviders.VelodromeSwapV2]: {
    image: VelodromeSwapImg,
    name: "Velodrome",
  },
} as any

const SwapComp = () => {
  const { tokenIn, tokenOut } = useSwapParams()
  const trade = useSwapTrade()
  const bestTrade = useEachSwapTrade()

  const tradeProfit =
    tokenIn &&
    tokenOut &&
    trade &&
    trade.data &&
    bestTrade.data &&
    !trade.data.isBridge &&
    BigInt(trade.data.amountOut ?? "0") >
      BigInt(bestTrade.data.amountOut.toString())
      ? Amount.fromRawAmount(tokenOut, trade.data.amountOut ?? "0").subtract(
          Amount.fromRawAmount(tokenOut, bestTrade.data.amountOut.toString())
        )
      : undefined

  return tokenIn?.chainId !== tokenOut?.chainId ||
    !SUPPORTED_SWAPCOMP_NETWORKS.find(
      (network) => network === tokenIn?.chainId
    ) ? null : trade.data && bestTrade.data && tradeProfit ? (
    <div className="flex items-center bg-white dark:bg-[#131823] relative p-4 mt-4 rounded-lg md:rounded-[32px] shadow-[0_12px_24px_#e2e9f6] dark:shadow-none">
      <div className="rounded-full p-2.5 bg-[#2f8af529] w-fit mr-6">
        <Coin className="text-[#2f8af5]" />
      </div>
      <div className="text-sm font-semibold text-[#6c86ad] max-w-[400px]">
        You&apos;re getting {tradeProfit.toSignificant(6)} more{" "}
        {tokenOut?.symbol} for the same swap compared to &nbsp;
        <div className="inline-flex items-center justify-center border border-[#e3e7ee] dark:border-[#202835] w-5 h-5 p-0.5 rounded-md translate-y-1">
          <Image
            src={metadata[bestTrade.data.provider].image.src}
            width={metadata[bestTrade.data.provider].image.width}
            height={metadata[bestTrade.data.provider].image.height}
            alt="swap"
            className={
              metadata[bestTrade.data.provider].image === InkySwapImg
                ? "invert dark:invert-0"
                : ""
            }
          />
        </div>
        &nbsp; {metadata[bestTrade.data.provider].name}
      </div>
    </div>
  ) : trade.data &&
    !bestTrade.data &&
    !bestTrade.isLoading &&
    !bestTrade.isPending &&
    bestTrade.isFetched ? (
    <div className="flex items-center bg-white dark:bg-[#131823] relative p-4 mt-4 rounded-lg md:rounded-[32px] shadow-[0_12px_24px_#e2e9f6] dark:shadow-none">
      <div className="rounded-full p-2.5 bg-[#2f8af529] w-fit mr-6">
        <Coin className="text-[#2f8af5]" />
      </div>
      <div className="text-sm font-semibold text-[#6c86ad] max-w-[400px]">
        The best price for this swap is on{" "}
        <div className="inline-flex items-center translate-y-[3px]">
          <div className="inline-flex items-center justify-center border border-[#e3e7ee] dark:border-[#202835] w-5 h-5 p-0.5 rounded-md mr-0.5">
            <Image
              src={LogoDark.src}
              width={LogoDark.width}
              height={LogoDark.height}
              alt="swap"
              className="hidden dark:block"
            />
            <Image
              src={LogoLight.src}
              width={LogoLight.width}
              height={LogoLight.height}
              alt="swap"
              className="dark:hidden"
            />
          </div>{" "}
          SuperSwap!
        </div>
      </div>
    </div>
  ) : null
}

export default SwapComp
