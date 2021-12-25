import './App.css';

import React, { useState, useEffect } from 'react';

import Web3 from "web3/dist/web3.min";

import getWeb3 from './utils/getWeb3'
import getContractInstance from './utils/getContractInstance'
import ContractData from "./contracts/Loterie2.json";
import Lottery from "./lottery"
import web3Min from 'web3/dist/web3.min';

function App() {
  const [blockNumber, setBlockNumber] = useState(undefined);
  const [contract, setContract] = useState(null)
  const [accounts, setAccounts] = useState([])
  const [web3, setWeb3] = useState(null)
  const [lotteries, setLotteries] = useState([])

  useEffect(() => {
    async function setUpWeb3() {
      try {
        const web3 = await getWeb3()
        const accounts = await web3.eth.getAccounts()
        const contract = await getContractInstance(web3, ContractData)
        setWeb3(web3)
        setAccounts(accounts)
        setContract(contract)

        const updateLotteries = () => {
          contract.methods.get_lotteries().call().then((lotteries) => {
            setLotteries(lotteries)
          })
        }

        web3.eth.getBlockNumber().then((bn) => {
          setBlockNumber(bn);
        });

        web3.eth.subscribe("newBlockHeaders", (error, event) => {
          if (!error) {
            setBlockNumber(event.number)
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


  return (
    <div>
      <h2>Current Block: {blockNumber}</h2>
      {lotteries.map(function(item, i) {
        return <Lottery data={item} i={i} key={i}/>
      })}
    </div>
  );
}

export default App;
