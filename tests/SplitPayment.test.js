const SplitPayment = artifacts.require('SplitPayment');

//accounts array by truffle
contract('SplitPayment', (accounts) => {
    let splitPayments = null;

    before(async () => {
        splitPayments = await SplitPayment.deployed();
    });

    it('should split payment', async () => {
        //account 0 is the deployment accounts
        const recipients = [accounts[1], accounts[2], accounts[3]];
        const amounts = [20, 40, 60];
        //mapping through accounts
        const initialBalances = await Promise.all(recipients.map
            (recipient => {
                return web3.eth.getBalance(recipient);
            }));
        await splitPayments.send(
            recipients,
            //amounts must match total
            amounts, { from: accounts[0], value: 120 }
        );
        const finalBalances = await Promise.all(recipients.map(recipient => {
            return web3.eth.getBalance(recipient);
        }));
        //iterate through all recipients accounts
        recipients.forEach((_item, i) => {
            //finalbalance containing the final balances of each recipient.
            const finalBalance = web3.utils.toBN(finalBalances[i]);
            //initialBalances: An array containing the initial balances of each recipient.
            //initialBalances[i]: This gets the initial balance of the recipient at index i.
            //initialBalance: This stores the initial balance of the recipient as a BN instance.
            const initialBalance = web3.utils.toBN(initialBalances[i]);
            //calculates the difference between the final and initial balances
            assert(finalBalance.sub(initialBalance).toNumber() === amounts[i]);
        });
    });

    it('should NOT split payment if array length mismatch', async () => {
        const recipients = [accounts[1], accounts[2], accounts[3]];
        //giving un matched amount
        const amounts = [20, 40];
        //try block needed because of test mismatch no going thru without it
        try {
            await splitPayments.send(
                recipients,
                //total amount 90
                amounts, { from: accounts[0], value: 90 }
            );
        } catch (error) {
            assert(error.message.includes('Arrays must be of the same length'));
            return;
        }
        assert(false);
    });

    it('it should NOT split payment if not the owner of the smart contract', async () => {
        //account 0 is the deployment accounts
        const recipients = [accounts[1], accounts[2], accounts[3]];
        const amounts = [20, 40, 60];
        try {
            await splitPayments.send(
                recipients,
                //total amount 90
                amounts, { from: accounts[5], value: 90 }
            );
        } catch (error) {
            assert(error.message.includes('VM Exception while processing transaction: revert'));
            return;
        }
        assert(false);
    });
});