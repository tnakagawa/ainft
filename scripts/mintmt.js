const hre = require("hardhat");
const AiMt1 = require("../artifacts/contracts/AiMt1.sol/AiMt1.json");

const AIMT1_CONTRACT_ADDRESS = "0xb9d86b5159a81ba139A4C830890A796cBc87f8D6";
const GAS_STAION_URL = "https://gasstation.polygon.technology/v2";

async function main() {
    const accounts = await hre.ethers.getSigners();
    const signer = accounts[0];
    let aiMt1 = new ethers.Contract(AIMT1_CONTRACT_ADDRESS, AiMt1.abi, signer);
    for (let i = 1; i <= 4; i++) {
        let gas = await (await fetch(GAS_STAION_URL)).json();
        let url = "https://tnakagawa.github.io/ainft/mt1/tokyotower" + i + ".json"
        let tx = await aiMt1.mint(signer.address, i, url, {
            maxFeePerGas: hre.ethers.parseUnits(gas.fast.maxFee.toFixed(9), "gwei"),
            maxPriorityFeePerGas: hre.ethers.parseUnits(gas.fast.maxPriorityFee.toFixed(9), "gwei"),
        });
        let receipt = await tx.wait();
        console.log(receipt.status);
    }
}

main().then(() => {
    process.exit(0);
}).catch((error) => {
    console.error(error);
    process.exit(1);
});