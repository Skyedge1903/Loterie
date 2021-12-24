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

const advanceNBlocks = async (block_count) => {
  for(let i = 0; i < block_count; ++i) {
    await advanceBlock()
  }
}


contract("Loterie2", accounts => {

  const eth1 = web3.utils.toWei("1", 'ether');
  const eth2 = web3.utils.toWei("2", 'ether');

  const gwei1 = web3.utils.toWei("0.000000001", 'ether')
  const gwei2 = web3.utils.toWei("0.000000002", 'ether')

  before('Setup contract', async () => {
      contract = await Loterie2.deployed()
  });

  describe("create_lottery", () => {

    it('Creating a lottery should emit an event', async () => {
      const receipt = await contract.create_lottery(eth2, eth1, 20, {from: accounts[0]})
      const l = receipt.logs[0];
      assert.equal(l.event, 'LotteryCreated');
      assert.equal(l.args.index, 0);
    });

    it('Creating a second lottery should increment the index', async () => {
      const receipt = await contract.create_lottery(gwei2, gwei1, 500, {from: accounts[0]})
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


  describe("participate", () => {
    it('Participating should be allowed with correct values', async() => {
      let err = null;
      try {
        await contract.participate(0, {from: accounts[0], value: gwei1})
      }
      catch (error){
        // If the transaction is reverted then the test will fail
        assert.ok(false);
      }
    });


    describe("valid participation", () => {
      // This describe block is actually executed
      // after the other it in the parent block
      // We setup a new lottery to avoid issues with block expiration
      before('setup a new valid lottery', async () => {
        let current_block = (await web3.eth.getBlock("latest")).number
        const receipt = await contract.create_lottery(eth2, eth1, 10, {from: accounts[0]});

        // make sure we have the right index,
        // this should be the third lottery we create in this test file
        assert.equal(receipt.logs[0].args.index, 2)

        await contract.participate(2, {from: accounts[0], value: gwei1});
        await contract.participate(2, {from: accounts[1], value: gwei2});
      });

      it('should update addresses', async () => {
        const lottery = await contract.get_lottery(2);

        assert.equal(lottery.addrs[0], accounts[0]);
        assert.equal(lottery.addrs[1], accounts[1]);
      });

      it('should update amounts', async () => {
        const lottery = await contract.get_lottery(2);

        assert.equal(lottery.amounts[0], gwei1);
        assert.equal(lottery.amounts[1], gwei2);
      });
    });

    it('Participating should fail with an incorrect index', async() => {
      let err = null;
      try {
        await contract.participate(100, {from: accounts[0], value: gwei1})
      }
      catch (error){
        err = error;
      }
      assert.ok(err instanceof Error)
    });

    it('Participating should fail with an incorrect value', async() => {
      let err = null;
      try {
        // Lottery at index 1 only takes 2 gwei with 1 gwei of tolerance but we send 2 ethers
        await contract.participate(1, {from: accounts[0], value: eth2})
      }
      catch (error){
        err = error;
      }
      assert.ok(err instanceof Error)
    });

    it('Participating should not be possible after the block duration has expired', async() => {
      // After 50 blocks the lottery at index 0 should be closed
      // Note that other tests mine blocks each time they emit a transaction.
      await advanceNBlocks(20);

      try {
        await contract.participate(0, {from: accounts[0], value: gwei1})
      }
      catch (error){
        err = error;
      }
      assert.ok(err instanceof Error)
    });
  });

});
