import React, { useState } from 'react';

function BidTable(props) {
  return(
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>block</th>
          <th>value</th>
          <th>Number</th>
          <th>Winning number</th>
          <th>Winnings</th>
        </tr>
      </thead>
      <tbody>
        {props.bids.map(item => {
          return (
            <tr key = {item.key} >
              <td>{ item.key }</td>
              <td>{ item.block }</td>
              <td>{ item.value }</td>
              <td>{ item.badeNumber }</td>
              <td>{ item.winningNumber }</td>
              <td>{ item.winnings }</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  )
}

export default BidTable;
