const SplitPayment = artifacts.require("SplitPayment");

module.exports = function (deployer, network, accounts) {
  // Use the first account as the owner
  const owner = accounts[0];
  // Deploy the contract with the owner address
  deployer.deploy(SplitPayment, owner);
};
