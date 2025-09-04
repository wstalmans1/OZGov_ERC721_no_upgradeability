import "dotenv/config";
import hre from "hardhat";

async function main() {
  console.log("🔍 Checking Sepolia deployment readiness...");

  // Check if environment variables are set
  const sepoliaRpcUrl = process.env.SEPOLIA_RPC_URL;
  const sepoliaPrivateKey = process.env.SEPOLIA_PRIVATE_KEY;
  const etherscanApiKey = process.env.ETHERSCAN_API_KEY;

  console.log("\n📋 Environment Variables Status:");
  console.log("=====================================");
  console.log("SEPOLIA_RPC_URL:", sepoliaRpcUrl ? "✅ Set" : "❌ Not set");
  console.log("SEPOLIA_PRIVATE_KEY:", sepoliaPrivateKey ? "✅ Set" : "❌ Not set");
  console.log("ETHERSCAN_API_KEY:", etherscanApiKey ? "✅ Set" : "❌ Not set");

  if (!sepoliaRpcUrl || !sepoliaPrivateKey) {
    console.log("\n❌ Missing required environment variables!");
    console.log("\n📝 Please create a .env file with:");
    console.log("SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_PROJECT_ID");
    console.log("SEPOLIA_PRIVATE_KEY=your_private_key_here");
    console.log("ETHERSCAN_API_KEY=your_etherscan_api_key_here");
    console.log("\n📖 See SEPOLIA_SETUP.md for detailed instructions");
    return;
  }

  // Test network connection
  try {
    console.log("\n🌐 Testing Sepolia network connection...");
    
    // Create a simple client to test connection
    const { createPublicClient, http } = await import("viem");
    const { sepolia } = await import("viem/chains");
    
    const publicClient = createPublicClient({
      chain: sepolia,
      transport: http(sepoliaRpcUrl),
    });

    const blockNumber = await publicClient.getBlockNumber();
    console.log("✅ Connected to Sepolia! Current block:", blockNumber.toString());

    // Check if we can get the deployer address
    const { privateKeyToAccount } = await import("viem/accounts");
    const account = privateKeyToAccount(sepoliaPrivateKey as `0x${string}`);
    console.log("👤 Deployer address:", account.address);

    // Check balance
    const balance = await publicClient.getBalance({
      address: account.address,
    });
    
    const { formatEther } = await import("viem");
    console.log("💰 Balance:", formatEther(balance), "ETH");

    if (balance === 0n) {
      console.log("\n⚠️  Warning: Your wallet has 0 ETH!");
      console.log("Get Sepolia ETH from: https://sepoliafaucet.com/");
    } else {
      console.log("\n✅ Ready to deploy to Sepolia!");
      console.log("\n🚀 Run this command to deploy:");
      console.log("npx hardhat ignition deploy ignition/modules/GovernorDeployment.ts --network sepolia");
    }

  } catch (error) {
    console.log("\n❌ Failed to connect to Sepolia network:");
    console.log("Error:", error);
    console.log("\n🔧 Troubleshooting:");
    console.log("1. Check your SEPOLIA_RPC_URL is correct");
    console.log("2. Make sure your private key is valid");
    console.log("3. Check your internet connection");
  }
}

main().catch((error) => {
  console.error("❌ Setup check failed:", error);
  process.exitCode = 1;
});
