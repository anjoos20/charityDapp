const Migration = artifacts.require("Funding");


module.exports = function (deployer) {
  deployer.deploy(Migration);
};
