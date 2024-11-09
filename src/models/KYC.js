// models/KYC.js
const mongoose = require("mongoose");

const kycSchema = new mongoose.Schema({
    userAddress: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    verificationDate: {
        type: Date,
    },
    documents: [{
        type: String, // URLs or paths to KYC documents
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Index for faster queries
kycSchema.index({ userAddress: 1 });

// Method to verify KYC
kycSchema.methods.verify = async function () {
    this.verified = true;
    this.verificationDate = new Date();
    await this.save();
};

// Method to unverify KYC
kycSchema.methods.unverify = async function () {
    this.verified = false;
    this.verificationDate = null;
    await this.save();
};

const KYC = mongoose.model("KYC", kycSchema);
module.exports = KYC;
