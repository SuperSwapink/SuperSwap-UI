import {
  decodeAbiParameters,
  encodeAbiParameters,
  getContractAddress,
  keccak256,
  parseAbiParameters,
} from "viem";
import { Token } from "../../currency";

import { FeeAmount } from "../constants";
import { getContractAddressZkSync } from "@/utils";

/**
 * Computes a pool address
 * @param factoryAddress The Uniswap V3 factory address
 * @param tokenA The first token of the pair, irrespective of sort order
 * @param tokenB The second token of the pair, irrespective of sort order
 * @param fee The fee tier of the pool
 * @param initCodeHashManualOverride Override the init code hash used to compute the pool address if necessary
 * @returns The pool address
 */
export function computePoolAddress({
  factoryAddress,
  tokenA,
  tokenB,
  fee,
  initCodeHashManualOverride,
  zkSync,
}: {
  factoryAddress: string;
  tokenA: Token | string;
  tokenB: Token | string;
  fee: number;
  initCodeHashManualOverride: string;
  zkSync?: boolean;
}): string {
  let salt;
  if (typeof tokenA !== "string" && typeof tokenB !== "string") {
    const [token0, token1] = tokenA.sortsBefore(tokenB)
      ? [tokenA, tokenB]
      : [tokenB, tokenA]; // does safety checks

    salt = keccak256(
      encodeAbiParameters(parseAbiParameters("address, address, uint24"), [
        token0.address,
        token1.address,
        fee,
      ])
    );
  } else {
    salt = keccak256(
      encodeAbiParameters(parseAbiParameters("address, address, uint24"), [
        tokenA as `0x${string}`,
        tokenB as `0x${string}`,
        fee,
      ])
    );
  }

  return zkSync
    ? getContractAddressZkSync({
        from: factoryAddress as `0x${string}`,
        bytecodeHash: initCodeHashManualOverride as `0x${string}`,
        salt,
      })
    : getContractAddress({
        from: factoryAddress as `0x${string}`,
        bytecodeHash: initCodeHashManualOverride as `0x${string}`,
        salt,
        opcode: "CREATE2",
      });
}
