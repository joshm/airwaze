// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

import lend_artifacts from '../../build/contracts/lendVault.json'

var LendVault = contract(lend_artifacts);

window.fundVault = function() {
  let fundAmount = $("#fund-amount").val();
  LendVault.deployed().then(function(contractInstance) {
    console.log(fundAmount, web3.eth.accounts[0]);
    contractInstance.fundVault(
      web3.toWei(fundAmount, 'ether'), {from: web3.eth.accounts[0]}).then(function(v) {
        //getProperties();
        LendVault.deployed().then(function(contractInstance) {
          contractInstance.getProperties.call().then(function(v) {
            console.log(v);
            let val = JSON.parse('['+v.toString()+']');

            $("#fund-left").html(web3.fromWei(val[1]));
            $("#fund-lent").html(web3.fromWei(val[2]));
            $("#fund-owed").html(web3.fromWei(val[3]));
            $("#fund-paid").html(web3.fromWei(val[4]));
            $("#fund-return").html(web3.fromWei(val[5]));
          });
        });
      });
  });
}

/*
function fundVault() {
    let fundAmount = $("#fund-amount").val();
    LendVault.fundVault({value: web3.toWei(fundAmount, 'ether'), from: web3.eth.accounts[0]}, getProperties);
}
*/

function borrowFunds() {
    let fundsRequested = $("#funds-requested").val();
    LendVault.borrowFunds(web3.toWei(fundsRequested), {from: web3.eth.accounts[0]}, getProperties);
}

function makePayment() {
    let paymentAmount = $("#payment-amount").val();
    LendVault.makePayment(web3.toWei(paymentAmount), {from: web3.eth.accounts[0]}, getProperties);
}

function getProperties() {
  LendVault.deployed().then(function(contractInstance) {
    contractInstance.getProperties.call().then(function(v) {
      let val = JSON.parse('['+v.toString()+']');

      console.log(val);
      $("#fund-left").html(web3.fromWei(val[1]));
      $("#fund-lent").html(web3.fromWei(val[2]));
      $("#fund-owed").html(web3.fromWei(val[3]));
      $("#fund-paid").html(web3.fromWei(val[4]));
      $("#fund-return").html(web3.fromWei(val[5]));
    });
  });
}

//$(document).ready(getProperties);
$(document).ready(function() {
  /*
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source like Metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
  */
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  //}

  LendVault.setProvider(web3.currentProvider);
  LendVault.deployed().then(function(contractInstance) {
    contractInstance.getProperties.call().then(function(v) {
      let val = JSON.parse('['+v.toString()+']');
      $("#fund-left").html(web3.fromWei(val[1]));
      $("#fund-lent").html(web3.fromWei(val[2]));
      $("#fund-owed").html(web3.fromWei(val[3]));
      $("#fund-paid").html(web3.fromWei(val[4]));
      $("#fund-return").html(web3.fromWei(val[5]));
    });
  });
});


