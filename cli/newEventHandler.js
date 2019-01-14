const inquirer = require("inquirer");
const axios = require("axios");
const ethers = require("ethers");
const fs = require("fs");
const BigNumber = require("bignumber.js");

module.exports = async wallet => {
  const answers = await inquirer.prompt([
    {
      message: "What is the event name?",
      type: "input",
      name: "eventName"
    },
    {
      message: "What is the event token symbol?",
      type: "input",
      name: "symbol"
    },
    {
      message: "What is the event tickets max supply",
      type: "input",
      name: "maxSupply"
    },
    {
      message: "What is the expiration date",
      type: "input",
      name: "expirationDate"
    },
    {
      message: "What is the ticket price",
      type: "input",
      name: "priceEur"
    }
  ]);

  const contractData = JSON.parse(fs.readFileSync("./contract.json"));
  const abi = contractData.abi;
  const bytecode = contractData.bytecode;

  const factory = new ethers.ContractFactory(abi, bytecode, wallet);

  const res = await axios.get(
    "https://bitbay.net/API/Public/ETHEUR/ticker.json"
  );

  const ethEur = res.data.last;
  const expireAfter = Math.floor(
    (new Date(answers.expirationDate).getTime() - Date.now()) / 1000
  );

  const tokenWeiPrice = new BigNumber(
    Math.floor((answers.priceEur / ethEur) * Math.pow(10, 18))
  ).toFixed();

  console.log({
    name: answers.maxSupply,
    symbol: answers.symbol,
    supply: answers.maxSupply,
    expireAfter,
    price: tokenWeiPrice
  });

  const contract = await factory.deploy(
    answers.maxSupply,
    answers.eventName,
    answers.symbol,
    0,
    expireAfter,
    tokenWeiPrice
  );

  const configs = await JSON.parse(fs.readFileSync("./configs.json"));

  const event = {
    contractAddress: contract.address,
    ticketPriceEth: tokenWeiPrice / Math.pow(10, 18),
    expirationDate: answers.expirationDate,
    supply: answers.maxSupply,
    name: answers.eventName,
    symbol: answers.symbol
  };

  configs.events.push(event);

  fs.writeFileSync("./configs.json", JSON.stringify(configs));
};
