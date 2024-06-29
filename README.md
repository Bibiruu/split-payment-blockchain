# split-payment-blockchain


What web3 library has:

-Setting Up Web3:
How to initialize a Web3 instance by checking for window.ethereum and window.web3 to connect to different providers, including MetaMask and a local blockchain.
Requesting Account Access:

-The use of ethereum.request({ method: 'eth_requestAccounts' }) to prompt the user to grant Access to their Ethereum accounts in the browser.

-Handling Promises:
The importance of using Promises to manage asynchronous operations such as requesting account access and initializing the contract.
Dynamic Contract Initialization:

-How to dynamically fetch the contract's network ID and use it to retrieve the correct contract address from the deployed contract's JSON file.
Interacting with Smart Contracts:

-Creating a new contract instance using new web3.eth.Contract with the contract's ABI and address.

-Fetching User Accounts:
Using web3.eth.getAccounts to retrieve a list of user accounts connected to the Web3 provider.
Handling Form Submissions:

-Adding event listeners to form elements to capture user input and trigger contract method calls upon form submission.

-Sending Transactions:
How to send a transaction to the smart contract method using contract.methods.send(...).send({ from, value }) with appropriate parameters.
Error Handling:

-Implementing error handling in both Promise chains and form submission to provide user feedback and manage errors effectively.

-DOM Interaction:
Manipulating the DOM to display transaction results or errors, enhancing the user experience.


Scan transaction hash from Etherscan to the testnet deployment from ALCHEMY endpoint:
Migrations: 0x68c169bac90144fc7d91702a58f119d0d4238457e12528a8ab78f7bb8798f83c
SplitPayment:  0xa31565d48f75ff536d231e18a9f57a5f840be22bd624f2851371a6ada2bb93e4
