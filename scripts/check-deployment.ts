import { createPublicClient, createWalletClient, http, formatEther } from "viem";
import { hardhat } from "viem/chains";

async function main() {
  console.log("🔍 Checking deployed Governor and VotingTokenERC721 contracts...");

  // Contract addresses from localhost deployment
  const VOTING_TOKEN_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const GOVERNOR_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

  // Create clients
  const publicClient = createPublicClient({
    chain: hardhat,
    transport: http("http://127.0.0.1:8545"),
  });

  const walletClient = createWalletClient({
    chain: hardhat,
    transport: http("http://127.0.0.1:8545"),
  });

  // Get the first account (deployer)
  const [account] = await walletClient.getAddresses();
  console.log("👤 Using account:", account);

  // Check balances
  const balance = await publicClient.getBalance({
    address: account,
  });
  console.log("💰 Account balance:", formatEther(balance), "ETH");

  // Get contract code to verify deployment
  const votingTokenCode = await publicClient.getCode({
    address: VOTING_TOKEN_ADDRESS as `0x${string}`,
  });
  
  const governorCode = await publicClient.getCode({
    address: GOVERNOR_ADDRESS as `0x${string}`,
  });

  console.log("\n📄 Contract Deployment Status:");
  console.log("=====================================");
  console.log("VotingTokenERC721:", VOTING_TOKEN_ADDRESS);
  console.log("Code deployed:", votingTokenCode !== "0x" ? "✅ Yes" : "❌ No");
  
  console.log("\n🏛️ Governor Contract:");
  console.log("Address:", GOVERNOR_ADDRESS);
  console.log("Code deployed:", governorCode !== "0x" ? "✅ Yes" : "❌ No");

  console.log("\n✅ Deployment verification completed!");
}

main().catch((error) => {
  console.error("❌ Verification failed:", error);
  process.exitCode = 1;
});
