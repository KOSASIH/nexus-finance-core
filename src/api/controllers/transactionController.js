// src/api/controllers/transactionController.js
const LendingPoolContract = require("../../contracts/LendingPoolContract"); // Import the LendingPool smart contract
const StakingContract = require("../../contracts/StakingContract"); // Import the Staking smart contract

async function createLoan(userAddress, amount, interestRate, duration) {
    // Call the smart contract function to create a loan
    const result = await LendingPoolContract.createLoan(userAddress, amount, interestRate, duration);
    return result;
}

async function repayLoan(userAddress) {
    // Call the smart contract function to repay a loan
    const result = await LendingPoolContract.repayLoan(userAddress);
    return result;
}

async function stakeTokens(userAddress, amount) {
    // Call the smart contract function to stake tokens
    const result = await StakingContract.stake(userAddress, amount);
    return result;
}

async function unstakeTokens(userAddress, amount) {
    // Call the smart contract function to unstake tokens
    const result = await StakingContract.withdraw(userAddress, amount);
    return result;
}

module.exports = {
    createLoan,
    repayLoan,
    stakeTokens,
    unstakeTokens,
};
