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
  const eth2 = web3.utils.toWei("2", 'ether');

  const gwei1 = web3.utils.toWei("0.000000001", 'ether')
  const gwei2 = web3.utils.toWei("0.000000002", 'ether')

  before('Setup contract', async () => {
      contract = await Loterie2.deployed()
  });

  it('Creating a lottery should emit an event', async () => {
    const receipt = await contract.create_lottery(eth2, eth1, 20, {from: accounts[0]})
    const l = receipt.logs[0];
    assert.equal(l.event, 'LotteryCreated');
    assert.equal(l.args.index, 0);
  });

  it('Creating a second lottery should increment the index', async () => {
    const receipt = await contract.create_lottery(gwei2, gwei1, 20, {from: accounts[0]})
    const l = receipt.logs[0];
    assert.equal(l.event, 'LotteryCreated');
    assert.equal(l.args.index, 1);
  });

  it('Creating a lottery with less than 10 blocks should fail', async () => {
    let err = null;
    try {
      await contract.create_lottery(gwei2, gwei1, 1, {from: accounts[0]})
    }
    catch (error){
      err = error;
    }
    assert.ok(err instanceof Error)
  });

});
