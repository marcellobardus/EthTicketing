const infuraApiKey =
  "9defdc016d654060a6d372cbe5b2de0c9defdc016d654060a6d372cbe5b2de0c";

var HDWalletProvider = require("truffle-hdwallet-provider");
const MNEMONIC = require("./MNEMONIC");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    ganache: {
      host: "localhost",
      port: 7545,
      network_id: "*"
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(
          MNEMONIC,
          "https://ropsten.infura.io/" + infuraApiKey
        );
      },
      network_id: 3
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  compilers: {
    solc: {
      version: "0.4.25"
    }
  }
};
