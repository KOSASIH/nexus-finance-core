// src/api/routes/transactionRoutes.js
const express = require("express");
const router = express.Router();
const { createLoan, repayLoan, stakeTokens, unstakeTokens } = require("../../controllers/transactionController");

// Loan Routes
router.post("/loan/create", async (req, res) => {
    const { userAddress, amount, interestRate, duration } = req.body;
    try {
        const result = await createLoan(userAddress, amount, interestRate, duration);
        res.status(200).json({ message: "Loan created successfully", result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/loan/repay", async (req, res) => {
    const { userAddress } = req.body;
    try {
        const result = await repayLoan(userAddress);
        res.status(200).json({ message: "Loan repaid successfully", result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Staking Routes
router.post("/stake", async (req, res) => {
    const { userAddress, amount } = req.body;
    try {
        const result = await stakeTokens(userAddress, amount);
        res.status(200).json({ message: "Tokens staked successfully", result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/unstake", async (req, res) => {
    const { userAddress, amount } = req.body;
    try {
        const result = await unstakeTokens(userAddress, amount);
        res.status(200).json({ message: "Tokens unstaked successfully", result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
