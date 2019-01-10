const ethers = require("ethers");
const inquirer = require("inquirer");
const fs = require("fs");

const newEventHandler = require("./newEventHandler");

const mainChoices = ["Start new event", "Manage existing"];

const main = async () => {
  const configs = JSON.parse(fs.readFileSync("./configs.json"));
  const provider = new ethers.providers.JsonRpcProvider(configs.provider);
  const wallet = new ethers.Wallet(configs.privateKey, provider);

  const answer = await inquirer.prompt([
    {
      name: "name",
      type: "list",
      message: "Select an action",
      choices: mainChoices
    }
  ]);

  if (answer.name === mainChoices[0]) {
    await newEventHandler(wallet);
  }
};

main();
