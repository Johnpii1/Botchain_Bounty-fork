import { NATIVE_TOKENS } from "./chains.address";

// Payout types for multiple winners
export const PayoutType = {
  SINGLE: 0,
  MULTI_EQUAL: 1,
  MULTI_PERCENTAGE: 2,
};

// For multiple winners, we have two options: equal split or percentage-based
export const getPayoutType = ({ winnersAllowed, payoutType }) => {
  if (winnersAllowed === 1 || payoutType === "SINGLE") return PayoutType.SINGLE;
  if (payoutType === "MULTI_EQUAL") return PayoutType.MULTI_EQUAL;
  if (payoutType === "MULTI_PERCENTAGE") return PayoutType.MULTI_PERCENTAGE;

  return PayoutType.SINGLE; // default to single if something's off
};

// ===============================
// 1. Contract Enum (Solidity mapping)
// Must match the Solidity enum order exactly.
// ===============================
export const TokenType = {
  USDC: 0,
};

// ===============================
// 2. Internal Canonical Tokens
// ===============================
export const TOKENS = {
  NATIVE: "USDC",
};

// ===============================
// 3. Build per-chain UI → Internal map
// Derives from NATIVE_TOKENS + TOKEN_ADDRESSES.
// ===============================
export const buildUiTokenMap = (chainId) => {
  const map = {};

  // Native token for this chain (INJ, tCTC, ...)
  const native = NATIVE_TOKENS[chainId];
  if (native) {
    // Map both the symbol and the canonical "NATIVE" key
    map[native.symbol.toUpperCase()] = TOKENS.NATIVE;
    // Optional aliases for the UI
    map["USDC"] = TOKENS.NATIVE;
  }

  return map;
};

// ===============================
// 4. Internal → Contract Enum Mapping
// ===============================
export const TOKEN_TYPE_MAP = {
  [TOKENS.NATIVE]: TokenType.NATIVE,
};

// ===============================
// 5. Normalize UI token (chain-aware)
// ===============================
export const normalizeToken = (uiToken, chainId) => {
  if (!uiToken) throw new Error("Token is required");
  if (!chainId) throw new Error("chainId is required");

  const uiMap = buildUiTokenMap(chainId);
  const normalized = uiMap[uiToken.toUpperCase()];

  if (!normalized) {
    throw new Error(`Unsupported UI token "${uiToken}" on chain ${chainId}`);
  }

  return normalized;
};

// ===============================
// 6. Get contract enum from internal token
// ===============================
export const getTokenType = (token) => {
  const type = TOKEN_TYPE_MAP[token];
  if (type === undefined) {
    throw new Error(`Unsupported token: ${token}`);
  }
  return type;
};

// ===============================
// 7. One-step resolver (UI → enum), chain-aware
// ===============================
export const resolveTokenType = (uiToken, chainId) => {
  const normalized = normalizeToken(uiToken, chainId);
  return getTokenType(normalized);
};

// ===============================
// 8. Get token metadata (decimals, address) for a chain
// ===============================
export const getTokenMeta = (uiToken, chainId) => {
  if (!uiToken) throw new Error("Token is required");
  if (!chainId) throw new Error("chainId is required");

  const upper = uiToken.toUpperCase();
  const native = NATIVE_TOKENS[chainId];

  // Native?
  if (native && (upper === native.symbol.toUpperCase() || upper === "NATIVE")) {
    return {
      kind: "native",
      symbol: native.symbol,
      decimals: native.decimals,
      address: null,
      tokenType: TokenType.NATIVE,
    };
  }

  throw new Error(`Unknown token "${uiToken}" on chain ${chainId}`);
};

// ===============================
// 9. Convenience: list tokens available on a chain (for UI dropdowns)
// ===============================
export const listTokensForChain = (chainId) => {
  const out = [];

  const native = NATIVE_TOKENS[chainId];
  if (native) {
    out.push({
      key: "USDC",
      label: native.symbol,
      kind: "native",
      decimals: native.decimals,
      tokenType: TokenType.NATIVE,
    });
  }

  return out;
};
