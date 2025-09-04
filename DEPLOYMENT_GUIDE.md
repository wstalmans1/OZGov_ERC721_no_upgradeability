# Governor & VotingTokenERC721 Deployment Guide

## 🎉 Local Deployment Successful!

Your Governor and VotingTokenERC721 contracts have been successfully deployed to the local Hardhat network.

### 📋 Deployment Summary

| Contract | Address | Description |
|----------|---------|-------------|
| **VotingTokenERC721** | `0x5FbDB2315678afecb367f032d93F642f64180aa3` | ERC721 voting token with OpenZeppelin governance extensions |
| **Governor_only** | `0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512` | Governor contract for proposal management |

### 🔧 Contract Configuration

#### VotingTokenERC721
- **Name**: VotingTokenERC721
- **Symbol**: VTE
- **Owner**: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266` (deployer)
- **Initial Token**: Token ID 1 minted to deployer

#### Governor_only
- **Name**: Governor_only
- **Voting Delay**: 0 blocks (immediate voting)
- **Voting Period**: 300 blocks (~1 hour)
- **Quorum**: 4% of total voting power
- **Voting Token**: VotingTokenERC721

## 🚀 Deployment Commands

### Local Development
```bash
# Start local Hardhat node
pnpm run node

# Deploy contracts (in another terminal)
npx hardhat ignition deploy ignition/modules/GovernorDeployment.ts --network localhost

# Verify deployment
npx hardhat run scripts/check-deployment.ts --network localhost
```

### Testnet Deployment (Sepolia)
```bash
# Set up environment variables first
cp .env.example .env
# Edit .env with your RPC URLs and private keys

# Deploy to Sepolia
npx hardhat ignition deploy ignition/modules/GovernorDeployment.ts --network sepolia

# Verify contracts on Etherscan
npx hardhat verify --network sepolia <CONTRACT_ADDRESS> <CONSTRUCTOR_ARGS>
```

### Mainnet Deployment
```bash
# Deploy to Mainnet (be careful!)
npx hardhat ignition deploy ignition/modules/GovernorDeployment.ts --network mainnet

# Verify contracts on Etherscan
npx hardhat verify --network mainnet <CONTRACT_ADDRESS> <CONSTRUCTOR_ARGS>
```

## 🔍 Contract Interaction

### Using Hardhat Console
```bash
npx hardhat console --network localhost
```

### Example Interactions
```javascript
// Get contract instances
const votingToken = await ethers.getContractAt("VotingTokenERC721", "0x5FbDB2315678afecb367f032d93F642f64180aa3");
const governor = await ethers.getContractAt("Governor_only", "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512");

// Check token balance
const balance = await votingToken.balanceOf("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");

// Mint more tokens
await votingToken.safeMint("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", 2);

// Check governor parameters
const votingDelay = await governor.votingDelay();
const votingPeriod = await governor.votingPeriod();
```

## 📁 Project Structure

```
├── contracts/
│   ├── VotingTokenERC721.sol    # ERC721 voting token
│   └── Governor2.sol            # Governor contract
├── scripts/
│   ├── deploy.ts                # Main deployment script
│   ├── simple-deploy.ts         # Alternative deployment script
│   ├── interact.ts              # Contract interaction script
│   └── check-deployment.ts      # Deployment verification
├── ignition/
│   └── modules/
│       └── GovernorDeployment.ts # Hardhat Ignition deployment module
├── deployments/
│   └── localhost.json           # Deployment addresses
└── hardhat.config.ts            # Hardhat configuration
```

## 🛠️ Next Steps

1. **Test the contracts**: Create proposals and test the voting mechanism
2. **Deploy to testnet**: Test on Sepolia before mainnet
3. **Set up frontend**: Connect a web interface to interact with the contracts
4. **Configure governance**: Set up proper quorum and voting parameters for production

## ⚠️ Important Notes

- The contracts are deployed with a 4% quorum requirement
- Voting period is set to 300 blocks (~1 hour) for testing
- Make sure to test thoroughly before deploying to mainnet
- Keep your private keys secure and never commit them to version control

## 🔗 Useful Links

- [OpenZeppelin Governor Documentation](https://docs.openzeppelin.com/contracts/4.x/governance)
- [Hardhat Ignition Documentation](https://hardhat.org/ignition/docs)
- [Viem Documentation](https://viem.sh/)
