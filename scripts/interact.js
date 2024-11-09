// interact.js
const { ethers } = require("hardhat");

async function main() {
    const [owner, user1, user2] = await ethers.getSigners();

    // Replace with actual deployed contract addresses
    const tokenAddress = "0xYourTokenAddress";
    const lendingPoolAddress = "0xYourLendingPoolAddress";
    const stakingAddress = "0xYourStakingAddress";
    const governanceAddress = "0xYourGovernanceAddress";

    const Token = await ethers.getContractAt("ERC20Token", tokenAddress);
    const LendingPool = await ethers.getContractAt("LendingPool", lendingPoolAddress);
    const Staking = await ethers.getContractAt("Staking", stakingAddress);
    const Governance = await ethers.getContractAt("Governance", governanceAddress);

    // Mint tokens to user1
    await Token.mint(user1.address, ethers.utils.parseUnits("1000", 18));
    console.log("Minted 1000 tokens to user1");

    // User1 creates a loan
    await Token.connect(user1).approve(lendingPoolAddress, ethers.utils.parseUnits("500", 18));
    await LendingPool.connect(user1).createLoan(ethers.utils.parseUnits("500", 18), 5, 30 days);
    console.log("User 1 created a loan of 500 tokens");

    // User1 stakes tokens
    await Token.connect(user1).approve(stakingAddress, ethers.utils.parseUnits("200", 18));
    await Staking.connect(user1).stake(ethers.utils.parseUnits("200", 18));
    console.log("User 1 staked 200 tokens");

    // Owner creates a governance proposal
    await Governance.connect(owner).createProposal("Increase token supply by 10%");
    console.log("Owner created a governance proposal");

    // User2 votes on the proposal
    await Governance.connect(user2).vote(0);
    console.log("User 2 voted on the proposal");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
