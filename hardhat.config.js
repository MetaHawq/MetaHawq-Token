require("@nomiclabs/hardhat-waffle");

const secrets = require("./secrets.json")

 module.exports = {
  networks: {
    mumbai: {
      url: secrets.mumbainode,
      accounts: [secrets.privatekey]
    },
    mainnet: {
      url: secrets.mainnetnode,
      accounts: [secrets.privatekey]
    },
  },
  solidity: {
    version: "0.8.0",
  },
}