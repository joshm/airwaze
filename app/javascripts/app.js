// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

import lend_artifacts from '../../build/contracts/lendVault.json'

var LendVault = contract(lend_artifacts);

$(document).ready(getProperties);

function fundVault() {
    let fundAmount = $("#fund-amount").val();
    LendVault.fundVault({value: web3.toWei(fundAmount, 'ether'), from: web3.eth.accounts[3]}, getProperties);
}

function borrowFunds() {
    let fundsRequested = $("#funds-requested").val();
    LendVault.borrowFunds(web3.toWei(fundsRequested), {from: web3.eth.accounts[0]}, getProperties);
}

function makePayment() {
    let paymentAmount = $("#payment-amount").val();
    LendVault.makePayment(web3.toWei(paymentAmount), {from: web3.eth.accounts[0]}, getProperties);
}

function getProperties() {
  let val = JSON.parse('['+LendVault.getProperties.call().toString()+']');

  $("#token-fund").html(web3.fromWei(val[0]));
  $("#fund-left").html(web3.fromWei(val[1]));
  $("#fund-lent").html(web3.fromWei(val[2]));
  $("#fund-owed").html(web3.fromWei(val[3]));
  $("#fund-paid").html(web3.fromWei(val[4]));
  $("#fund-return").html(web3.fromWei(val[5]));
}
