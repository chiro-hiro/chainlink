## Overview

I've look on [MerkleTreeSHA256.sol](https://github.com/chiro-hiro/chainlink/blob/main/contracts/MerkleTreeSHA256.sol). This one is an expensive smart contract to be operated. It motivated me to think in another direction.

### Questions & Answers

1. **If compute/verify proof off-chain cost less than compute it on-chain, why don't we make computation easier for on-chain?**

    - Apparently off-chain computation is munch more cheaper even for worser algorithm.
    - It's possible to reduce cost for on-chain computation by using simpler algorithm.

2. **What does it cost calculate/verify Merkle Tree**

    - To calculate a Merkle tree with leaf is: `n` we need to calculate `O(n)` to verify it's `O(log⁡2(n))` but for *MerkleTreeSHA256* we are only store right-most 'frontier' then we had received no benefit.

3. **Is Merkle tree is the only way to archive that?.**

    - No, we could use [Hash Chain](https://en.wikipedia.org/wiki/Hash_chain), it's even giving better result

### Proposal

**Denote that:**

- **H(x)**: Hash function of `x`
- **++**: Byte array concat operator
- **A,B,C**: Digests need to be used to construct proof (unsorted)

We have: `root := H(root, A)`

If `0x00...000` is the first root, we have:

`0x00...00 <- H(0x00...00 ++ A) <- H(H(0x00...00 ++ A) ++ B) <- H(H(H(0x00...00 ++ A) ++ B) ++ C) ...`

![Hash Chain](https://raw.githubusercontent.com/chiro-hiro/chainlink/main/content/hash-chain.jpg)

These created a immutable chain of digests that only allow us to append to the end of the chain.

### Benchmark result

| Contract           |  Append One | Append 15 Digests |
|--------------------|------------:|------------------:|
| [MerkleTreeSHA256](https://github.com/chiro-hiro/chainlink/blob/main/contracts/MerkleTreeSHA256.sol)   | 103,909 Gas |       263,415 Gas |
| [ChainLinkSha256](https://github.com/chiro-hiro/chainlink/blob/main/contracts/ChainLinkSha256.sol)    |  69,314 Gas |        98,345 Gas |
| [ChainLinkKeccak256](https://github.com/chiro-hiro/chainlink/blob/main/contracts/ChainLinkKeccak256.sol) |  42,335 Gas |        79,619 Gas |

### Conclusion

- What did it cost?
- O(n)

# License

This project licensed under [MIT License](https://github.com/chiro-hiro/chainlink/blob/main/LICENSE)