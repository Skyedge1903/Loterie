// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

abstract contract Ownable {

    address public owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    constructor() {
        owner = msg.sender;
    }

    modifier isOwner() {
        require(msg.sender == owner);
        _;
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function transferOwnership(address newOwner) public isOwner {
        require(newOwner != address(0));
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }
}
