const Migrations = artifacts.require("Migrations");
module.exports = function(deployer) {
  deployer.deploy(Migrations);
};

const Loterie = artifacts.require("Loterie");
module.exports = function(deployer){
  deployer.deploy(Loterie);
}
