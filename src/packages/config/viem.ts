import { ink } from "@/app/providers";
import { ChainId } from "../chain";
import { http, type PublicClientConfig } from "viem";

export { ink };

export const config: Record<ChainId, PublicClientConfig[]> = {
  [ChainId.INK]: [
    {
      chain: ink,
      transport: http(`https://rpc-gel.inkonchain.com`),
    },
  ],
} as const;
