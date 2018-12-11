var EventToken = artifacts.require("./EventToken.sol");

const tokenCode = "TCK";
const tokenFullName = "TicketToken";
const initialSupply = "100";
const decimals = "0";
const expireAfterSeconds = 60 * 2;

module.exports = function(deployer) {
  deployer.deploy(
    EventToken,
    initialSupply,
    tokenFullName,
    tokenCode,
    decimals,
    expireAfterSeconds
  );
};
