//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract ICO is Ownable {
    using SafeMath for uint256;
    IERC20 internal token;
    address private usdc;
    address payable private team;

    uint256 public rateRound1;
    uint256 public rateRound2;
    uint256 public rateRound3;
    uint256 public openingTimeRound1;
    uint256 public closingTimeRound1;
    uint256 public openingTimeRound2;
    uint256 public closingTimeRound2;
    uint256 public openingTimeRound3;
    uint256 public closingTimeRound3;
    uint256 public hardCapRound1;
    uint256 public hardCapRound2;
    uint256 public hardCapRound3;
    uint256 public raisedAmount;
    uint256 public tokenAmountRound1;
    uint256 public tokenAmountRound2;
    uint256 public tokenAmountRound3;
    uint rate1 = 400*10**12;
    uint rate2 = 285*10**12;
    uint rate3 = 200*10**12;
    
    

    mapping(address => uint256) public balances;
    mapping(address => uint256) public balancesToken1;
    mapping(address => uint256) public balancesToken2;
    mapping(address => uint256) public balancesToken3;

    event TokenPurchase(address indexed purchaser, uint256 amount);
    event TokenClaim(address indexed claimer);

    constructor(
        address _token,
        address _usdc,
        address _team,
        uint256 _openingTimeRound1,
        uint256 _closingTimeRound1,
        uint256 _openingTimeRound2,
        uint256 _closingTimeRound2,
        uint256 _openingTimeRound3,
        uint256 _closingTimeRound3) {
        require(_token != address(0), "Token address is 0");
        require(_closingTimeRound1 > _openingTimeRound1, "ClosingTime need to be superior");
        require(_closingTimeRound2 > _openingTimeRound2, "ClosingTime need to be superior");
        require(_closingTimeRound3 > _openingTimeRound3, "ClosingTime need to be superior");
        rateRound1 = rate1 / 100;
        rateRound2 = rate2 / 100;
        rateRound3 = rate3 / 100;
        token = IERC20(_token);
        usdc = _usdc;
        team = payable(_team);
        openingTimeRound1 = _openingTimeRound1;
        closingTimeRound1 = _closingTimeRound1;
        openingTimeRound2 = _openingTimeRound2;
        closingTimeRound2 = _closingTimeRound2;
        openingTimeRound3 = _openingTimeRound3;
        closingTimeRound3 = _closingTimeRound3;
        hardCapRound1 = 18750000*10**18;
        hardCapRound2 = 11250000*10**18;
        hardCapRound3 = 7500000*10**18;
    }

    modifier round1Open {
        require(block.timestamp >= openingTimeRound1 && block.timestamp <= closingTimeRound1, "ICO not open");
        _;
    }

    modifier round2Open {
        require(block.timestamp >= openingTimeRound2 && block.timestamp <= closingTimeRound2, "ICO not open");
        _;
    }

    modifier round3Open {
        require(block.timestamp >= openingTimeRound3 && block.timestamp <= closingTimeRound3, "ICO not open");
        _;
    }

    modifier round1Finished {
        require(block.timestamp > closingTimeRound1, "ICO not finish");
        _;
    }

    modifier round2Finished {
        require(block.timestamp > closingTimeRound2, "ICO not finish");
        _;
    }

    modifier round3Finished {
        require(block.timestamp > closingTimeRound3, "ICO not finish");
        _;
    }

    function buyTokensRound1() public payable round1Open {
        uint256 value = msg.value;
        require(tokenAmountRound1 < hardCapRound1, "Hard Cap reached");
        require(IERC20(usdc).transferFrom(msg.sender,address(this), msg.value));
        uint256 tokens = msg.value.mul(rateRound1);
        raisedAmount = raisedAmount.add(value);
        tokenAmountRound1 = tokenAmountRound1.add(tokens);
        balances[msg.sender] = balances[msg.sender].add(value);
        balancesToken1[msg.sender] = balancesToken1[msg.sender].add(tokens);
        emit TokenPurchase(msg.sender, tokens);
    }

    function buyTokensRound2() public payable round2Open {
        uint256 value = msg.value;
        require(tokenAmountRound1 < hardCapRound1, "Hard Cap reached");
        require(IERC20(usdc).transferFrom(msg.sender,address(this), msg.value));
        uint256 tokens = value.mul(rateRound2);
        raisedAmount = raisedAmount.add(value);
        tokenAmountRound2 = tokenAmountRound2.add(tokens);
        balances[msg.sender] = balances[msg.sender].add(value);
        balancesToken2[msg.sender] = balancesToken2[msg.sender].add(tokens);
        emit TokenPurchase(msg.sender, tokens);
    }

    function buyTokensRound3() public payable round3Open {
        uint256 value = msg.value;
        require(tokenAmountRound1 < hardCapRound1, "Hard Cap reached");
        require(IERC20(usdc).transferFrom(msg.sender,address(this), msg.value));
        uint256 tokens = value.mul(rateRound3);
        raisedAmount = raisedAmount.add(value);
        tokenAmountRound3 = tokenAmountRound3.add(tokens);
        balances[msg.sender] = balances[msg.sender].add(value);
        balancesToken3[msg.sender] = balancesToken3[msg.sender].add(tokens);
        emit TokenPurchase(msg.sender, tokens);
    }
    
    function withdrawTokensRound1() public round1Finished {
        uint256 amount = balancesToken1[msg.sender];
        require(amount > 0);
        balancesToken1[msg.sender] = 0;
        token.transfer(msg.sender, amount);
    }

    function withdrawTokensRound2() public round2Finished {
        uint256 amount = balancesToken2[msg.sender];
        require(amount > 0);
        balancesToken2[msg.sender] = 0;
        token.transfer(msg.sender, amount);
    }

    function withdrawTokensRound3() public round3Finished {
        uint256 amount = balancesToken3[msg.sender];
        require(amount > 0);
        balancesToken3[msg.sender] = 0;
        token.transfer(msg.sender, amount);
    }

    function getBalance() public view returns(uint256) {
        return balances[msg.sender];
    }

    function getBalanceToken1() public view returns(uint256) {
        return balancesToken1[msg.sender];
    }

    function getBalanceToken2() public view returns(uint256) {
        return balancesToken2[msg.sender];
    }

    function getBalanceToken3() public view returns(uint256) {
        return balancesToken3[msg.sender];
    }

    function changeClosingTimeRound1(uint256 _closingTimeRound1) public onlyOwner {
        closingTimeRound1 = _closingTimeRound1;
    }

    function changeClosingTimeRound2(uint256 _closingTimeRound2) public onlyOwner {
        closingTimeRound2 = _closingTimeRound2;
    }

    function changeClosingTimeRound3(uint256 _closingTimeRound3) public onlyOwner {
        closingTimeRound3 = _closingTimeRound3;
    }

    function withdraw(uint256 amount) external {
        IERC20(usdc).transferFrom(address(this), team, amount);
    }
}