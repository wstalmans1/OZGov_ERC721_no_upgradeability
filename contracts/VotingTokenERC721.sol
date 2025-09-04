// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.4.0
pragma solidity ^0.8.27;

import {EIP712} from "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721Votes} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Votes.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract VotingTokenERC721 is ERC721, Ownable, EIP712, ERC721Votes {
    constructor(address initialOwner)
        ERC721("VotingTokenERC721", "VTE")
        Ownable(initialOwner)
        EIP712("VotingTokenERC721", "1")
    {}

    function safeMint(address to, uint256 tokenId) public onlyOwner {
        _safeMint(to, tokenId);
    }

    // The following functions are overrides required by Solidity.

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Votes)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Votes)
    {
        super._increaseBalance(account, value);
    }
}
