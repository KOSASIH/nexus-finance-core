// services/userService.js
const KYCContract = require("../contracts/KYCContract"); // Import the KYC smart contract

class UserService {
    async verifyUser (userAddress) {
        try {
            // Call the smart contract function to verify the user
            const result = await KYCContract.addUser (userAddress);
            return { success: true, message: "User  verified successfully", result };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async unverifyUser (userAddress) {
        try {
            // Call the smart contract function to unverify the user
            const result = await KYCContract.removeUser (userAddress);
            return { success: true, message: "User  unverified successfully", result };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async isUser Verified(userAddress) {
        try {
            // Call the smart contract function to check if the user is verified
            const verified = await KYCContract.isUser KYCed(userAddress);
            return { success: true, verified };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }
}

module.exports = new UserService();
