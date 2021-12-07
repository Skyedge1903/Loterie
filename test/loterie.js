const Loterie = artifacts.require("Loterie");


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



contract("Loterie", accounts => {
  const owner = accounts[0];

  const OPEN = 0
  const LOCKED = 1

  let lock_block = 0

  before('Setup contract', async () => {
      contract = await Loterie.deployed()
  });

  it('should have an owner', async () => {
    let current_owner = await contract.getOwner({ from: accounts[0] })
    assert.equal(current_owner, owner, "The owner isn't the person who deployed the contract");
  });

  it('should be opened by default', async() => {
    assert.equal(await contract.getState(), OPEN)
  });

  it('should not lock when nobody participated', async () => {
    try {
      await contract.lock()
    } catch (error) {
      err1 = error
    }
    assert.ok(err1 instanceof Error)
    assert.equal(await contract.getState(), OPEN)
  });

  it('should receive ether when participate is called', async () => {
    let eth = web3.utils.toWei("0.01", 'ether');
    await contract.participate({from: accounts[0], value: eth})
    let balance = await web3.eth.getBalance(contract.address)
    assert.equal(balance.toString(), web3.utils.toBN(eth).toString())
    assert.equal(await contract.getParticipantCount(), 1)
  });

  it('should fail when the amount is below the participation fee', async () => {
    let eth = web3.utils.toWei("0.001", 'ether');
    try {
      await contract.participate({from: accounts[0], value: eth})
    } catch(error) {
      err2 = error
    }
    assert.ok(err2 instanceof Error)
  });

  it('should allow several participations', async () => {
    let eth = web3.utils.toWei("0.01", 'ether');
    await contract.participate({from: accounts[0], value: eth})
    await contract.participate({from: accounts[0], value: eth})

    // Taking into account the previous participation in prior testcases
    let total = web3.utils.toWei("0.03", 'ether');
    let balance = await web3.eth.getBalance(contract.address)
    assert.equal(balance.toString(), web3.utils.toBN(total).toString())
    assert.equal(await contract.getParticipantCount(), 3)
  });

  it('should lock properly', async() => {
    assert.equal(await contract.getState(), OPEN)
    await contract.lock({from: accounts[0]})
    lock_block = (await web3.eth.getBlock('latest')).number
    assert.equal(await contract.getState(), LOCKED)
    assert.equal(await contract.getLockBlock(), lock_block)
  });

  it('should not allow withdrawing right away', async() => {
    try {
      await contract.withdrawGains({from: accounts[0]})
    } catch(error) {
      err3 = error
    }
    assert.ok(err3 instanceof Error)
  });

  it('should not allow participation when locked', async() => {
    try {
      let eth = web3.utils.toWei("0.01", 'ether');
      await contract.participate({from: accounts[0], value: eth})
    } catch(error) {
      err4 = error
    }
    assert.ok(err4 instanceof Error)
  });

  it('should allow withdrawing after two blocks', async() => {
    await advanceBlock()
    await advanceBlock()
    let after_block = (await web3.eth.getBlock('latest')).number
    assert.ok(after_block - lock_block >= 2)

    assert.equal(accounts[0], await contract.getWinner())

    assert.equal(await contract.getState(), LOCKED)
    await contract.withdrawGains()
    assert.equal(await contract.getState(), OPEN)
    let balance = await web3.eth.getBalance(contract.address)
    assert.equal(balance.toString(), web3.utils.toBN(0).toString())
  });

});
