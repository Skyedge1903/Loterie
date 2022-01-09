import './App.css';

import React, { useState, useEffect } from 'react';

import getWeb3 from './utils/getWeb3'
import getContractInstance from './utils/getContractInstance'
import ContractData from "./contracts/Loterie2.json";
import Lottery from "./lottery"
import { TextField, InputAdornment, Button, Divider} from '@material-ui/core';

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

        console.log("Contract's address = ", address)
        console.log(contract)

        setWeb3(web3)
        setAccounts(accounts)
        setContract(contract)
        setContractAddress(address)



        function updateContractBalance() {
          web3.eth.getBalance(address).then(result => {
            setContractBalance(web3.utils.fromWei(result, "ether").toString())
          })
        }

        function updatePlayerBalance() {
          web3.eth.getBalance(accounts[0]).then(result => {
            setPlayerBalance(web3.utils.fromWei(result, "ether").toString())
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

      <TextField
        id="maxAmountField"
        label="Max Amount"
        variant="outlined"
        value={maxAmount}
        onChange={e => handleMaxAmountChange(e)}
        inputProps={{
          style: {
            padding: 10,
          }
        }}
      />

      <TextField
        id="toleranceField"
        label="Tolerance"
        variant="outlined"
        value={tolerance}
        onChange={e => handleToleranceChange(e)}
        inputProps={{
          style: {
            padding: 10,
          }
        }}
      />

      <TextField
        id="blockDurationField"
        label="Block Duration"
        variant="outlined"
        value={blockDuration}
        onChange={e => handleBlockDurationChange(e)}
        inputProps={{
          style: {
            padding: 10,
          }
        }}
      />

      <Button
        variant="contained"
        onClick={createLottery}
        inputProps={{
          style: {
            padding: 10,
          }
        }}
      >
        Create Lottery
      </Button>

      <h3>Data</h3>
      <div>Current Block: {blockNumber}</div>
      <div>Contract's balance = {contractBalance} eth</div>
      <div>Player's balance = {playerBalance} eth</div>
      <br/>
      {lotteries.slice(0).reverse().map(function(item, i) {
        const index = lotteries.length - i - 1
        return <Lottery data={item} i={index} key={index} web3={web3} currentBlock={blockNumber} contract={contract} account={accounts[0]}/>
      })}
    </div>
  );
}


export default App;
