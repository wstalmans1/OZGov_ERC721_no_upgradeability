import hre from "hardhat";

async function main() {
  console.log("🔍 Interacting with deployed Governor and VotingTokenERC721 contracts...");

  // Contract addresses from localhost deployment
  const VOTING_TOKEN_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const GOVERNOR_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

  // Get the deployer account
  const [deployer] = await hre.viem.getWalletClients();
  const deployerAddress = deployer.account.address;
  console.log("👤 Using account:", deployerAddress);

  // Get contract instances
  const votingToken = await hre.viem.getContractAt("VotingTokenERC721", VOTING_TOKEN_ADDRESS);
  const governor = await hre.viem.getContractAt("Governor_only", GOVERNOR_ADDRESS);

  console.log("\n📄 VotingTokenERC721 Contract Info:");
  console.log("=====================================");
  console.log("Address:", VOTING_TOKEN_ADDRESS);
  
  // Get token name and symbol
  const name = await votingToken.read.name();
  const symbol = await votingToken.read.symbol();
  console.log("Name:", name);
  console.log("Symbol:", symbol);

  // Check token balance
  const balance = await votingToken.read.balanceOf([deployerAddress]);
  console.log("Deployer balance:", balance.toString());

  // Get token owner
  const owner = await votingToken.read.ownerOf([1n]);
  console.log("Token ID 1 owner:", owner);

  console.log("\n🏛️ Governor Contract Info:");
  console.log("=====================================");
  console.log("Address:", GOVERNOR_ADDRESS);
  
  // Get governor name
  const governorName = await governor.read.name();
  console.log("Name:", governorName);

  // Get voting parameters
  const votingDelay = await governor.read.votingDelay();
  const votingPeriod = await governor.read.votingPeriod();
  const quorumNumerator = await governor.read.quorumNumerator();
  
  console.log("Voting Delay:", votingDelay.toString(), "blocks");
  console.log("Voting Period:", votingPeriod.toString(), "blocks");
  console.log("Quorum Numerator:", quorumNumerator.toString(), "%");

  // Get token address from governor
  const tokenAddress = await governor.read.token();
  console.log("Voting Token Address:", tokenAddress);

  console.log("\n✅ Contract interaction completed successfully!");
}

main().catch((error) => {
  console.error("❌ Interaction failed:", error);
  process.exitCode = 1;
});
