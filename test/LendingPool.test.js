// LendingPool.test.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LendingPool Contract", function () {
    let Token, token, LendingPool, lendingPool;
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
    });

    it("should allow users to create a loan", async function () {
        await token.mint(user1.address, ethers.utils.parseUnits("1000", 18));
        await token.connect(user1).approve(lendingPool.address, ethers.utils.parseUnits("500", 18));
        
        await lendingPool.connect(user1).createLoan(ethers.utils.parseUnits("500", 18), 5, 30 * 24 * 60 * 60);
        
        const loan = await lendingPool.loans(user1.address);
        expect(loan.amount).to.equal(ethers.utils.parseUnits("500", 18));
        expect(loan.isActive).to.be.true;
    });

    it("should not allow creating a loan if there is an existing loan", async function () {
        await token.mint(user1.address, ethers.utils.parseUnits("1000", 18));
        await token.connect(user1).approve(lendingPool.address, ethers.utils.parseUnits("500", 18));
        
        await lendingPool.connect(user1).createLoan(ethers.utils.parseUnits("500", 18), 5, 30 * 24 * 60 * 60);
        
        await expect(
            lendingPool.connect(user1).createLoan(ethers.utils.parseUnits("300", 18), 5, 30 * 24 * 60 * 60)
        ).to.be.revertedWith("Existing loan must be repaid first");
    });

    it("should allow users to repay a loan", async function () {
        await token.mint(user1.address, ethers.utils.parseUnits("1000", 18));
        await token.connect(user1).approve(lendingPool.address, ethers.utils.parseUnits("500", 18));
        
        await lendingPool.connect(user1).createLoan(ethers.utils.parseUnits("500", 18), 5, 30 * 24 * 60 * 60);
        
        const totalRepayment = ethers.utils.parseUnits("525", 18); // 500 + 5% interest
        await token.connect(user1).approve(lendingPool.address, totalRepayment);
        
        await lendingPool.connect(user1).repayLoan();
        
        const loan = await lendingPool.loans(user1.address);
        expect(loan.isActive).to.be.false;
    });
});
