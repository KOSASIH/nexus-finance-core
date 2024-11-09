// src/api/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { verifyUser , unverifyUser , isUser Verified } = require("../../controllers/userController");

// KYC Verification Routes
router.post("/verify", async (req, res) => {
    const { userAddress } = req.body;
    try {
        const result = await verifyUser (userAddress);
        res.status(200).json({ message: "User  verified successfully", result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/unverify", async (req, res) => {
    const { userAddress } = req.body;
    try {
        const result = await unverifyUser (userAddress);
        res.status(200).json({ message: "User  unverified successfully", result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/status/:userAddress", async (req, res) => {
    const { userAddress } = req.params;
    try {
        const verified = await isUser Verified(userAddress);
        res.status(200).json({ userAddress, verified });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
