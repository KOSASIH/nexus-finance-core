// models/Transaction.js
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    userAddress: {
        type: String,
        required: true,
        index: true,
    },
    type: {
        type: String,
        enum: ["loan", "repayment", "stake", "unstake"],
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Index for faster queries
transactionSchema.index({ userAddress: 1, createdAt: -1 });

// Method to mark transaction as completed
transactionSchema.methods.completeTransaction = async function () {
    this.status = "completed";
    await this.save();
};

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
