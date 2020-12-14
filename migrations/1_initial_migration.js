const Migrations = artifacts.require("Migrations");
const TestChainLinkSha256 = artifacts.require("TestChainLinkSha256");
const TestChainLinkKeccak256 = artifacts.require("TestChainLinkKeccak256");
const TestMerkleTreeSHA256 = artifacts.require("TestMerkleTreeSHA256");


module.exports = function (deployer) {
  deployer
    .deploy(Migrations)
    .then(() => {
      return deployer.deploy(TestChainLinkSha256);
    })
    .then(() => {
      return deployer.deploy(TestChainLinkKeccak256);
    })
    .then(() => {
      return deployer.deploy(TestMerkleTreeSHA256);
    });
};
