const Loterie2 = artifacts.require("Loterie2");

// Lets truffle wait for blocks
const advanceBlock = () => {
    return new Promise((resolve, reject) => {
        web3.currentProvider.send({
            jsonrpc: "2.0",
            method: "evm_mine",
            id: new Date().getTime()
        }, (err, result) => {
            if (err) { return reject(err); }
            const newBlockHash = web3.eth.getBlock('latest').hash;

            return resolve(newBlockHash)
        });
   });
}

contract("Loterie2", accounts => {

  before('Setup contract', async () => {
      contract = await Loterie2.deployed()
  });

  it('Creating a lottery should emit an event', async () => {
    await advanceBlock()
    let current_block = (await web3.eth.getBlock("latest")).number
    let eth = web3.utils.toWei("0.000001", 'ether');

    await contract.create_lottery(0.0001, 10, {from: accounts[0]})


  });

});
