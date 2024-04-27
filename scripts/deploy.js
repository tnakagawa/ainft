const hre = require("hardhat");
const AiNft1 = require("../artifacts/contracts/AiNft1.sol/AiNft1.json");
const AiNft2 = require("../artifacts/contracts/AiNft2.sol/AiNft2.json");

async function main() {
    const accounts = await hre.ethers.getSigners();
    const url = "https://gasstation.polygon.technology/v2";
    let gas = await (await fetch(url)).json();
    const signer = accounts[0];
    let factory = new ethers.ContractFactory(AiNft1.abi, AiNft1.bytecode, signer);
    let contract = await factory.deploy({
        maxFeePerGas: hre.ethers.parseUnits(gas.fast.maxFee.toFixed(9), "gwei"),
        maxPriorityFeePerGas: hre.ethers.parseUnits(gas.fast.maxPriorityFee.toFixed(9), "gwei"),
    });
    await contract.waitForDeployment();
    console.log("AiNft1", contract.target);

    gas = await (await fetch(url)).json();
    factory = new ethers.ContractFactory(AiNft2.abi, AiNft2.bytecode, signer);
    contract = await factory.deploy({
        maxFeePerGas: hre.ethers.parseUnits(gas.fast.maxFee.toFixed(9), "gwei"),
        maxPriorityFeePerGas: hre.ethers.parseUnits(gas.fast.maxPriorityFee.toFixed(9), "gwei"),
    });
    await contract.waitForDeployment();
    console.log("AiNft2", contract.target);
}

main().then(() => {
    process.exit(0);
}).catch((error) => {
    console.error(error);
    process.exit(1);
});