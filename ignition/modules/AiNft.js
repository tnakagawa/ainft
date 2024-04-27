const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("AiNftModule", (m) => {
  const aiNft1 = m.contract("AiNft1");
  const aiNft2 = m.contract("AiNft2");

  return { aiNft1, aiNft2 };
});
