import { ethers } from "hardhat";

async function main() {
  console.log("🚀 Starting deployment of Governor and VotingTokenERC721 contracts...");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("📝 Deploying contracts with account:", deployer.address);

  // Check deployer balance
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("💰 Account balance:", ethers.formatEther(balance), "ETH");

  // Step 1: Deploy VotingTokenERC721
  console.log("\n📄 Step 1: Deploying VotingTokenERC721...");
  const VotingTokenERC721 = await ethers.getContractFactory("VotingTokenERC721");
  const votingToken = await VotingTokenERC721.deploy(deployer.address);
  await votingToken.waitForDeployment();
  
  const votingTokenAddress = await votingToken.getAddress();
  console.log("✅ VotingTokenERC721 deployed to:", votingTokenAddress);

  // Step 2: Deploy Governor contract
  console.log("\n🏛️ Step 2: Deploying Governor contract...");
  const Governor = await ethers.getContractFactory("Governor_only");
  const governor = await Governor.deploy(votingTokenAddress);
  await governor.waitForDeployment();

  const governorAddress = await governor.getAddress();
  console.log("✅ Governor contract deployed to:", governorAddress);

  // Step 3: Mint some initial tokens for testing
  console.log("\n🎫 Step 3: Minting initial voting tokens...");
  const mintTx = await votingToken.safeMint(deployer.address, 1);
  await mintTx.wait();
  console.log("✅ Minted token ID 1 to deployer");
  console.log("🔗 Mint transaction hash:", mintTx.hash);

  // Step 4: Display deployment summary
  console.log("\n🎉 Deployment Summary:");
  console.log("=====================================");
  console.log("📄 VotingTokenERC721:", votingTokenAddress);
  console.log("🏛️ Governor Contract:", governorAddress);
  console.log("👤 Deployer:", deployer.address);
  console.log("🎫 Initial Token ID 1 minted to:", deployer.address);
  console.log("=====================================");

  // Step 5: Save deployment info
  const deploymentInfo = {
    network: hre.network.name,
    votingToken: votingTokenAddress,
    governor: governorAddress,
    deployer: deployer.address,
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
