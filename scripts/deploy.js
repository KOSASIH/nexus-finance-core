// deploy.js
const { ethers } = require("hardhat");

async function main() {
    // Deploy ERC20 Token
    const ERC20Token = await ethers.getContractFactory("ERC20Token");
    const token = await ERC20Token.deploy(ethers.utils.parseUnits("1000000", 18)); // 1 million tokens
    await token.deployed();
    console.log("ERC20Token deployed to:", token.address);

    // Deploy KYC Contract
    const KYC = await ethers.getContractFactory("KYC");
    const kyc = await KYC.deploy();
    await kyc.deployed();
    console.log("KYC Contract deployed to:", kyc.address);

    // Deploy Lending Pool
    const LendingPool = await ethers.getContractFactory("LendingPool");
    const lendingPool = await LendingPool.deploy(token.address);
    await lendingPool.deployed();
    console.log("LendingPool deployed to:", lendingPool.address);

    // Deploy Staking Contract
    const Staking = await ethers.getContractFactory("Staking");
    const staking = await Staking.deploy(token.address);
    await staking.deployed();
    console.log("Staking Contract deployed to:", staking.address);

    // Deploy Governance Contract
    const Governance = await ethers.getContractFactory("Governance");
    const governance = await Governance.deploy();
    await governance.deployed();
    console.log("Governance Contract deployed to:", governance.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
