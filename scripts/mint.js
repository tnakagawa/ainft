const hre = require("hardhat");
const AiNft1 = require("../artifacts/contracts/AiNft1.sol/AiNft1.json");
const AiNft2 = require("../artifacts/contracts/AiNft2.sol/AiNft2.json");

const AINFT1_CONTRACT_ADDRESS = "0x78F07453B9DC2B72dc3344A37e649C05F44Ed37A";
const AINFT2_CONTRACT_ADDRESS = "0x0889d277177cf5201b92059014bCC39d54633a70";
const GAS_STAION_URL = "https://gasstation.polygon.technology/v2";

async function main() {
    const accounts = await hre.ethers.getSigners();
    const signer = accounts[0];
    let aiNft1 = new ethers.Contract(AINFT1_CONTRACT_ADDRESS, AiNft1.abi, signer);
    let aiNft2 = new ethers.Contract(AINFT2_CONTRACT_ADDRESS, AiNft2.abi, signer);
    for (let i = 2; i <= 4; i++) {
        let gas = await (await fetch(GAS_STAION_URL)).json();
        let url = "https://tnakagawa.github.io/ainft/nft1/fuji" + i + ".json"
        let tx = await aiNft1.mint(signer.address, url, {
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