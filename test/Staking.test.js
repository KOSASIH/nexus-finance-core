// Staking.test.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Staking Contract", function () {
    let Token, token, Staking, staking;
    let owner, user1, user2;

    beforeEach(async function () {
        [owner, user1, user2] = await ethers.getSigners();

        // Deploy ERC20 Token
        Token = await ethers.getContractFactory("ERC20Token");
        token = await Token.deploy(ethers.utils.parseUnits("1000000", 18));
        await token.deployed();

        // Deploy Staking Contract
        Staking = await ethers.getContractFactory("Staking");
        staking = await Staking.deploy(token.address);
        await staking.deployed();
    });

    it("should allow users to stake tokens", async function () {
        await token.mint(user1.address, ethers.utils.parseUnits("1000", 18));
        await token.connect(user1).approve(staking.address, ethers.utils.parseUnits("200", 18));
        
        await staking.connect(user1).stake(ethers.utils.parseUnits("200", 18));
        const stakedAmount = await staking.getStakedAmount(user1.address);
        expect(stakedAmount).to.equal(ethers.utils.parseUnits("200", 18));
    });

    it("should allow users to withdraw staked tokens", async function () {
        await token.mint(user1.address, ethers.utils.parseUnits("1000", 18));
        await token.connect(user1).approve(staking.address, ethers.utils.parseUnits("200", 18));
        
        await staking.connect(user1).stake(ethers.utils.parseUnits("200", 18));
        await staking.connect(user1).withdraw(ethers.utils.parseUnits("200", 18));
        
        const stakedAmount = await staking.getStakedAmount(user1.address);
        expect(stakedAmount).to.equal(0);
    });

    it("should not allow users to withdraw more than staked amount", async function () {
        await token.mint(user1.address, ethers.utils.parseUnits("1000", 18));
        await token.connect(user1).approve(staking.address, ethers.utils.parseUnits("200", 18));
        
        await staking.connect(user1).stake(ethers.utils.parseUnits("200", 18));
        
        await expect(staking.connect(user1).withdraw(ethers.utils.parseUnits("300", 18))).to.be.revertedWith("Insufficient staked amount");
    });
});
