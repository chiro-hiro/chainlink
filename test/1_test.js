const TestChainLinkSha256 = artifacts.require("TestChainLinkSha256");
const TestChainLinkKeccak256 = artifacts.require("TestChainLinkKeccak256");
const keccak = require("keccak");
const assert = require("assert").strict;
const crypto = require("crypto");

var bufSha256 = [Buffer.alloc(32)];
var bufKeccak256 = [Buffer.alloc(32)];

var instanceChainLinkSha256, testChainLinkKeccak256;

function sha256(...params) {
  const h = crypto.createHash("sha256");
  for (let i = 0; i < params.length; i++) {
    h.update(params[i]);
  }
  return h.digest();
}

function keccak256(...params) {
  const h = keccak("keccak256");
  for (let i = 0; i < params.length; i++) {
    h.update(params[i]);
  }
  return h.digest();
}

function hashOfBufSha256(buffers) {
  let tmp = buffers[0];
  for (let i = 1; i < buffers.length; i += 1) {
    tmp = sha256(tmp, buffers[i]);
  }
  return tmp;
}

function hashOfBufKeccak256(buffers) {
  let tmp = buffers[0];
  for (let i = 1; i < buffers.length; i += 1) {
    tmp = keccak256(tmp, buffers[i]);
  }
  return tmp;
}

contract("TestChainLinkSha256", async () => {
  it("TestChainLinkSha256 should be deployed correctly", async () => {
    instanceChainLinkSha256 = await TestChainLinkSha256.deployed();
  });

  it("Root should be calculated right", async () => {
    let value = crypto.randomBytes(32);
    bufSha256.push(value);
    await instanceChainLinkSha256.appendOne(value);
    assert.strictEqual(await instanceChainLinkSha256.chainRoot(), `0x${hashOfBufSha256(bufSha256).toString("hex")}`);
  });

  it("Should able to append 10 digests", async () => {
    let tmp = [];
    for (let i = 0; i < 10; i += 1) {
      let value = crypto.randomBytes(32);
      tmp.push(value);
    }
    bufSha256 = [...bufSha256, ...tmp];
    await instanceChainLinkSha256.appendMultiple(tmp);
    assert.strictEqual(await instanceChainLinkSha256.chainRoot(), `0x${hashOfBufSha256(bufSha256).toString("hex")}`);
  });
});

contract("TestChainLinkKeccak256", async () => {
  it("TestChainLinkKeccak256 should be deployed correctly", async () => {
    testChainLinkKeccak256 = await TestChainLinkKeccak256.deployed();
  });

  it("Root should be calculated right", async () => {
    let value = crypto.randomBytes(32);
    bufKeccak256.push(value);
    await testChainLinkKeccak256.appendOne(value);
    assert.strictEqual(
      await testChainLinkKeccak256.chainRoot(),
      `0x${hashOfBufKeccak256(bufKeccak256).toString("hex")}`,
    );
  });

  it("Should able to append 10 digests", async () => {
    let tmp = [];
    for (let i = 0; i < 10; i += 1) {
      let value = crypto.randomBytes(32);
      tmp.push(value);
    }
    bufKeccak256 = [...bufKeccak256, ...tmp];
    await testChainLinkKeccak256.appendMultiple(tmp);
    assert.strictEqual(
      await testChainLinkKeccak256.chainRoot(),
      `0x${hashOfBufKeccak256(bufKeccak256).toString("hex")}`,
    );
  });
});
