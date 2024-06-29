import Web3 from 'web3';
import SplitPayment from '../../build/contracts/SplitPayment.json';

let web3;
let splitPayment;

const initWeb3 = () => {
  return new Promise((resolve, reject) => {
    if (typeof window.ethereum !== 'undefined') {
      web3 = new Web3(window.ethereum);
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(() => {
          resolve(web3);
        })
        .catch(e => {
          reject(e);
        });
      return;
    }
    if (typeof window.web3 !== 'undefined') {
      return resolve(
        new Web3(window.web3.currentProvider)
      );
    }
    resolve(new Web3('http://localhost:9545'));
  });
};

const initContract = async () => {
  const networkId = await web3.eth.net.getId();
  console.log('networkid', networkId)
  return new web3.eth.Contract(
    SplitPayment.abi,
    SplitPayment
      .networks[networkId]
      .address
  );
};

const initApp = () => {
  const $send = document.getElementById('send');
  const $sendResult = document.getElementById('send-result');

  //get accounts
  let accounts = [];
  web3.eth.getAccounts()
    .then(_accounts => {
      accounts = _accounts;
    });

  $send.addEventListener('submit', e => {
    e.preventDefault();

    // Get the recipient addresses and amounts in Ether
    const to = e.target.elements[0].value.split(',').map(address => address.trim());
    const amountInEther = e.target.elements[1].value.split(',').map(val => parseFloat(val.trim()));
    const amountInWei = amountInEther.map(val => web3.utils.toWei(val.toString(), 'ether'));

    // Calculate the total amount to be sent in Wei
    const totalInWei = amountInWei.reduce((sum, val) => sum + BigInt(val), BigInt(0));

    // Log the values
    console.log('TO:', to);
    console.log('AMOUNT IN WEI:', amountInWei);
    console.log('TOTAL IN WEI:', totalInWei.toString());
    console.log('owner', accounts[0]);

    splitPayment.methods
      .send(to, amountInWei)
      .send({ from: accounts[0], value: totalInWei.toString() })
      .then(() => {
        $sendResult.innerHTML = `Transfer sent!`;
      })
      .catch(_e => {
        $sendResult.innerHTML = `Ooops... there was an error while trying to send a split payment...`;
      });
  });
};


document.addEventListener('DOMContentLoaded', () => {
  initWeb3()
    .then(_web3 => {
      web3 = _web3;
      return initContract();
    })
    .then(_splitPayment => {
      splitPayment = _splitPayment;
      initApp();
    })
    .catch(error => console.log(error.message));
});
