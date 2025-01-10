import Coin from "../svgs/Coin";
import InkSwapImg from "../../assets/swap/InkSwap.png";
import InkySwapImg from "../../assets/swap/InkySwap.png";
import SquidSwapImg from "../../assets/swap/SquidSwap.png";
import DyorSwapImg from "../../assets/swap/DyorSwap.png";
import ReservoirSwapImg from "../../assets/swap/ReservoirSwap.png";
import LogoDark from "../../assets/logo-mb-dark.png";
import LogoLight from "../../assets/logo-mb-light.png";
import Image from "next/image";
import useSwapTrade from "@/hooks/useSwapTrade";
import useSwapParams from "@/hooks/useSwapParams";
import { Amount } from "@/packages/currency";
import { LiquidityProviders } from "@/packages/router";
import useEachSwapTrade from "@/hooks/useEachSwapTrade";

const images = {
  [LiquidityProviders.InkSwap]: InkSwapImg,
  [LiquidityProviders.InkySwap]: InkySwapImg,
  [LiquidityProviders.SquidSwap]: SquidSwapImg,
  [LiquidityProviders.DyorSwap]: DyorSwapImg,
  [LiquidityProviders.ReservoirSwap]: ReservoirSwapImg,
} as any;

const SwapComp = () => {
  const { tokenIn, tokenOut } = useSwapParams();
  const trade = useSwapTrade();
  const bestTrade = useEachSwapTrade();

  const tradeProfit =
    tokenIn &&
    tokenOut &&
    trade &&
    trade.data &&
    bestTrade.data &&
    BigInt(trade.data.amountOut) > BigInt(bestTrade.data.amountOut.toString())
      ? Amount.fromRawAmount(tokenOut, trade.data.amountOut).subtract(
          Amount.fromRawAmount(tokenOut, bestTrade.data.amountOut.toString())
        )
      : undefined;

  return trade.data && bestTrade.data && tradeProfit ? (
    <div className="flex items-center bg-white dark:bg-[#131823] relative p-4 mt-4 rounded-lg md:rounded-[32px] shadow-[0_12px_24px_#e2e9f6] dark:shadow-none">
      <div className="rounded-full p-2.5 bg-[#2f8af529] w-fit mr-6">
        <Coin className="text-[#2f8af5]" />
      </div>
      <div className="text-sm font-semibold text-[#6c86ad] max-w-[400px]">
        You&apos;re getting {tradeProfit.toSignificant(6)} more{" "}
        {tokenOut?.symbol} for the same swap compared to &nbsp;
        <div className="inline-flex items-center justify-center border border-[#e3e7ee] dark:border-[#202835] w-5 h-5 p-0.5 rounded-md translate-y-1">
          <Image
            src={images[bestTrade.data.provider].src}
            width={images[bestTrade.data.provider].width}
            height={images[bestTrade.data.provider].height}
            alt="swap"
            className=""
          />
        </div>
        &nbsp; {bestTrade.data.provider}
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
        This swap is available only on{" "}
        <div className="inline-flex items-center justify-center border border-[#e3e7ee] dark:border-[#202835] w-5 h-5 p-0.5 rounded-md translate-y-1">
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
  ) : null;
};

export default SwapComp;
