const Loterie2 = artifacts.require("Loterie2");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Loterie2", function (/* accounts */) {
  it("should assert true", async function () {
    await Loterie2.deployed();
    return assert.isTrue(true);
  });
});
