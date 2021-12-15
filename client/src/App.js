import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react';
import Web3 from "web3/dist/web3.min";

import Roulette from "./contracts/Roulette.json";
import { getActiveElement } from '@testing-library/user-event/dist/utils';

var web3 = new Web3('ws://localhost:7545');

var contract_address;
var contract;
var accounts;

(async () => {
  web3.setProvider(new Web3.providers.WebsocketProvider('ws://localhost:7545'));
  contract_address = '0x66e6583499909e962721c3c0f8845c9E8aE38C1a'
  contract = await new web3.eth.Contract(Roulette.abi, contract_address);
  accounts = await web3.eth.getAccounts();
  // console.log(accounts)
  // console.log(contract)
})();

function App() {
  const [contractBalance, setContractBalance] = useState('unknown');
  const [playerBalance, setPlayerBalance] = useState('unknown')
  const [winnings, setWinnings] = useState('unknown')



  function update(){

    contract.events.allEvents({}, function(error, event){ console.log(event); })

    function updateContractBalance() {
      web3.eth.getBalance(contract_address).then(result => {
        setContractBalance(result.toString())
      })
    }

    function updatePlayerBalance() {
      web3.eth.getBalance(accounts[0]).then(result => {
        setPlayerBalance(result.toString())
      })
    }

    function updateWinnings() {

      // ça marche pas et je sais pas pk, aléd
      contract.methods.test().call().then(function (result) {
        // callback function
        //console.log(result);
      }).catch(console.log);
    }

    updateContractBalance()
    updatePlayerBalance()
    updateWinnings()
  }

  function play() {
    let eth = web3.utils.toWei("0.00000001", "ether")
    contract.methods.play(0).send({from: accounts[0], value: eth}).then(receipt => {
      //console.log(receipt)
    })
    update()
  }

  function deposit() {
    let eth = web3.utils.toWei("0.00000001", "ether")
    contract.methods.deposit().send({from: accounts[0], value: eth}).then(receipt => {
      //console.log(receipt)
    })
    update()
  }

  function withdrawWinnings() {
    contract.methods.get_winnings().send({from: accounts[0]}).then(receipt => {
      console.log(receipt)
    })
    update()
  }


  return (
    <div className="App">
      <button onClick={play}>Play</button>
      <button onClick={deposit}>Deposit</button>
      <button onClick={withdrawWinnings}>withdraw winnings</button>

      <div>Contract's balance = {contractBalance}</div>
      <div>Player's balance = {playerBalance}</div>
      <div>Player's winnings = {winnings}</div>
    </div>
  );
}

export default App;
