// SPDX-License-Identifier: MIT
pragma solidity >=0.7.5 <0.8.0;

import "./ChainLinkSha256.sol";

contract TestChainLinkSha256 is ChainLinkSha256 {
    function appendOne(bytes32 digest) external returns (bytes32) {
        return appendDigest(digest);
    }

    function appendMultiple(bytes32[] memory digests) external returns (bytes32) {
        return appendDigests(digests);
    }
}
