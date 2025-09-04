import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const GovernorDeploymentModule = buildModule("GovernorDeployment", (m) => {
  // Get the deployer address
  const deployer = m.getAccount(0);

  // Deploy VotingTokenERC721 first
  const votingToken = m.contract("VotingTokenERC721", [deployer]);

  // Deploy Governor contract with the voting token address
  const governor = m.contract("Governor_only", [votingToken]);

  // Mint initial token for testing
  m.call(votingToken, "safeMint", [deployer, 1]);

  return { votingToken, governor };
});

export default GovernorDeploymentModule;
