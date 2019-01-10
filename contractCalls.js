const Web3 = require("web3");

const web3 = new Web3();

web3.setProvider(new web3.providers.HttpProvider("http://localhost:7545"));

const abi = [
  {
    inputs: [
      {
        name: "_ticketTokenAddress",
        type: "address"
      },
      {
        name: "_tokenPriceEuroCent",
        type: "uint256"
      },
      {
        name: "_ethEurCentRate",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
    signature: "constructor"
  },
  {
    payable: true,
    stateMutability: "payable",
    type: "fallback"
  },
  {
    constant: false,
    inputs: [
      {
        name: "_newRate",
        type: "uint256"
      }
    ],
    name: "updateEthEuroRate",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
    signature: "0x5c63b180"
  },
  {
    constant: false,
    inputs: [
      {
        name: "_newPrice",
        type: "uint256"
      }
    ],
    name: "changePrice",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
    signature: "0xa2b40d19"
  },
  {
    constant: false,
    inputs: [],
    name: "withdrawRaisedFunds",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
    signature: "0x5413713a"
  }
];

const contractInstance = new web3.eth.Contract(
  abi,
  "0xDF54fdb7E9619cA9fcb8929BeBdd09E31a91b38e"
);

async function main() {
  const accounts = await web3.eth.getAccounts();

  const txReceipt = await web3.eth.sendTransaction({
    from: accounts[0],
    to: "0x1a6bBC4F4759053A3EAc90ECF2b8458c26C6420f"
  });

  console.log(txReceipt);
}

main();
