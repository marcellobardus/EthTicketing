//var TicketSale = artifacts.require("./TicketSale");

var EventToken = artifacts.require("./EventToken.sol");

const tokenCode = "TCK";
const tokenFullName = "TicketToken";
const initialSupply = "100";
const decimals = "0";
const expireAfterSeconds = 60 * 60 * 24 * 5;

const ticketTokenPrice = 800;
const ethEurCent = 10000;

module.exports = function(deployer) {
  //deployer.deploy(TicketSale, contractAddress, ticketTokenPrice, ethEurCent);

  deployer.deploy(
    EventToken,
    initialSupply,
    tokenFullName,
    tokenCode,
    decimals,
    expireAfterSeconds,
    "100",
    "10"
  );
};
