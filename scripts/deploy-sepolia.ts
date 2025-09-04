import hre from "hardhat";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

async function main() {
  console.log("🚀 Deploying Governor and VotingTokenERC721 to Sepolia...");

  // Check environment variables
  const sepoliaRpcUrl = process.env.SEPOLIA_RPC_URL;
  const sepoliaPrivateKey = process.env.SEPOLIA_PRIVATE_KEY;

  if (!sepoliaRpcUrl || !sepoliaPrivateKey) {
    console.log("❌ Missing required environment variables!");
    console.log("Please set SEPOLIA_RPC_URL and SEPOLIA_PRIVATE_KEY in your .env file");
    process.exit(1);
  }

  try {
    // Deploy using Hardhat Ignition
    console.log("\n📄 Deploying contracts...");
    const result = await hre.ignition.deploy("GovernorDeployment", {
      parameters: {},
    });

    const votingTokenAddress = result.votingToken.address;
    const governorAddress = result.governor.address;

    console.log("\n🎉 Deployment Successful!");
    console.log("=====================================");
    console.log("📄 VotingTokenERC721:", votingTokenAddress);
    console.log("🏛️ Governor Contract:", governorAddress);
    console.log("🌐 Network: Sepolia Testnet");
    console.log("=====================================");

    // Save deployment info
    const deploymentInfo = {
      network: "sepolia",
      votingToken: votingTokenAddress,
      governor: governorAddress,
      timestamp: new Date().toISOString(),
      etherscan: {
        votingToken: `https://sepolia.etherscan.io/address/${votingTokenAddress}`,
        governor: `https://sepolia.etherscan.io/address/${governorAddress}`,
      },
    };

    const deploymentsDir = join(__dirname, "../deployments");
    if (!require("fs").existsSync(deploymentsDir)) {
      mkdirSync(deploymentsDir, { recursive: true });
    }

    const deploymentFile = join(deploymentsDir, "sepolia.json");
    writeFileSync(deploymentFile, JSON.stringify(deploymentInfo, null, 2));
    
    console.log(`💾 Deployment info saved to: ${deploymentFile}`);

    console.log("\n🔍 Next Steps:");
    console.log("1. Verify contracts on Etherscan:");
    console.log(`   npx hardhat verify --network sepolia ${votingTokenAddress} "0x${process.env.SEPOLIA_PRIVATE_KEY?.slice(2, 42)}"`);
    console.log(`   npx hardhat verify --network sepolia ${governorAddress} "${votingTokenAddress}"`);
    
    console.log("\n2. View on Etherscan:");
    console.log(`   VotingToken: https://sepolia.etherscan.io/address/${votingTokenAddress}`);
    console.log(`   Governor: https://sepolia.etherscan.io/address/${governorAddress}`);

  } catch (error) {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("❌ Script failed:", error);
  process.exitCode = 1;
});
