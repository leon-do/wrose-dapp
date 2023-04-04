/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/send',
        permanent: true,
      },
    ]
  },
  env: {
    CHAIN_ID: process.env.CHAIN_ID,
    CHAIN_TOKEN: process.env.CHAIN_TOKEN,
    WROSE_NAME: process.env.WROSE_NAME,
    CHAIN_LABEL: process.env.CHAIN_LABEL,
    CHAIN_RPC_URL: process.env.CHAIN_RPC_URL,
    CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS,
    ABI: [
      {
        anonymous: false,
        inputs: [
          { indexed: true, internalType: "address", name: "src", type: "address" },
          { indexed: true, internalType: "address", name: "guy", type: "address" },
          { indexed: false, internalType: "uint256", name: "wad", type: "uint256" },
        ],
        name: "Approval",
        type: "event",
      },
      {
        constant: false,
        inputs: [
          { internalType: "address", name: "guy", type: "address" },
          { internalType: "uint256", name: "wad", type: "uint256" },
        ],
        name: "approve",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      { constant: false, inputs: [], name: "deposit", outputs: [], payable: true, stateMutability: "payable", type: "function" },
      {
        anonymous: false,
        inputs: [
          { indexed: true, internalType: "address", name: "dst", type: "address" },
          { indexed: false, internalType: "uint256", name: "wad", type: "uint256" },
        ],
        name: "Deposit",
        type: "event",
      },
      {
        constant: false,
        inputs: [
          { internalType: "bytes", name: "signature", type: "bytes" },
          { internalType: "address payable", name: "to", type: "address" },
          { internalType: "uint256", name: "wad", type: "uint256" },
          { internalType: "uint256", name: "nonce", type: "uint256" },
          { internalType: "uint256", name: "reward", type: "uint256" },
        ],
        name: "metaWithdraw",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          { internalType: "address", name: "dst", type: "address" },
          { internalType: "uint256", name: "wad", type: "uint256" },
        ],
        name: "transfer",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, internalType: "address", name: "src", type: "address" },
          { indexed: true, internalType: "address", name: "dst", type: "address" },
          { indexed: false, internalType: "uint256", name: "wad", type: "uint256" },
        ],
        name: "Transfer",
        type: "event",
      },
      {
        constant: false,
        inputs: [
          { internalType: "address", name: "src", type: "address" },
          { internalType: "address", name: "dst", type: "address" },
          { internalType: "uint256", name: "wad", type: "uint256" },
        ],
        name: "transferFrom",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, internalType: "address", name: "src", type: "address" },
          { indexed: false, internalType: "uint256", name: "wad", type: "uint256" },
        ],
        name: "Withdrawal",
        type: "event",
      },
      { payable: true, stateMutability: "payable", type: "fallback" },
      { constant: false, inputs: [{ internalType: "uint256", name: "wad", type: "uint256" }], name: "withdraw", outputs: [], payable: false, stateMutability: "nonpayable", type: "function" },
      {
        constant: true,
        inputs: [
          { internalType: "address", name: "", type: "address" },
          { internalType: "address", name: "", type: "address" },
        ],
        name: "allowance",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      { constant: true, inputs: [{ internalType: "address", name: "", type: "address" }], name: "balanceOf", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], payable: false, stateMutability: "view", type: "function" },
      { constant: true, inputs: [], name: "decimals", outputs: [{ internalType: "uint8", name: "", type: "uint8" }], payable: false, stateMutability: "view", type: "function" },
      {
        constant: true,
        inputs: [
          { internalType: "bytes32", name: "_hash", type: "bytes32" },
          { internalType: "bytes", name: "_signature", type: "bytes" },
        ],
        name: "getSigner",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "wad", type: "uint256" },
          { internalType: "uint256", name: "nonce", type: "uint256" },
          { internalType: "uint256", name: "reward", type: "uint256" },
        ],
        name: "metaWithdrawHash",
        outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      { constant: true, inputs: [], name: "name", outputs: [{ internalType: "string", name: "", type: "string" }], payable: false, stateMutability: "view", type: "function" },
      { constant: true, inputs: [{ internalType: "address", name: "", type: "address" }], name: "replayNonce", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], payable: false, stateMutability: "view", type: "function" },
      { constant: true, inputs: [], name: "symbol", outputs: [{ internalType: "string", name: "", type: "string" }], payable: false, stateMutability: "view", type: "function" },
      { constant: true, inputs: [], name: "totalSupply", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], payable: false, stateMutability: "view", type: "function" },
    ],
  },
};

module.exports = nextConfig;
