var EventToken = artifacts.require("./EventToken.sol");

const tokenCode = "B4L";
const tokenFullName = "Bi4Lab";
const initialSupply = "100000";
const decimals = "0";
const expiryDate = Date.now() / 100 + 60 * 5;

module.exports = function(deployer) {
  deployer.deploy(
    EventToken,
    initialSupply,
    tokenFullName,
    tokenCode,
    decimals,
    expiryDate
  );
};
