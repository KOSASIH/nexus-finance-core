// src/config/blockchainConfig.js
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env file

const blockchainConfig = {
    network: {
        name: process.env.BLOCKCHAIN_NETWORK_NAME || "Ethereum",
        rpcUrl: process.env.RPC_URL || "https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID",
        chainId: parseInt(process.env.CHAIN_ID) || 1, // Mainnet by default
    },
    contracts: {
        lendingPoolAddress: process.env.LENDING_POOL_ADDRESS || "0xYourLendingPoolAddress",
        kycContractAddress: process.env.KYC_CONTRACT_ADDRESS || "0xYourKYCContractAddress",
    },
};

module.exports = blockchainConfig;
