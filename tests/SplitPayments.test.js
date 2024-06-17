const SplitPayment = artifacts.require('SplitPayment');

contract('SplitPayments', (accounts) => {
    let splitPayments = null;

    before( async () => {
        splitPayments = await SplitPayment.deployed();
    });
})