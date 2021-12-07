const Loterie = artifacts.require("Loterie");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Loterie", function (/* accounts */) {
  it("should assert true", async function () {
    await Loterie.deployed();
    return assert.isTrue(true);
  });
});
