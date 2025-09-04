# Sepolia Deployment Setup Guide

## 🔧 Required Setup

To deploy to Sepolia testnet, you need to set up the following:

### 1. Create Environment File

Create a `.env` file in your project root:

```bash
cp .env.template .env
```

### 2. Fill in Your Credentials

Edit the `.env` file with your actual values:

```env
# Network RPC URLs
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID
MAINNET_RPC_URL=https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID

# Private Keys (NEVER commit these to version control)
SEPOLIA_PRIVATE_KEY=your_sepolia_private_key_here
MAINNET_PRIVATE_KEY=your_mainnet_private_key_here

# Etherscan API Key for contract verification
ETHERSCAN_API_KEY=your_etherscan_api_key_here

# Gas reporting
REPORT_GAS=true
```

### 3. Get Required Credentials

#### A. Sepolia RPC URL
- **Option 1**: Get a free RPC from [Infura](https://infura.io/)
  - Sign up for free
  - Create a new project
  - Copy the Sepolia endpoint URL
- **Option 2**: Use public RPC: `https://rpc.sepolia.org`
- **Option 3**: Get from [Alchemy](https://www.alchemy.com/)

#### B. Private Key
- Export your wallet's private key
- **IMPORTANT**: Make sure this wallet has Sepolia ETH
- Get Sepolia ETH from [Sepolia Faucet](https://sepoliafaucet.com/)

#### C. Etherscan API Key
- Go to [Etherscan API](https://etherscan.io/apis)
- Sign up for free
- Create a new API key
- Copy the API key

### 4. Verify Your Setup

After setting up your `.env` file, test the connection:

```bash
# Test Sepolia connection
npx hardhat run scripts/check-deployment.ts --network sepolia
```

### 5. Deploy to Sepolia

Once everything is set up:

```bash
# Deploy contracts
npx hardhat ignition deploy ignition/modules/GovernorDeployment.ts --network sepolia

# Verify contracts on Etherscan
npx hardhat verify --network sepolia <CONTRACT_ADDRESS> <CONSTRUCTOR_ARGS>
```

## ⚠️ Important Security Notes

1. **Never commit your `.env` file** - it's already in `.gitignore`
2. **Use a test wallet** - don't use your main wallet's private key
3. **Keep private keys secure** - never share them publicly
4. **Test thoroughly** - Sepolia is a testnet, but still be careful

## 🆘 Troubleshooting

### Common Issues:

1. **"Insufficient funds"**: Make sure your wallet has Sepolia ETH
2. **"Invalid RPC URL"**: Check your RPC URL is correct
3. **"Invalid private key"**: Make sure your private key starts with `0x`
4. **"Network not found"**: Check your `hardhat.config.ts` network configuration

### Getting Help:

- Check the [Hardhat documentation](https://hardhat.org/docs)
- Visit [Sepolia Faucet](https://sepoliafaucet.com/) for test ETH
- Use [Etherscan Sepolia](https://sepolia.etherscan.io/) to check transactions
