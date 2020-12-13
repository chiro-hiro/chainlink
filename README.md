## Overview

I've look on [MerkleTreeSHA256.sol](https://github.com/ethereum-oasis/baseline/blob/master/core/contracts/contracts/privacy/lib/MerkleTreeSHA256.sol). This one is an expensive smart contract to operate, so it motivated me to think in another direction.

### Reference

- [MerkleTreeSHA256.sol](https://github.com/ethereum-oasis/baseline/blob/master/core/contracts/contracts/privacy/lib/MerkleTreeSHA256.sol)

### Questions

- If compute/verify proof off-chain cost less than compute it on-chain, why don't we make it easier for on-chain computation?
- Is Merkle tree is the only way to archive that?.

### Assumptions

- Actually we only need to store an immutable `digest` to make sure no one able to change the proof and tracking all state changes.
- Merkle tree is not the only way to resolve this issue

### Suggestion

Assume that we have:
- Hash function **H()**
- Byte array concat operator **++**
- Digests need to be used to construct proof: **A,B,C** (unsorted)

We have: `root := H(root, A)`

If `0x00...000` is the first root, we have:

`0x00...00 <- H(0x00...00 ++ A) <- H(H(0x00...00 ++ A) ++ B) <- H(H(H(0x00...00 ++ A) ++ B) ++ C) ...`

These created a immutable chain of digests that only allow us to append to the end of the chain.

### Conclusion

- What does it cost?
- O(n)
