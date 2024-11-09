// Governance.test.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Governance Contract", function () {
    let Governance, governance;
    let owner, user1, user2;

    beforeEach(async function () {
        [owner, user1, user2] = await ethers.getSigners();

        // Deploy Governance Contract
        Governance = await ethers.getContractFactory("Governance");
        governance = await Governance.deploy();
        await governance.deployed();
    });

    it("should allow the owner to create a proposal", async function () {
        await governance.connect(owner).createProposal("Increase token supply by 10%");
        const proposal = await governance.proposals(0);
        expect(proposal.description).to.equal("Increase token supply by 10%");
    });

    it("should allow users to vote on a proposal", async function () {
        await governance.connect(owner).createProposal("Increase token supply by 10%");
        
        await governance.connect(user1).vote(0);
        const proposal = await governance.proposals(0);
        expect(proposal.voteCount).to.equal(1);
    });

    it("should not allow the same user to vote twice", async function () {
        await governance.connect(owner).createProposal("Increase token supply by 10%");
        
        await governance.connect(user1).vote(0);
        
 await expect(governance.connect(user1).vote(0)).to.be.revertedWith("You have already voted on this proposal");
    });
});
