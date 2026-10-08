// import { sepolia, baseSepolia, opBNBTestnet } from "wagmi/chains";

const injectiveTestnetRpcUrl =
  "https://k8s.testnet.json-rpc.injective.network/";
const injectiveTestnetExplorerUrl =
  "https://testnet.explorer.injective.network/";

// Injective Testnet Configuration
const injectiveTestnet = {
  id: 1439,
  name: "INJ Testnet",
  nativeCurrency: { name: "Injective", symbol: "INJ", decimals: 18 },
  rpcUrls: {
    default: { http: [injectiveTestnetRpcUrl] },
  },
  blockExplorers: {
    default: {
      name: "Injective Explorer",
      url: injectiveTestnetExplorerUrl,
    },
  },
  testnet: true,
};

const CHAIN_IDS = {
  SEPOLIA: 11155111,
  BASE_SEPOLIA: 84532,
  OPBNB_TESTNET: 5611,
};

export const CONTRACT_ADDRESSES = {
  [CHAIN_IDS.SEPOLIA]: {
    bounty: "Loading...",
  },
  [CHAIN_IDS.BASE_SEPOLIA]: {
    bounty: "Loading...",
  },
  [CHAIN_IDS.OPBNB_TESTNET]: {
    bounty: "Loading...",
  },
  [injectiveTestnet.id]: {
    bounty: "0xc49c0457c656B901324cB7f9b6736D80f1DBD28B",
  },
};
