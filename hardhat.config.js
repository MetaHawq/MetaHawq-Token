require("@nomiclabs/hardhat-waffle");
const dotenv = require("dotenv");
dotenv.config();

const secrets = require("./secrets.json");

module.exports = {
	networks: {
		//mumbai: {
		//	url: process.env.URL,
		//	accounts: [process.env.ACCOUNT],
		//},
		mumbai: {
			url: secrets.mumbainode,
			accounts: [secrets.privatekey],
		},
		mainnet: {
			url: secrets.mainnetnode,
			accounts: [secrets.privatekey],
		},
	},
	solidity: {
		version: "0.8.0",
	},
};
