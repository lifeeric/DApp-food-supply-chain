const JordanainDinarToken = artifacts.require("JordanainDinarToken");

module.exports = async function (callback) {
  try {
    const token = await JordanainDinarToken.deployed();
    const owner = (await web3.eth.getAccounts())[0]; // replace with explicit address if needed
    const recipient = "0xRecipientAddress";
    const amount = web3.utils.toWei("10000", "ether");

    const tx = await token.mint(recipient, amount, { from: owner });
    console.log("Minted:", amount, "to", recipient, "tx:", tx.tx);
  } catch (err) {
    console.error(err);
  }
  callback();
};
