import { ethers } from "ethers";
import WROSE from "./wrose";

export default async function getBalanceOfRose(wrose: WROSE) {
  const wei = await wrose.signer.getBalance();
  const balanceOf = ethers.utils.formatEther(wei);
  return Math.round(Number(balanceOf) * 10000) / 10000;
}
