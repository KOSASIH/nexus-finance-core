// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract KYC is Ownable {
    mapping(address => bool) public verifiedUsers;

    event UserVerified(address indexed user);
    event UserUnverified(address indexed user);

    function verifyUser(address user) external onlyOwner {
        require(!verifiedUsers[user], "User already verified");
        verifiedUsers[user] = true;
        emit UserVerified(user);
    }

    function unverifyUser(address user) external onlyOwner {
        require(verifiedUsers[user], "User not verified");
        verifiedUsers[user] = false;
        emit UserUnverified(user);
    }

    function isUserVerified(address user) external view returns (bool) {
        return verifiedUsers[user];
    }
}
