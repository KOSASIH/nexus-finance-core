// services/transactionService.js
const LendingPoolContract = require("../contracts/LendingPoolContract"); // Import the LendingPool smart contract
const StakingContract = require("../contracts/StakingContract"); // Import the Staking smart contract

class TransactionService {
    async createLoan(userAddress, amount, interestRate, duration) {
        try {
            // Call the smart contract function to create a loan
            const result = await LendingPoolContract.createLoan(userAddress, amount, interestRate, duration);
            return { success: true, message: "Loan created successfully", result };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async repayLoan(userAddress) {
        try {
            // Call the smart contract function to repay a loan
            const result = await LendingPoolContract.repayLoan(userAddress);
            return { success: true, message: "Loan repaid successfully", result };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async stakeTokens(userAddress, amount) {
        try {
            // Call the smart contract function to stake tokens
            const result = await StakingContract.stake(userAddress, amount);
            return { success: true, message: "Tokens staked successfully", result };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async unstakeTokens(userAddress, amount) {
        try {
            // Call the smart contract function to unstake tokens
            const result = await StakingContract.withdraw(userAddress, amount);
            return { success: true, message: "Tokens unstaked successfully", result };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }
}

module.exports = new TransactionService();
