import "dotenv/config";
import hre from "hardhat";
import { verifyContract } from "@nomicfoundation/hardhat-verify/verify";

async function main() {
  console.log("🔍 Verifying contracts using programmatic approach...");

  // Contract addresses from Sepolia deployment
  const VOTING_TOKEN_ADDRESS = "0x9Cc0a986441c56878A944BD9F9299237670748b3";
  const GOVERNOR_ADDRESS = "0xC8Ff00Ecde35b21fbD9F9E4a02Cc413D8FE3FB49";
  const DEPLOYER_ADDRESS = "0xD78C12137087D394c0FA49634CAa80D0a1985A8A";

  try {
    console.log("\n📄 Verifying VotingTokenERC721...");
    await verifyContract(
      {
        address: VOTING_TOKEN_ADDRESS,
        constructorArgs: [DEPLOYER_ADDRESS],
        provider: "etherscan",
      },
      hre,
    );
    console.log("✅ VotingTokenERC721 verified successfully!");

    console.log("\n🏛️ Verifying Governor contract...");
    await verifyContract(
      {
        address: GOVERNOR_ADDRESS,
        constructorArgs: [VOTING_TOKEN_ADDRESS],
        provider: "etherscan",
      },
      hre,
    );
    console.log("✅ Governor contract verified successfully!");

    console.log("\n🎉 All contracts verified on Etherscan!");
    console.log("\n📋 Contract Links:");
    console.log("VotingTokenERC721:", `https://sepolia.etherscan.io/address/${VOTING_TOKEN_ADDRESS}`);
    console.log("Governor Contract:", `https://sepolia.etherscan.io/address/${GOVERNOR_ADDRESS}`);

  } catch (error) {
    console.error("❌ Verification failed:", error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("❌ Script failed:", error);
  process.exitCode = 1;
});
