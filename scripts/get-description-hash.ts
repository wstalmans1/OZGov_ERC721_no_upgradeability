import { keccak256, toBytes } from "viem";

async function main() {
  const description = "mint token nr 3 to 0xeb5925d4Cb344Ab27b82679CeDf3FDa8a45E2e1F";
  
  // Calculate the description hash
  const descriptionHash = keccak256(toBytes(description));
  
  console.log("📝 Proposal Description:");
  console.log(`"${description}"`);
  console.log("\n🔗 Description Hash:");
  console.log(descriptionHash);
  console.log("\n📋 For use in Governor contract:");
  console.log(`descriptionHash: ${descriptionHash}`);
}

main().catch((error) => {
  console.error("❌ Error:", error);
  process.exitCode = 1;
});
