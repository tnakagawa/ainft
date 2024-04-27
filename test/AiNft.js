const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const AiNftModule = require("../ignition/modules/AiNft");
const { ignition } = require("hardhat");

describe("AiNft", function () {
    async function deployloadFixture() {
        const [deployer, user1] = await ethers.getSigners();
        const { aiNft1, aiNft2 } = await ignition.deploy(AiNftModule);
        return { aiNft1, aiNft2, deployer, user1 };
    }

    describe("Deployment", function () {
        it("Deploy", async function () {
            const { aiNft1, aiNft2, deployer, user1 } = await loadFixture(deployloadFixture);
            expect(await aiNft1.name()).equal("Ai Nft 1");
            expect(await aiNft1.symbol()).equal("ANT");
            expect(await aiNft2.name()).equal("Ai Nft 2");
            expect(await aiNft2.symbol()).equal("ANT");
        });
    });
});
