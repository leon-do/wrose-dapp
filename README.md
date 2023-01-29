# WROSE on Sapphire

![](https://user-images.githubusercontent.com/19412160/202523845-271275d0-1e58-40c4-b3ef-3c944bc97c1b.png)

## Getting Started

Install

```bash
yarn
```

First, run the development server:

```bash
yarn dev
```

Update .env.local file

`vi .env.local`

Testnet Environment Variables

```
RELAY_PRIVATE_KEY=91d68008cc5323be3a777a568e78d5b2d043e76961fc892ff6353c56aacba145
CHAIN_ID=0x5AFF
CHAIN_TOKEN=tROSE
WROSE_NAME=tWROSE
CHAIN_LABEL=Oasis Sapphire Testnet
CHAIN_RPC_URL=https://testnet.sapphire.oasis.dev
CONTRACT_ADDRESS=0xC6C6A205ec3031E0C61ce2d0bd4A415C5509C1C0
```

Mainnet Environment Variables

```
RELAY_PRIVATE_KEY=91d68008cc5323be3a777a568e78d5b2d043e76961fc892ff6353c56aacba145
CHAIN_ID=0x5afe
CHAIN_TOKEN=ROSE
WROSE_NAME=WROSE
CHAIN_LABEL=Oasis Sapphire
CHAIN_RPC_URL=https://sapphire.oasis.io
CONTRACT_ADDRESS=
```

## Technical Docs

```javascript
// use provider from browser wallet
import web3Onboard from "../src/web3Onboard";

// get signer from browser wallet
const signer = await web3Onboard();
// init signer to wrose class
const wrose = new WROSE(signer));

// get signer aka wallet address
const signerAddress = await wrose.signerAddress();

// get WROSE balance
const balanceOf = await wrose.balanceOf();

// wrap 123 ROSE to get 123 WROSE
const txHash = await wrose.wrap(123)

// unwrap 123 WROSE to get 123 ROSE
const txHash = await wrose.unwrap(123)
```
