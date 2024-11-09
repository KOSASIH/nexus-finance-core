// KYC.test.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("KYC Contract", function () {
    let KYC, kyc;
    let owner, user1, user2;

    beforeEach(async function () {
        [owner, user1, user2] = await ethers.getSigners();

        // Deploy KYC Contract
        KYC = await ethers.getContractFactory("KYC");
        kyc = await KYC.deploy();
        await kyc.deployed();
    });

    it("should allow the owner to add a user to KYC", async function () {
        await kyc.connect(owner).addUser (user1.address);
        const isUser KYCed = await kyc.isUser KYCed(user1.address);
        expect(isUser KYCed).to.be.true;
    });

    it("should not allow non-owner to add a user to KYC", async function () {
        await expect(kyc.connect(user1).addUser (user2.address)).to.be.revertedWith("Only owner can add users");
    });

    it("should allow checking KYC status of a user", async function () {
        await kyc.connect(owner).addUser (user1.address);
        const isUser KYCed = await kyc.isUser KYCed(user1.address);
        expect(isUser KYCed).to.be.true;
    });

    it("should allow the owner to remove a user from KYC", async function () {
        await kyc.connect(owner).addUser (user1.address);
        await kyc.connect(owner).removeUser (user1.address);
        const isUser KYCed = await kyc.isUser KYCed(user1.address);
        expect(isUser KYCed).to.be.false;
    });
});
