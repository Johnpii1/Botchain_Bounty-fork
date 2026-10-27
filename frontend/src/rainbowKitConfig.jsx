import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { supportedChains } from "./rainbowChains";
import {
  CHAIN_IDS,
  getBountyContract,
} from "./utils/chains.address";

// Environment Variables
const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID;

// Export contract address resolver & default Arc address for backwards compatibility
export { getBountyContract };
export const CONTRACT_ADDRESS = getBountyContract(CHAIN_IDS.ARC_MAINNET);

// RainbowKit Configuration
export default getDefaultConfig({
  appName: "Fresh Bounty",
  projectId: projectId,
  chains: supportedChains,
});
