import { ethers } from "ethers";
import WROSE from "./wrose";
import * as sapphire from "@oasisprotocol/sapphire-paratime";

const signer = sapphire.wrap(new ethers.Wallet("91d68008cc5323be3a777a568e78d5b2d043e76961fc892ff6353c56aacba145").connect(ethers.getDefaultProvider(sapphire.NETWORKS.testnet.defaultGateway)));
const muleWose = new WROSE(signer);

export default async function getBalanceOfWrose(wrose: WROSE) {
  const address = await wrose.signerAddress();
  const balanceOf = await muleWose.balanceOf(address);
  return Math.round(Number(balanceOf) * 10000) / 10000;
}
