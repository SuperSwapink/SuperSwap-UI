"use client";

import { SettingsProvider } from "@/hooks/useSettings";
import { SwapParamsProvider } from "@/hooks/useSwapParams";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { defineChain } from "viem";

import { WagmiProvider, cookieStorage, createStorage } from "wagmi";

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error("Project ID is not defined");

export const ink = defineChain({
  id: 57073,
  name: "Ink",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc-qnd.inkonchain.com"],
    },
  },
  blockExplorers: {
    default: {
      name: "Inkonchain Explorer",
      url: "https://explorer.inkonchain.com/",
      apiUrl: "https://explorer.inkonchain.com/api",
    },
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 956889,
    },
  },
});

const metadata = {
  name: "SuperSwap",
  description: "SuperSwap",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [ink] as const;
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});

const queryClient = new QueryClient();

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true,
  enableOnramp: false,
  themeMode: "light",
});

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <SettingsProvider>
          <SwapParamsProvider>{children}</SwapParamsProvider>
        </SettingsProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
