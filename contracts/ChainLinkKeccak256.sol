// SPDX-License-Identifier: MIT
pragma solidity >=0.7.5 <0.8.0;

contract ChainLinkKeccak256 {
    event NewDigest(uint256 indexed linkedDigest, bytes32 indexed digest, bytes32 indexed root);
    event NewDigests(uint256 indexed linkedDigest, bytes32[] indexed digest, bytes32 indexed root);

    uint256 public totalLinked = 0;
    bytes32 public chainRoot = 0x0000000000000000000000000000000000000000000000000000000000000000;

    // Append digest to the end of chain of digests by calcualte
    // root := sha256(root ++ digest)
    function appendDigest(bytes32 digest) internal returns (bytes32) {
        chainRoot = keccak256(abi.encodePacked(chainRoot, digest));
        totalLinked += 1;
        emit NewDigest(totalLinked, digest, chainRoot);
        return chainRoot;
    }

    // Append digest to the chain one by one
    function appendDigests(bytes32[] memory digests) internal returns (bytes32) {
        bytes32 root = chainRoot;
        for (uint256 i = 0; i < digests.length; i += 1) {
            root = keccak256(abi.encodePacked(root, digests[i]));
        }
        chainRoot = root;
        totalLinked += digests.length;
        emit NewDigests(totalLinked, digests, root);
        return root;
    }
}
