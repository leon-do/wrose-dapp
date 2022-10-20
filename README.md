# WROSE on Sapphire

## Getting Started

Install

```bash
yarn
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

To enable relay

```bash
vi .env.local

RELAY_PRIVATE_KEY=123abcprivatekey
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
