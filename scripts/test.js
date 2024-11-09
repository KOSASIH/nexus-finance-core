// test.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Nexus Finance Contracts", function () {
    let Token, token, LendingPool, lendingPool, Staking, staking, Governance, governance;
    let owner, user1, user2;

    beforeEach(async function () {
        [owner, user1, user2] = await ethers.getSigners();

        // Deploy ERC20 Token
        Token = await ethers.getContractFactory("ERC20Token");
        token = await Token.deploy(ethers.utils.parseUnits("1000000", 18));
        await token.deployed();

        // Deploy Lending Pool
        LendingPool = await ethers.getContractFactory("LendingPool");
        lendingPool = await LendingPool.deploy(token.address);
        await lendingPool.deployed();

        // Deploy Staking Contract
        Staking = await ethers.getContractFactory("Staking");
        staking = await Staking.deploy(token.address);
        await staking.deployed();

        // Deploy Governance Contract
        Governance = await ethers.getContractFactory("Governance");
        governance = await Governance.deploy();
        await governance.deployed();
    });

    it("should mint tokens correctly", async function () {
        await token.mint(user1.address, ethers.utils.parseUnits("1000", 18));
        const balance = await token.balanceOf(user1.address);
        expect(balance).to.equal(ethers.utils.parseUnits("1000", 18));
    });

    it("should create a loan", async function () {
        await token.mint(user1.address, ethers.utils.parseUnits("1000", 18));
        await token.connect(user1).approve(lendingPool.address, ethers.utils.parseUnits("500", 18));
        await lendingPool.connect(user1).createLoan(ethers.utils.parseUnits("500", 18), 5, 30 * 24 * 60 * 60);
        const loan = await lendingPool.loans(user1.address);
        expect(loan.amount).to.equal(ethers.utils.parseUnits("500", 18));
        expect(loan.isActive).to.be.true;
    });

    it("should stake tokens", async function () {
        await token.mint(user1.address, ethers.utils.parseUnits("1000", 18));
        await token.connect(user1).approve(staking.address, ethers.utils.parseUnits("200", 18));
        await staking.connect(user1).stake(ethers.utils.parseUnits("200", 18));
        const stakedAmount = await staking.getStakedAmount(user1.address);
        expect(stakedAmount).to.equal(ethers.utils.parseUnits("200", 18));
    });

    it("should create and vote on a governance proposal", async function () {
        await governance.connect(owner).createProposal("Increase token supply by 10%");
        await governance.connect(user2).vote(0);
        const proposal = await governance.proposals(0);
        expect(proposal.voteCount).to.equal(1);
    });
});
