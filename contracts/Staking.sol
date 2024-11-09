// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Staking is Ownable {
    IERC20 public token;
    mapping(address => uint256) public stakedAmount;
    mapping(address => uint256) public stakingTime;

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);

    constructor(IERC20 _token) {
        token = _token;
    }

    function stake(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        token.transferFrom(msg.sender, address(this), amount);
        stakedAmount[msg.sender] += amount;
        stakingTime[msg.sender] = block.timestamp;
        emit Staked(msg.sender, amount);
    }

    function unstake(uint256 amount) external {
       require(stakedAmount[msg.sender] >= amount, "Insufficient staked amount");
        require(block.timestamp >= stakingTime[msg.sender] + 1 weeks, "Staking period not yet completed");

        stakedAmount[msg.sender] -= amount;
        token.transfer(msg.sender, amount);
        emit Unstaked(msg.sender, amount);
    }

    function getStakedAmount(address user) external view returns (uint256) {
        return stakedAmount[user];
    }
}
