// src/api/controllers/userController.js
const KYCContract = require("../../contracts/KYCContract"); // Import the KYC smart contract

async function verifyUser (userAddress) {
    // Call the smart contract function to verify the user
    const result = await KYCContract.addUser (userAddress);
    return result;
}

async function unverifyUser (userAddress) {
    // Call the smart contract function to unverify the user
    const result = await KYCContract.removeUser (userAddress);
    return result;
}

async function isUser Verified(userAddress) {
    // Call the smart contract function to check if the user is verified
    const verified = await KYCContract.isUser KYCed(userAddress);
    return verified;
}

module.exports = {
    verifyUser ,
    unverifyUser ,
    isUser Verified,
};
