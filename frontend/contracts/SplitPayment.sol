// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;


contract SplitPayment {
  address public owner;

  event PaymentSent(address indexed to, uint256 amount);
  
  constructor(address _owner) {
      owner = _owner; 
  }

  function send(address payable[] calldata to, uint[] calldata amount) 
    external
    payable
    ownerOnly {
    require(to.length == amount.length, 'Arrays must be of the same length');
    for(uint i = 0; i < to.length; i++) {
      to[i].transfer(amount[i]);
      emit PaymentSent(to[i], amount[i]);
    }
  }
  
  modifier ownerOnly() {
    require(msg.sender == owner, "Only the owner can call this function");
    _;
  }
}
