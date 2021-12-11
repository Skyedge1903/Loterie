const Roulette = artifacts.require("Roulette");

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

contract("Roulette", accounts => {

  before('Setup contract', async () => {
      contract = await Roulette.deployed()
  });

  it('should allow straight bids', async () => {
    let eth = web3.utils.toWei("1", 'ether');

    let receipt = await contract.play(0, {from: accounts[0], value: eth})
    let current_block = (await web3.eth.getBlock("latest")).number
    let l = receipt.logs[0]

    assert.equal(l.event, 'BidCreated')
    assert.equal(l.args.from, accounts[0])
    assert.equal(l.args.value, eth)
    assert.equal(l.args.block_number, current_block)
    assert.equal(l.args.id.toNumber(), 0)

    assert.equal(current_block, l.args.block_number)

    try {
      await contract.won(l.args.id.toNumber())
    } catch(error) {
      err = error
    }
    assert.ok(err instanceof Error)
  });

})
