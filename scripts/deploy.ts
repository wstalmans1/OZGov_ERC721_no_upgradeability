import { createPublicClient, createWalletClient, http, parseEther, formatEther } from "viem";
import { hardhat } from "viem/chains";
import hre from "hardhat";

async function main() {
  console.log("🚀 Starting deployment of Governor and VotingTokenERC721 contracts...");

  // Get the deployer account
  const [deployer] = await hre.viem.getWalletClients();
  const deployerAddress = deployer.account.address;
  console.log("📝 Deploying contracts with account:", deployerAddress);

  // Check deployer balance
  const publicClient = await hre.viem.getPublicClient();
  const balance = await publicClient.getBalance({
    address: deployerAddress,
  });
  console.log("💰 Account balance:", formatEther(balance), "ETH");

  // Step 1: Deploy VotingTokenERC721
  console.log("\n📄 Step 1: Deploying VotingTokenERC721...");
  const votingToken = await hre.viem.deployContract("VotingTokenERC721", [
    deployerAddress, // initialOwner
  ]);
  
  console.log("✅ VotingTokenERC721 deployed to:", votingToken.address);

  // Step 2: Deploy Governor contract
  console.log("\n🏛️ Step 2: Deploying Governor contract...");
  const governor = await hre.viem.deployContract("Governor_only", [
    votingToken.address, // _token parameter
  ]);

  console.log("✅ Governor contract deployed to:", governor.address);

  // Step 3: Mint some initial tokens for testing
  console.log("\n🎫 Step 3: Minting initial voting tokens...");
  const votingTokenContract = await hre.viem.getContractAt(
    "VotingTokenERC721",
    votingToken.address
  );

  // Mint tokens to the deployer for testing
  const mintTx = await votingTokenContract.write.safeMint([
    deployerAddress,
    1n, // tokenId
  ]);
  console.log("✅ Minted token ID 1 to deployer");
  console.log("🔗 Mint transaction hash:", mintTx);

  // Step 4: Display deployment summary
  console.log("\n🎉 Deployment Summary:");
  console.log("=====================================");
  console.log("📄 VotingTokenERC721:", votingToken.address);
  console.log("🏛️ Governor Contract:", governor.address);
  console.log("👤 Deployer:", deployerAddress);
  console.log("🎫 Initial Token ID 1 minted to:", deployerAddress);
  console.log("=====================================");

  // Step 5: Save deployment info
  const deploymentInfo = {
    network: hre.network.name,
    votingToken: votingToken.address,
    governor: governor.address,
    deployer: deployerAddress,
    timestamp: new Date().toISOString(),
  };

  const fs = require("fs");
  const path = require("path");
  const deploymentsDir = path.join(__dirname, "../deployments");
  
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }

  const deploymentFile = path.join(
    deploymentsDir,
    `${hre.network.name}.json`
  );
  
  fs.writeFileSync(
    deploymentFile,
    JSON.stringify(deploymentInfo, null, 2)
  );
  
  console.log(`💾 Deployment info saved to: ${deploymentFile}`);

  console.log("\n✨ Deployment completed successfully!");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
