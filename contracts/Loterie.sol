pragma solidity >=0.7.0 <0.9.0;

import "./Ownable.sol";

contract Loterie is Ownable {
    /* 
    Here's how it works:
        - N participants contribute 1 eth each via the `participate()` function
        - A participant calls the `lock()` function, no one else can contribute for that round
        - In the next block, the winner can call the `collect()` function to get his winnings.
    */

    uint256 constant PARTICIPATION_FEE = 10000000000000000; // = 0.01 eth

    enum LState {
        Open,
        Locked
    }

    // list of the msg.sender.address of the participants
    address[] public participantList;

    uint256 public lockBlock;

    LState public lotteryState = LState.Open;

    uint256 public nb_max_players = 2;

    function participate() public payable {
        require(lotteryState == LState.Open);
        require(msg.value >= PARTICIPATION_FEE);
        require(participantList.length < nb_max_players);
        participantList.push(msg.sender);
        if (participantList.length == nb_max_players) {
            lock();
        }
        // auto lock the Lotterie when the number of pariticipants is over the nb_max_players value
    }

    function lock() private {
        require(lotteryState == LState.Open);
        require(participantList.length > 1);
        lotteryState = LState.Locked;
        lockBlock = block.number;
    }

    // Now the people who withdrawGains for the winner can change the lottery parmeters

    function withdrawGains(uint _new_max_players) public {
        require(lotteryState == LState.Locked);
        require(block.number >= lockBlock + 2);

        lotteryState = LState.Open;
        if (_new_max_players > 1) { // but over one player
            nb_max_players = _new_max_players; // The winner can define the new max of players
        }

        payable(getWinner()).transfer(address(this).balance);
        delete lockBlock;
        delete participantList;
    }


    // getters
    function getWinner() public view returns (address) {
        return participantList[uint256(blockhash(lockBlock+1)) % participantList.length];
    }
    
    function getState() public view returns (LState) {
        return lotteryState;
    }

    function getLockBlock() public view returns (uint256) {
        require(lotteryState == LState.Locked);
        return lockBlock;
    }

    function getLockBlock() public view returns (uint256) {
        return nb_max_players;
    }

    function getParticipantCount() public view returns (uint256) {
        return participantList.length;
    }
    
}
