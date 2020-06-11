// SPDX-License-Identifier: MIT

pragma solidity ^0.6.8;

import "../../staking/NftStaking.sol";

contract NftStakingMock is NftStaking {

    mapping(uint256 => uint64) public weightByTokenAttribute;

    constructor(
        uint32 cycleLengthInSeconds_,
        uint16 periodLengthInCycles_,
        uint16 freezeLengthInCycles_,
        address whitelistedNftContract_,
        address rewardsToken_,
        uint256[] memory tokenAttribute,
        uint64[] memory weights
    ) NftStaking(
        cycleLengthInSeconds_,
        periodLengthInCycles_,
        freezeLengthInCycles_,
        whitelistedNftContract_,
        rewardsToken_
    ) public {
        require(tokenAttribute.length == weights.length, "NftStakingMock: inconsistent array lenghts");
        for (uint256 i = 0; i < tokenAttribute.length; ++i) {
            weightByTokenAttribute[tokenAttribute[i]] = weights[i];
        }
    }

    function _validateAndGetWeight(uint256 nftId) internal virtual override view returns (uint64) {
        uint256 tokenType = (nftId & (0xFF << 240)) >> 240;
        require(tokenType == 1, "NftStakingMock: Wrong NFT type");
        uint256 attributeValue = (nftId & (0xFF << 176)) >> 176;
        return weightByTokenAttribute[attributeValue];
    }
}
