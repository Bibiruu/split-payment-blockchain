// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SplitPayment {
    //storing address of contract owner
    address public owner;

    constructor(address _owner) {
        owner = _owner;
    }

    function send(address payable[] memory to, uint[] memory amount) public payable {
        require(msg.sender == owner, "only owner can send transfers");
        require(to.length == amount.length, "to and amount arrays must have length");
        for(uint i = 0; i < to.length; i++)  {
            to[i].transfer(amount[i]);
        }
    }
}
