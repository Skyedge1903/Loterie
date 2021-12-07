const Loterie = artifacts.require("Loterie");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Loterie", accounts => {
  const owner = accounts[0];

  before('Setup contract', async () => {
      contract = await Loterie.deployed()
  });

  it('should have an owner', async () => {
    let current_owner = await contract.getOwner({ from: accounts[0] });
    assert.equal(current_owner, owner, "The owner isn't the person who deployed the contract");
  });
});
