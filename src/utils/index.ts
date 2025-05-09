import { concat, getAddress, keccak256, pad } from "viem";

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function removeLeadingZeros(value: string): string {
  const [integerPart, decimalPart] = value.split(".");
  const cleanedIntegerPart = integerPart.replace(/^0+(\d)/, "$1") || "";
  return decimalPart !== undefined
    ? `${cleanedIntegerPart}.${decimalPart}`
    : cleanedIntegerPart;
}

export function getContractAddressZkSync({
  from,
  bytecodeHash,
  salt,
}: {
  from: `0x${string}`;
  bytecodeHash: `0x${string}`;
  salt: `0x${string}`;
}) {
  return getAddress(
    `0x${keccak256(
      concat([
        "0x2020dba91b30cc0006188af794c2fb30dd8520db7e2c088b7fc7c103c00ca494",
        pad(from, { size: 32 }),
        salt,
        bytecodeHash,
        "0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
      ])
    ).slice(26)}`
  );
}
