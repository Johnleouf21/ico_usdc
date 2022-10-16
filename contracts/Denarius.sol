//SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";




contract Denarius is ERC20, Ownable {

        mapping(address => bool) admins;

        uint constant _initial_supply = 250000000 * (10**18);

    constructor() ERC20("Denarius", "DENAR") {
        _mint(msg.sender, 162500000 *10 ** 18);
    }
    
    function mint(address _to, uint _amount) external {
        require(admins[msg.sender], "Cannot mint if not admin");
        _mint(_to, _amount);
    }

    function addAdmin(address _admin) external onlyOwner {
        admins[_admin] = true;
    }

    function removeAdmin(address _admin) external onlyOwner {
        admins[_admin] = false;
    }
}