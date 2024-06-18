const SplitPayment = artifacts.require('SplitPayment');

//accounts array by truffle
contract('SplitPayments', (accounts) => {
    let splitPayments = null;

    before(async () => {
        splitPayments = await SplitPayment.deployed();
    });

    it('should split payment', async () => {
        //account 0 is the deployment accounts
        const recipients = [accounts[1], accounts[2], accounts[3]];
        const amounts = [20, 40, 60];
        const initialBalances = await Promise.all(recipients.map
            (recipient => {
                return web3.eth.getBalance(recipients);
            }));
        await splitPayments.send(
            recipients,
            //total amount 90
            amounts, { from: accounts[0], value: 90 }
        );
        const finalBalances = await Promise.all(recipients.map
            (recipient => {
                recipient => {
                    return web3.eth.getBalance(recipient);
                }
            }));
            recipients.forEach((_item, i) => {
                const finalBalance = web3.utils.toBN(finalBalances[i]);
                const initialBalance = web3.utils.toBN(initialBalance[i]);
            });
            assert(finalBalance.sub(initialBalance).toNumber() === amounts[i]);
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
            assert(error.message.includes("to must be same length as amount"));
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
                    assert(error.message.includes("VM error while processing transaction: revert"));
                    return;
                }
                assert(false);            
    });
});