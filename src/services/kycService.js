// services/kycService.js
const KYCContract = require("../contracts/KYCContract"); // Import the KYC smart contract

class KYCService {
    async addUser (userAddress) {
        try {
            // Call the smart contract function to add a user for KYC
            const result = await KYCContract.addUser (userAddress);
            return { success: true, message: "User  added for KYC successfully", result };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async removeUser (userAddress) {
        try {
            // Call the smart contract function to remove a user from KYC
            const result = await KYCContract.removeUser (userAddress);
            return { success: true, message: "User  removed from KYC successfully", result };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async isUser KYCed(userAddress) {
        try {
            // // Call the smart contract function to check if the user is KYC verified
            const verified = await KYCContract.isUser  KYCed(userAddress);
            return { success: true, verified };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }
}

module.exports = new KYCService();
