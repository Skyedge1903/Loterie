import './App.css';

import React, { useState, useEffect } from 'react';

import getWeb3 from './utils/getWeb3'
import getContractInstance from './utils/getContractInstance'
import ContractData from "./contracts/Loterie2.json";
import Lottery from "./lottery"

function App() {
  const [blockNumber, setBlockNumber] = useState(undefined);
  const [contract, setContract] = useState(null)
  const [contractAddress, setContractAddress] = useState(null)
  const [accounts, setAccounts] = useState([])
  const [web3, setWeb3] = useState(null)
  const [lotteries, setLotteries] = useState([])
  const [contractBalance, setContractBalance] = useState('unknown');
  const [playerBalance, setPlayerBalance] = useState('unknown')

  const [maxAmount, setMaxAmount] = useState(0.001)
  const [tolerance, setTolerance] = useState(0.001)
  const [blockDuration, setBlockDuration] = useState(10)


  useEffect(() => {
    async function setUpWeb3() {
      try {
        const web3 = await getWeb3()
        const accounts = await web3.eth.getAccounts()
        const contractAndAddress = await getContractInstance(web3, ContractData)
        const contract = contractAndAddress[0]
        const address = contractAndAddress[1]

        setWeb3(web3)
        setAccounts(accounts)
        setContract(contract)
        setContractAddress(address)

        function updateContractBalance() {
          web3.eth.getBalance(address).then(result => {
            setContractBalance(result.toString())
          })
        }

        function updatePlayerBalance() {
          web3.eth.getBalance(accounts[0]).then(result => {
            setPlayerBalance(result.toString())
          })
        }

         const updateLotteries = () => {
           contract.methods.get_lotteries().call().then((lotteries) => {
             setLotteries(lotteries)
           })
         }

        web3.eth.getBlockNumber().then((bn) => {
          setBlockNumber(bn);
        });

        updateContractBalance()
        updatePlayerBalance()

        web3.eth.subscribe("newBlockHeaders", (error, event) => {
          if (!error) {
            setBlockNumber(event.number)
            contract.methods.get_lotteries().call().then((lotteries) => {
              setLotteries(lotteries)
            })

            updateContractBalance()
            updatePlayerBalance()
          }
        });

        updateLotteries()
      } catch (error) {
        alert("Failed to load web3, accounts, or contract. Check console for details.")
        console.log(error)
      }
    }
    setUpWeb3()
  }, []);

  function handleMaxAmountChange(e) {
    let value = e.target.value;
    value.replace(/\D/, '');
    if(value < 0) {
      return
    }
    setMaxAmount(value)
  }

  function handleToleranceChange(e) {
    let value = e.target.value;
    value.replace(/\D/, '');
    if(value < 0) {
      return
    }
    setTolerance(value)
  }

  function handleBlockDurationChange(e) {
    let value = e.target.value;
    value.replace(/\D/, '');
    if(value < 10) {
      return
    }
    setBlockDuration(value)
  }

  function createLottery() {
    let max = web3.utils.toWei(maxAmount.toString(), "ether")
    let tol = web3.utils.toWei(tolerance.toString(), "ether")

    // This call should take 112 299 gas
    contract.methods.create_lottery(max, tol, blockDuration).send({from: accounts[0], gas: 150000}).then(() => {
      contract.methods.get_lotteries().call().then((lotteries) => {
        setLotteries(lotteries)
      })
    })
  }

  return (
    <div>
      <h3>Create Lottery</h3>
      <br/>Max Amount:
      <input value={maxAmount} onChange={e => handleMaxAmountChange(e)}/>

      <br/>Tolerance:
      <input value={tolerance} onChange={e => handleToleranceChange(e)}/>

      <br/>Block Duration:
      <input value={blockDuration} onChange={e => handleBlockDurationChange(e)}/>
      <br/>Estimation: {blockDuration * 13} seconds

      <br/><button onClick={createLottery}>Create</button>


      <h3>Current Block: {blockNumber}</h3>
      <div>Contract's balance = {contractBalance}</div>
      <div>Player's balance = {playerBalance}</div>

      {lotteries.slice(0).reverse().map(function(item, i) {
        const index = lotteries.length - i - 1
        return <Lottery data={item} i={index} key={index} web3={web3} currentBlock={blockNumber} contract={contract} account={accounts[0]}/>
      })}
    </div>
  );
}


export default App;
