import getWeb3 from "./utils/getWeb3";
import { useEffect, useState } from 'react'

function Lottery({ data, i, web3, currentBlock, contract, account }) {

  const [amount, setAmount] = useState(0.0001)
  const [winner, setWinner] = useState(null)

  const toEth = (wei) => {
    return web3.utils.fromWei(wei, "ether")
  }

  const is_over = () => {
    return (currentBlock >= data.lock_block || data.max_amount < data.total_amount)
  }

  const can_withdraw = () => {
    return !data.is_dropped
  }

  const won = () => {
    return winner === account
  }

  const status = () => {
    if (is_over()) {
      if(won()) {
        return "Won"
      } else {
        return "Lost"
      }
    } else {
      return ((data.lock_block - currentBlock) * 13).toString() + " seconds"
    }
  }

  useEffect(() => {
    if (is_over()){
      contract.methods.get_winner(i).call({from: account}).then((addr) => {
        setWinner(addr)
      })
    }

    web3.eth.subscribe("newBlockHeaders", (error, event) => {
      if (!error) {
        contract.methods.get_winner(i).call({from: account}).then((addr) => {
          setWinner(addr)
        })
      }
    });

  }, [])



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


  function withdraw() {
    contract.methods.withdraw_gains(i).send({from: account, gas: 200000})
  }

  return (
    <div>
    <h2>Lottery number {i}</h2>
    <input value={amount} onChange={e => handleAmountChange(e)}/>
    <button onClick={participate}>Participate</button>

    <p>Current Amount = {toEth(data.total_amount)} eth </p>
    <p>Remaining</p>
    <p>Max amount = {toEth(data.max_amount)} eth</p>
    <p>Tolerance = {toEth(data.exceeding_tolerance)} eth</p>
    <p>Lock block = {data.lock_block}</p>
    <p>Status = {status()}</p>
    <p>Winner = {winner}</p>
    <button disabled={!(account===winner && can_withdraw())} onClick={withdraw}>Withdraw</button>
    <h4>Participants:</h4>
      {data.addrs.map(function(addr, j) {
        return <p key={j}> {addr} : {toEth(data.amounts[j])} eth</p>
      })}
    </div>
  );
}

export default Lottery;
