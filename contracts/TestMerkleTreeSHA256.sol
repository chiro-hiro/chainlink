// SPDX-License-Identifier: MIT
pragma solidity >=0.7.5 <0.8.0;

import "./MerkleTreeSHA256.sol";

contract TestMerkleTreeSHA256 is MerkleTreeSHA256 {

    constructor() MerkleTreeSHA256(4) {

    }

    function appendOne(bytes32 digest) external returns (bytes32) {
        return insertLeaf(digest);
    }

    function appendMultiply(bytes32[] memory digests) external returns (bytes32) {
        return insertLeaves(digests);
    }
}
