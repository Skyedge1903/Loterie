function Lottery({ data, i }) {
  return (
    <div>
    <h2>Lottery number {i}</h2>
    <p>Amount = {data.total_amount}</p>
    <p>Max amount = {data.max_amount}</p>
    <p>Tolerance = {data.exceeding_tolerance}</p>
    <p>Lock block = {data.lock_block}</p>
    <h4>Participants:</h4>
      {data.addrs.map(function(addr, j) {
        return <p key={j}> {addr} : {data.amounts[j]}</p>
      })}
    </div>
  );
}

export default Lottery;
