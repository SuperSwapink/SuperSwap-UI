import { AddressMapper } from "../AddressMapper";
import {
  USDC_ADDRESS,
  WETH9_ADDRESS,
  // WNATIVE_ADDRESS,
} from "./token-addresses";

const MERGED_USDC_ADDRESS = AddressMapper.merge(USDC_ADDRESS);

const MERGED_WETH_ADDRESS = AddressMapper.merge(WETH9_ADDRESS);

export const TOKEN_MAP = AddressMapper.generate([
  MERGED_USDC_ADDRESS,
  MERGED_WETH_ADDRESS,
]);
