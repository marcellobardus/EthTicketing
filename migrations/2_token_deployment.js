var Bi4LabToken = artifacts.require("./Bi4LabToken.sol");

const tokenCode = "B4L";
const tokenFullName = "Bi4Lab";
const initialSupply = "100000";
const decimals = "0";

module.exports = function(deployer) {
  deployer.deploy(
    Bi4LabToken,
    initialSupply,
    tokenFullName,
    tokenCode,
    decimals
  );
};
