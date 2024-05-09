const hre = require("hardhat");
const AiMt1 = require("../artifacts/contracts/AiMt1.sol/AiMt1.json");

async function main() {
    const accounts = await hre.ethers.getSigners();
    const url = "https://gasstation.polygon.technology/v2";
    let gas = await (await fetch(url)).json();
    const signer = accounts[0];
    let factory = new ethers.ContractFactory(AiMt1.abi, AiMt1.bytecode, signer);
    let contract = await factory.deploy({
        maxFeePerGas: hre.ethers.parseUnits(gas.fast.maxFee.toFixed(9), "gwei"),
        maxPriorityFeePerGas: hre.ethers.parseUnits(gas.fast.maxPriorityFee.toFixed(9), "gwei"),
    });
    await contract.waitForDeployment();
    console.log("AiMt1", contract.target);
}

main().then(() => {
    process.exit(0);
}).catch((error) => {
    console.error(error);
    process.exit(1);
});