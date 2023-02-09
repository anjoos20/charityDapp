const Migration = artifacts.require("Funding");

module.exports = function(deployer) {
  // Use deployer to state migration tasks.
  deployer.deploy(Migration);
};