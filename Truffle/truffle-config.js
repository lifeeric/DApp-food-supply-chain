const path = require("path");
require("dotenv").config({ path: "../.env" });
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  contracts_build_directory: "../src/contracts",
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
      deploymentPollingInterval: 10,
    },
    sepolia: {
      provider: () => {
        let providerUrl = process.env.RPC_URL || process.env.INFURA_SEPOLIA_URL;

        if (!providerUrl) {
          throw new Error("Missing RPC_URL or INFURA_SEPOLIA_URL in .env");
        }

        // if (providerUrl.startsWith("wss://")) {
        //   providerUrl = providerUrl.replace("wss://", "https://");
        // }

        return new HDWalletProvider({
          privateKeys: [process.env.PRIVATE_KEY],
          providerOrUrl: providerUrl,
        });
      },
      network_id: 11155111,
      // maxFeePerGas: 3e9, // 3 gwei
      // maxPriorityFeePerGas: 1e9, // 1 gwei
      // gas: 5000000,
      // gasPrice: 2000000000, // 20 gwei
      confirmations: 1,
      timeoutBlocks: 500,
      skipDryRun: true,
      networkCheckTimeout: 10000000,
      deploymentPollingInterval: 35000,
      pollingInterval: 35000,
      disableConfirmationListener: true,
    },
    mumbai: {
      provider: () =>
        new HDWalletProvider({
          privateKeys: [process.env.PRIVATE_KEY],
          providerOrUrl: process.env.INFURA_MUMBAI_URL,
        }),
      network_id: 80001,
      deploymentPollingInterval: 10,
    },
  },
  compilers: {
    solc: {
      version: "0.8.1",
    },
  },
  //
  // Truffle DB is currently disabled by default; to enable it, change enabled:
  // false to enabled: true. The default storage location can also be
  // overridden by specifying the adapter settings, as shown in the commented code below.
  //
  // NOTE: It is not possible to migrate your contracts to truffle DB and you should
  // make a backup of your artifacts to a safe location before enabling this feature.
  //
  // After you backed up your artifacts you can utilize db by running migrate as follows:
  // $ truffle migrate --reset --compile-all
  //
  // db: {
  //   enabled: true,
  //   host: "127.0.0.1",
  //   adapter: {
  //     name: "sqlite",
  //     settings: {
  //       directory: ".db",
  //     },
  //   },
  // },
};
