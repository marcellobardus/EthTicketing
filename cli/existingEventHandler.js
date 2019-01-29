const inquirer = require("inquirer");
const axios = require("axios");
const ethers = require("ethers");
const fs = require("fs");
const BigNumber = require("bignumber.js");

module.exports = async wallet => {
  events = JSON.parse(fs.readFileSync("./configs.json")).events;
  eventNames = [];
  for (var i = 0; i < events.length; i++) {
    eventNames.push(events[i].name);
  }

  const answer = await inquirer.prompt([
    {
      name: "name",
      type: "list",
      message: "Select an event to manage",
      choices: eventNames
    }
  ]);

  const eventId = eventNames.indexOf(answer.name);
  const contractAddress = events[eventId].contractAddress;

  const choices = ["Withdraw funds", "Update price"];

  const action = await inquirer.prompt([
    {
      name: "action",
      type: "list",
      message: "Select action",
      choices: choices
    }
  ]);

  const abi = JSON.parse(fs.readFileSync("./contract.json")).abi;

  const contract = new ethers.Contract(contractAddress, abi, wallet);

  if (action.action === choices[1]) {
    const newEurPrice = await inquirer.prompt([
      {
        message: "What is the new token price?",
        type: "input",
        name: "price"
      }
    ]);

    const res = await axios.get(
      "https://bitbay.net/API/Public/ETHEUR/ticker.json"
    );

    const ethEur = res.data.last;

    const tokenWeiPrice = new BigNumber(
      Math.floor((newEurPrice.price / ethEur) * Math.pow(10, 18))
    ).toFixed();

    const txReceipt = await contract.updatePrice(tokenWeiPrice);
    const configs = await JSON.parse(fs.readFileSync("./configs.json"));
    configs.events[eventId].ticketPriceEth = tokenWeiPrice / Math.pow(10, 18);
    fs.writeFileSync("./configs.json", JSON.stringify(configs));
    console.log("Success txReceipt: ", txReceipt);
  } else {
    const txReceipt = await contract.withdraw();

    console.log("Success txReceipt: ", txReceipt);
  }
};
