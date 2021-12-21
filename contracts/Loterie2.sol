// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "./Ownable.sol";

contract Loterie2 is Ownable {


  struct Lottery {
    address[] addr;
    uint[] weight;

    uint max_amount;
    uint lock_block;

    bool was_withdrawn;
  }


  Lottery[] public lotteries;

  event LotteryCreated(
    uint index
  );

  function create_lottery(uint max_amount, uint lock_block) public {
    Lottery memory l;
    l.max_amount = max_amount;
    l.lock_block = lock_block;
    l.was_withdrawn = false;

    lotteries.push(l);

    emit LotteryCreated(lotteries.length - 1);
  }

  function participate(uint index) public payable {

  }

  function withdraw_gains(uint index) public {
    require(!lotteries[index].was_withdrawn, "lottery was already withdrawn");

    lotteries[index].was_withdrawn = true;
  }

  function is_lottery_locked(uint index) public view {

  }

  function get_lottery_lock_block(uint index) public view {

  }

  function get_lottery_participants(uint index) public view returns(address[] memory, uint[] memory) {

  }

  function get_lottery_max_amount(uint index) public view returns(uint) {

  }

  function get_lottery_remaining_amount(uint index) public view returns(uint) {

  }

  function get_lottery_winner(uint index) public view returns(address) {

  }

  function was_lottery_withdrawn(uint index) public view returns(bool) {
    return lotteries[index].was_withdrawn;
  }

  function get_lottery_count(uint index) public view returns(uint) {
    return lotteries.length;
  }

  function get_lotteries() public view returns(Lottery[] memory) {
    return lotteries;
  }

  function withdraw() public isOwner {
    payable(owner).transfer(address(this).balance);
  }
}
