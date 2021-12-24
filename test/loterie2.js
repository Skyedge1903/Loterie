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

  const eth1 = web3.utils.toWei("1", 'ether');
  const eth2 = web3.utils.toWei("1", 'ether');

  before('Setup contract', async () => {
      contract = await Loterie2.deployed()
  });

  it('Creating a lottery should emit an event', async () => {

    const receipt = await contract.create_lottery(eth1, eth2, 20, {from: accounts[0]})

    const l = receipt.logs[0];
    assert.equal(l.event, 'LotteryCreated');
    assert.equal(l.args.index, 0);
  });

});
