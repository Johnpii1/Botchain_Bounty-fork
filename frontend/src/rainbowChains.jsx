
// Supported Wagmi / RainbowKit chains.
// Supported Wagmi / RainbowKit Chains
export const arcMainnet = {
  id: 5042,
  name: "Arc",
  nativeCurrency: {
    name: "USDC",
    symbol: "USDC",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.mainnet.arc.io"],
    },
  },
  blockExplorers: {
    default: {
      name: "Arc Explorer",
      url: "https://explorer.arc.io",
    },
  },
  testnet: false,
};

export const botchainMainnet = {
  id: 677,
  name: "BOT Chain",
export const botchainTestnet = {
  id: 968,
  name: "BOT Chain Testnet (Bohr)",
  nativeCurrency: {
    name: "BOT",
    symbol: "BOT",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.botchain.ai"],
      http: ["https://rpc.bohr.life"],
    },
  },
  blockExplorers: {
    default: {
      name: "BOTScan",
      url: "https://scan.botchain.ai",
    },
  },
  testnet: false,
};

export const supportedChains = [arcMainnet, botchainMainnet];
      name: "BohrScan",
      url: "https://scan.bohr.life",
    },
  },
  testnet: true,
};

export const supportedChains = [arcMainnet, botchainTestnet];
