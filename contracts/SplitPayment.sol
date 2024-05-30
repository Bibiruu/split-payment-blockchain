// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SplitPayment {
    //storing address of contract owner
    address public owner;

    constructor(address _owner) {
        //executed once when the contract is deployed
        owner = _owner;
    }
    //to, an array of payable(send and receive ETH) addresses (recipients)
    function send(
        address payable[] memory to,
        uint[] memory amount
    ) public payable onlyOwner {
        require(
            to.length == amount.length,
            "to and amount arrays must have length"
        );
        for (uint i = 0; i < to.length; i++) {
            to[i].transfer(amount[i]);
        }
    }
    modifier onlyOwner() {
        require(msg.sender == owner, "only owner can send transfers");
        _;
    }
}
