// SPDX-License-Identifier: MIT
pragma solidity <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AiNft2 is ERC721URIStorage, Ownable {
    uint256 private counter;

    constructor() ERC721("Ai Nft 2", "ANT") Ownable(msg.sender) {}

    function mint(address account, string memory _tokenURI) public onlyOwner {
        counter++;
        _mint(account, counter);
        _setTokenURI(counter, _tokenURI);
    }

    function setTokenURI(
        uint256 tokenId,
        string memory _tokenURI
    ) public onlyOwner {
        _setTokenURI(tokenId, _tokenURI);
    }
}
