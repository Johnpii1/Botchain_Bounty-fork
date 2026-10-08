const { createPublicClient, http } = require("viem");
const { injectiveTestnet } = require("../config/chain"); // adjust path
const { BOUNTY_ABI } = require("../utils/contract");
const { getDb } = require("../config/db");

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const publicClient = createPublicClient({
  chain: injectiveTestnet,
  transport: http(),
});

function startEventListener() {
  console.log("Starting BountyCreated event listener...");

  publicClient.watchContractEvent({
    address: CONTRACT_ADDRESS,
    abi: BOUNTY_ABI,
    eventName: "BountyCreated",

    onLogs: async (logs) => {
      const db = getDb();

      for (const log of logs) {
        try {
          const { bountyId, creator, reward, fee, tokenType, payoutType } =
            log.args;

          const blockchainId = Number(bountyId);

          console.log(`📡 Event detected: Bounty ${blockchainId}`);

          // 1. Check if already exists
          const existing = await db
            .collection("bounty")
            .findOne({ blockchainId });

          if (existing) {
            console.log(`⚠️ Bounty ${blockchainId} already exists`);
            continue;
          }

          // 2. Insert into DB
          await db.collection("bounty").insertOne({
            title: "Recovered Bounty",
            description: "Auto-synced from blockchain event",
            category: "onchain",
            tags: ["onchain"],
            startDate: new Date().toISOString(),
            deadline: new Date().toISOString(),
            originLink: "",
            network: "Injective",

            reward: Number(reward) / 1e18,
            fee: Number(fee) / 1e18,

            token: tokenType === 0 ? "NATIVE" : "USDC",
            winnersAllowed: 1,
            payoutType: payoutType === 0 ? "single" : "multiple",

            creator,
            blockchainId,
            txHash: log.transactionHash,

            isOnChain: true,
            status: "active",

            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });

          console.log(`✅ Inserted bounty ${blockchainId}`);
        } catch (err) {
          console.error("❌ Error processing event:", err.message);
        }
      }
    },

    onError: (err) => {
      console.error("🚨 Event listener error:", err);
    },
  });
}

module.exports = startEventListener;
