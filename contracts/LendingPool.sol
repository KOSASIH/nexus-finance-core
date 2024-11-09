// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LendingPool is Ownable {
    struct Loan {
        uint256 amount;
        uint256 interestRate;
        uint256 duration;
        uint256 startTime;
        address borrower;
        bool isActive;
    }

    mapping(address => Loan) public loans;
    IERC20 public token;

    event LoanCreated(address indexed borrower, uint256 amount, uint256 interestRate, uint256 duration);
    event LoanRepaid(address indexed borrower, uint256 amount);

    constructor(IERC20 _token) {
        token = _token;
    }

    function createLoan(uint256 amount, uint256 interestRate, uint256 duration) external {
        require(loans[msg.sender].isActive == false, "Existing loan must be repaid first");
        require(token.transferFrom(msg.sender, address(this), amount), "Transfer failed");

        loans[msg.sender] = Loan(amount, interestRate, duration, block.timestamp, msg.sender, true);
        emit LoanCreated(msg.sender, amount, interestRate, duration);
    }

    function repayLoan() external {
        Loan storage loan = loans[msg.sender];
        require(loan.isActive, "No active loan");

        uint256 totalRepayment = loan.amount + (loan.amount * loan.interestRate / 100);
        require(token.transferFrom(msg.sender, address(this), totalRepayment), "Transfer failed");

        loan.isActive = false;
        emit LoanRepaid(msg.sender, totalRepayment);
    }
}
