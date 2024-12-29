import { ChainId } from "@/packages/chain";
import { DEFAULT_TOKEN_LIST, PRIMARY_TOKEN_LIST } from "@/packages/config";
import { Native, Token } from "@/packages/currency";
import { useAccount } from "wagmi";

const useTokenList = (primaryTokens?: boolean) => {
  const { chainId } = useAccount();

  const defaultTokens = [
    Native.onChain(ChainId.INK),
    ...(primaryTokens ? PRIMARY_TOKEN_LIST : DEFAULT_TOKEN_LIST)
      .filter((item) => item.chainId === ChainId.INK)
      .map((item) =>
        "native" in item
          ? Native.onChain(ChainId.INK)
          : new Token({
              chainId: ChainId.INK,
              address: item.address,
              decimals: item.decimals,
              name: item.name,
              symbol: item.symbol,
              icon: item.icon,
              category: item.category,
            })
      ),
  ];

  return defaultTokens;
};

export default useTokenList;
