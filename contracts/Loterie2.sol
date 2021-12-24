// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "./Ownable.sol";

contract Loterie2 is Ownable {

  struct Lottery {
    address[] addrs;
    uint[] amounts;

    uint total_amount;
    uint max_amount;
    uint exceeding_tolerance;
    uint lock_block;

    bool is_dropped;
  }

  Lottery[] public lotteries;

  event LotteryCreated(
    uint index
  );

  function create_lottery(uint max_amount, uint exceeding_tolerance, uint duration_in_blocks) public {
    require(duration_in_blocks > 9, "The lottery has to last at least 10 blocks");
    Lottery memory l;
    l.total_amount = 0;
    l.max_amount = max_amount;
    l.lock_block = block.number + duration_in_blocks;
    l.exceeding_tolerance = exceeding_tolerance;
    l.is_dropped = false;

    lotteries.push(l);

    emit LotteryCreated(lotteries.length - 1);
  }

  function participate(uint index) public payable {
    require(is_index_valid(index), "Incorrect index passed");
    require(is_lottery_playable(index), "This lottery is closed");
    require(is_not_exceeding_tolerence(index, msg.value), "Overrun tolerance exceeded");
    lotteries[index].addrs.push(msg.sender);
    lotteries[index].amounts.push(msg.value);
    lotteries[index].total_amount += msg.value;
    if (!is_lottery_playable(index)) {
      lotteries[index].lock_block = block.number;
    }
  }

  function withdraw_gains(uint index) public {
    require(is_index_valid(index), "Incorrect index passed");
    require(is_lottery_withdrawable(index), "This lottery is closed");

    uint winner_wei = uint(blockhash(lotteries[index].lock_block + 2)) % lotteries[index].total_amount;
    uint current_wei = 0;

    for (uint i = 0; i < lotteries[index].addrs.length; i++){
      current_wei += lotteries[index].amounts[i];
      if (current_wei >= winner_wei) {
        payable(lotteries[index].addrs[i]).transfer(lotteries[index].total_amount);
        break;
      }
    }
    lotteries[index].is_dropped = true;
  }

  function is_index_valid(uint index) public view returns(bool){
    if (index < 0) {
      return false;
    }
    else if (index >= get_lottery_count()){
      return false;
    }
    else if (lotteries[index].is_dropped){
      return false;
    }
    else {
      return true;
    }
  }

  function is_lottery_playable(uint index) public view returns(bool){
    if (block.number < lotteries[index].lock_block && lotteries[index].total_amount < lotteries[index].max_amount) {
      return true;
    }
    else {
      return false;
    }
  }

  function is_lottery_withdrawable(uint index) public view returns(bool){
    if (block.number >= lotteries[index].lock_block + 2) {
      return true;
    }
    else {
      return false;
    }
  }

  function is_not_exceeding_tolerence(uint index, uint value) public view returns(bool){
    uint total_amount_temp = lotteries[index].total_amount + value;
    uint max_amount_whith_tolerance = lotteries[index].max_amount + lotteries[index].exceeding_tolerance;
    if (total_amount_temp <= max_amount_whith_tolerance) {
      return true;
    }
    else {
      return false;
    }
  }

  function get_winner(uint index) public view returns(address) {
    require(is_index_valid(index), "Incorrect index passed");
    require(is_lottery_withdrawable(index), "Lottery not currently withdrawable");
    
    uint winner_wei = uint(blockhash(lotteries[index].lock_block + 2)) % lotteries[index].total_amount;
    uint current_wei = 0;

    for (uint i = 0; i < lotteries[index].addrs.length; i++){
      current_wei += lotteries[index].amounts[i];
      if (current_wei >= winner_wei) {
        return lotteries[index].addrs[i];
      }
    }
    return address(this);
  }

  function get_lottery_lock_block(uint index) public view returns(uint) {
    return lotteries[index].lock_block;
  }

  function get_lottery_participants_number(uint index) public view returns(uint) {
    return lotteries[index].addrs.length;
  }

  function get_lottery_total_amount(uint index) public view returns(uint) {
    return lotteries[index].total_amount;
  }

  function was_lottery_dropped(uint index) public view returns(bool) {
    return lotteries[index].is_dropped;
  }

  function get_lottery_count() public view returns(uint) {
    return lotteries.length;
  }

  function get_lotteries() public view returns(Lottery[] memory) {
    return lotteries;
  }

  // This function is just here to showcase ownership.
  function withdraw() public isOwner {
    payable(owner).transfer(address(this).balance);
  }
}
