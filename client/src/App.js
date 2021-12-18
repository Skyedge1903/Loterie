import "./App.css"

import React, { useState, useEffect } from 'react';

import Web3 from "web3/dist/web3.min";
import Roulette from "./contracts/Roulette.json";
import BidTable from "./Table"


var web3 = new Web3('ws://localhost:9545');

var contract_address;
var contract;
var accounts;

(async () => {
  contract_address = '0xbc3811250224C9814008C03eaf9C4bbeAC8572EE'
  contract = await new web3.eth.Contract(Roulette.abi, contract_address);
  accounts = await web3.eth.getAccounts();
})();

function App() {
  const [contractBalance, setContractBalance] = useState('loading...');
  const [playerBalance, setPlayerBalance] = useState('loading...')
  const [winnings, setWinnings] = useState('loading...')
  const [bids, setBids] = useState([]);


  const [value, setValue] = useState("0.00000001")
  const [number, setNumber] = useState(0)

  // we have to sub only once. useeffect with empty dep array ensures that
  useEffect(() => {
    contract.events.BidCreated({}, function(error, event){ handleEvent(event) })
  }, [])

  useEffect(() => {
    web3.eth.getBlockNumber().then((block) => {
      bids.forEach((e) => {
        if(e.winningNumber === null && e.block < block){
          contract.methods.get_winning_number(e.key).call({from: accounts[0]}).then((number) => {
            e.winningNumber = number;
          })

          contract.methods.won(e.key).call({from: accounts[0]}).then((won) => {
            if(won[0] === true) {
              e.winnings = won[1]
            } else {
              e.winnings = 0
            }
          })
        }
      })
    })
  }, [bids])

  function updatePlayerBalance() {
    web3.eth.getBalance(accounts[0]).then(result => {
      setPlayerBalance(result.toString())
    })
  }

  function updateWinnings() {
    contract.methods.calculate_winnings().call().then(function (result) {
      setWinnings(result)
    });
  }

  function updateContractBalance() {
    web3.eth.getBalance(contract_address).then(result => {
      setContractBalance(result.toString())
    })
  }

  function printBids() {
    contract.methods.get_bids().call().then(function (bids) {
      console.log(bids)
    });
  }


  function handleEvent(event) {
    if(accounts[0] !== event.returnValues.from){
      return;
    }
    let values = event.returnValues

    let bid = {
      key: values.id,
      block: values.block_number,
      badeNumber: values.number,
      value: values.value,
      winningNumber: null,
      winnings: null
    }

    setBids((bids) => [...bids, bid]);
  }

  function update(){
    updateContractBalance()
    updatePlayerBalance()
    updateWinnings()
  }

  function play(value, number) {
    let eth = web3.utils.toWei(value.toString(), "ether")
    contract.methods.play(number).send({from: accounts[0], value: eth, gas: 500000})
    update()
  }

  function deposit() {
    let eth = web3.utils.toWei(value.toString(), "ether")
    contract.methods.deposit().send({from: accounts[0], value: eth})
    update()
  }

  function withdrawWinnings() {
    contract.methods.get_winnings().send({from: accounts[0], gas: 5000000})
    update()
  }

  function handleValueChange(e) {
    let value = e.target.value;
    value.replace(/\D/, '');
    setValue(value)
  }

  function handleNumberChange(e) {
    let number = e.target.value;
    number.replace(/\D/, '');
    if(number > 10 || number < 0) {
      return
    }
    setNumber(number)
  }


  return (
    <div className="App">
      <button onClick={() => play(value, number)}>Play</button>
      <button onClick={deposit}>Deposit</button>
      <button onClick={withdrawWinnings}>withdraw winnings</button>
      <button onClick={update}>udpate</button>
      <button onClick={printBids}>print bids</button>

      <br/>Transaction Value:
      <input value={value} onChange={e => handleValueChange(e)}/>

      <br/> Roulette number:
      <input value={number} onChange={e => handleNumberChange(e)}/>

      <div>Contract's balance = {contractBalance}</div>
      <div>Player's balance = {playerBalance}</div>
      <div>Player's winnings = {winnings}</div>


      <BidTable bids={bids}/>

    </div>
  );
}

export default App;
