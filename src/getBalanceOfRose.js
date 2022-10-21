import { ethers } from "ethers";

export default async function getBalanceOfRose(wrose) {
  const wei = await wrose.signer.getBalance();
  const balanceOf = ethers.utils.formatEther(wei);
  return Math.round(balanceOf * 10000) / 10000;
}
