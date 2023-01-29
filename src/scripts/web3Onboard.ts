import Onboard from "@web3-onboard/core";
import injectedModule from "@web3-onboard/injected-wallets";
import { ethers } from "ethers";
import * as sapphire from "@oasisprotocol/sapphire-paratime";

export default async function web3Onboard() {
  const injected = injectedModule();
  const onboard = Onboard({
    wallets: [injected],
    chains: [
      {
        id: process.env.CHAIN_ID as string, // "0x5AFF",
        token: process.env.CHAIN_TOKEN as string, // "tROSE",
        label: process.env.CHAIN_LABEL as string, // "Oasis Sapphire Testnet",
        rpcUrl: process.env.CHAIN_RPC_URL as string, // "https://testnet.emerald.oasis.dev",
      },
    ],
  });
  const wallets = await onboard.connectWallet();
  if (wallets[0]) {
    const signer = new ethers.providers.Web3Provider(sapphire.wrap(wallets[0].provider)).getSigner();
    return signer;
  }
  return null;
}
