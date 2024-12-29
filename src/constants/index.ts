import { ChainId } from "@/packages/chain"
import Ink from "@/assets/network/ink.png"

export const DEFAULT_IMAGE_URL = "/media/unknown.svg"

export const NATIVE_GAS_FEE = 1000000000000000n

export const SWAP_FEE = 0n

export const CHAIN_IFNO = {
  [ChainId.INK]: {
    id: ChainId.INK,
    image: Ink,
    name: "Ink",
  },
}
