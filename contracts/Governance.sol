// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Governance is Ownable {
    struct Proposal {
        string description;
        uint256 voteCount;
        mapping(address => bool) voters;
        bool executed;
    }

    Proposal[] public proposals;

    event ProposalCreated(uint256 indexed proposalId, string description);
    event Voted(uint256 indexed proposalId, address indexed voter);

    function createProposal(string memory description) external onlyOwner {
        proposals.push();
        Proposal storage newProposal = proposals[proposals.length - 1];
        newProposal.description = description;
        emit ProposalCreated(proposals.length - 1, description);
    }

    function vote(uint256 proposalId) external {
        Proposal storage proposal = proposals[proposalId];
        require(!proposal.voters[msg.sender], "Already voted");
        require(!proposal.executed, "Proposal already executed");

        proposal.voters[msg.sender] = true;
        proposal.voteCount++;
        emit Voted(proposalId, msg.sender);
    }

    function executeProposal(uint256 proposalId) external onlyOwner {
        Proposal storage proposal = proposals[proposalId];
        require(!proposal.executed, "Proposal already executed");

        // Logic to execute the proposal
        proposal.executed = true;
    }
}
