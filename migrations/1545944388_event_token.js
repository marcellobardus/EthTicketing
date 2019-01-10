//var TicketSale = artifacts.require("./TicketSale");

var EventToken = artifacts.require("./EventToken.sol");

const symbol = "TCK";
const name = "TicketToken";
const maxSupply = "100";
const decimals = "0";
const expireAfterSeconds = 60 * 60 * 24 * 5;

const tokenWeiPrice = 1000000;

module.exports = function(deployer) {
  //deployer.deploy(TicketSale, contractAddress, ticketTokenPrice, ethEurCent);

  deployer.deploy(
    EventToken,
    maxSupply,
    name,
    symbol,
    decimals,
    expireAfterSeconds,
    tokenWeiPrice
  );
};
