const Migrations = artifacts.require("DeCourse");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
