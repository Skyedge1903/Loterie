import getWeb3 from "./utils/getWeb3";
import { useState } from 'react'

function Lottery({ data, i, web3, currentBlock, contract, account }) {

  const [amount, setAmount] = useState(0.0001)

  const toEth = (wei) => {
    return web3.utils.fromWei(wei, "ether")
  }

  const status = (current, end, max, tol, curr) => {
    if (current >= end) {
      return "ended"
    } else {
      if(max + tol === curr) {
        return "ended"
      }
      return ((end - current) * 13).toString() + " seconds"
    }
  }

  const participate = () => {
    // 146 809 gas au premier call sur la lottery
    // 101 809 gas au calls suivant
    let eth = web3.utils.toWei(amount.toString(), "ether")
    contract.methods.participate(i).send({from: account, gas: 150000, value: eth })
  }

  function handleAmountChange(e) {
    let value = e.target.value;
    value.replace(/\D/, '');
    if(value < 0) {
      return
    }
    setAmount(value)
  }

  return (
    <div>
    <h2>Lottery number {i}</h2>
    <input value={amount} onChange={e => handleAmountChange(e)}/>
    <button onClick={participate}>Participate</button>
      <p>Current Amount = {toEth(data.total_amount)} eth </p>
    <p>Max amount = {toEth(data.max_amount)} eth</p>
    <p>Tolerance = {toEth(data.exceeding_tolerance)} eth</p>
    <p>Lock block = {data.lock_block}</p>
    <p>Status = {status(currentBlock, data.lock_block)}</p>
    <h4>Participants:</h4>
      {data.addrs.map(function(addr, j) {
        return <p key={j}> {addr} : {data.amounts[j]}</p>
      })}
    </div>
  );
}

export default Lottery;
