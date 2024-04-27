require("@nomicfoundation/hardhat-toolbox");
const { vars } = require("hardhat/config");

const ALCHEMY_POLYGON_API_KEY = vars.get("ALCHEMY_POLYGON_API_KEY");
const MNEMONIC = vars.get("MNEMONIC");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    polygon: {
      url: `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_POLYGON_API_KEY}`,
      accounts: {
        mnemonic: `${MNEMONIC}`,
        count: 5,
      },
    },
  },
};

task("balance", "Prints an account's balance")
  .setAction(async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();
    for (const account of accounts) {
      const balance = await hre.ethers.provider.getBalance(account.address);
      console.log(account.address, hre.ethers.formatEther(balance));
    }
  });
