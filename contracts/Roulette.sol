// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


contract Roulette {

    uint8 constant biggest_number = 10;

    modifier is_valid_number(uint8 nb) {
        require(nb <= biggest_number, "The number is not a valid Roulette number");
        _;
    }

    struct Bid {
        uint256 value;
        uint256 block_number;
        uint8 number;
    }

    event BidCreated(
        address indexed from,
        uint256 value,
        uint256 block_number,
        uint8 number,
        uint256 id
    );

    // Each address can play several times
    mapping (address => Bid[]) bids;

    // The roulette may require funds
    function deposit() public payable {}

    function play(uint8 roulette_number) public payable is_valid_number(roulette_number) {
        bids[msg.sender].push(Bid(msg.value, block.number, roulette_number));

        emit BidCreated(msg.sender, msg.value, block.number, roulette_number, bids[msg.sender].length - 1);
    }


    function get_block_number(uint256 id) public view returns(uint256) {
        return bids[msg.sender][id].block_number;
    }

    function get_winning_number(uint256 id) public view returns(uint256) {
        require(get_block_number(id) < block.number);
        return (uint256(blockhash(get_block_number(id))) % uint256(biggest_number + 1));
    }

    function won(uint256 id) public view returns(bool, uint256) {
        Bid[] memory b = bids[msg.sender];
        require(id < b.length, "Incorrect id");
        return (get_winning_number(id) == b[id].number, b[id].value * 5);
    }

    function calculate_winnings() public view returns(uint256) {
        Bid[] memory b = bids[msg.sender];
        uint256 winnings = 0;
        for (uint i = 0; i < b.length; i++) {
            if(b[i].block_number < block.number) {
                (bool w, uint256 a) = won(i);
                if(w){
                    winnings += a;
                }
            }
        }
        return winnings;
    }

    function get_bids() public view returns(Bid[] memory) {
        return bids[msg.sender];
    }

    function get_winnings() public {
        uint256 winnings = calculate_winnings();
        if(winnings > 0) {
            payable(msg.sender).transfer(winnings);
        }

        // calculate_winning will fail if the player bade in the same block
        // we can thus safely delete all bids
        delete bids[msg.sender];
    }

}
