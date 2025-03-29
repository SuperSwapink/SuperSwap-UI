export const helperAbi = [
  {
    inputs: [
      { internalType: "address", name: "addr", type: "address" },
      { internalType: "address[]", name: "tokens", type: "address[]" },
    ],
    name: "getBalances",
    outputs: [
      { internalType: "uint256[]", name: "balances", type: "uint256[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const
