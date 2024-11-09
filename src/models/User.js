// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    kycVerified: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Index for faster queries
userSchema.index({ address: 1, email: 1 });

// Method to update KYC status
userSchema.methods.updateKYCStatus = async function (status) {
    this.kycVerified = status;
    await this.save();
};

const User = mongoose.model("User ", userSchema);
module.exports = User;
