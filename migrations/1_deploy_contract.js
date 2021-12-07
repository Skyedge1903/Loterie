const Migrations = artifacts.require("Migrations");
module.exports = function(deployer) {
  deployer.deploy(Migrations);
};

var Ownable = artifacts.require("Ownable");
module.exports = function(deployer){
    deployer.deploy(Ownable)
}

const Loterie = artifacts.require("Loterie");
module.exports = function(deployer){
  deployer.deploy(Loterie);
}
