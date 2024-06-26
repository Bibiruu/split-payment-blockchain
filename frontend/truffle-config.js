const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

// Exponential backoff formula: 2^attempt * 1000 (milliseconds)
const exponentialBackoff = (attempt) => {
  return Math.pow(2, attempt) * 1000;
};

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },

    sepolia: {
      provider: () => new HDWalletProvider(
        process.env.MNEMONIC,
        `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHMY_ENDPOINT}`, {
        //connection to be reused for multiple requests, rather than establishing a new oe
        providerOptions: {
          keepAlive: true,
          confirmations: 10,
          numberOfAddresses: 1,
          shareNonce: true,
          //time out to 20sec,prevent from waiting indefinitely
          networkCheckTimeout: 10000,
          gas: 30000000,               // Gas limit
          gasPrice: 10000000000,    // 10 Gwei
          timeoutBlocks: 200,
          skipDryRun: true
        },
        clientConfig: {
          maxAttempts: 5,
          //Function to calculate retry interval
          interval: exponentialBackoff
        },
      }
      ),
      network_id: 11155111
    }
  },
  compilers: {
    solc: {
      version: "0.8.19",
    }
  },
};
