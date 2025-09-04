import "dotenv/config";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import "@nomicfoundation/hardhat-verify";

if (!process.env.ETHERSCAN_API_KEY) throw new Error("ETHERSCAN_API_KEY missing");
console.log("[verify] key length:", process.env.ETHERSCAN_API_KEY?.length);

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.28",
    settings: { optimizer: { enabled: true, runs: 200 } },
  },
  networks: {
    sepolia: {
      type: "http",
      url: process.env.SEPOLIA_RPC_URL!,
      accounts: [process.env.SEPOLIA_PRIVATE_KEY!],
    },
  },
  // ✅ HH3: verification config lives under `verify`
  verify: {
    etherscan: { apiKey: process.env.ETHERSCAN_API_KEY },
  },
};

export default config;
