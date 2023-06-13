import { ethers } from "ethers";
import WROSE from "./wrose";

/**
 * creates meta transaction
 * signs meta transaction
 * sends meta transaction to relayer
 */
export default async function metaSend(wrose: WROSE, amount: string, to: string) {
  // convert amount to wei
  const value = ethers.utils.parseEther(amount);
  // convert reward from value
  const reward = value.div(100);
  // fetch replay nonce
  const nonce = ethers.BigNumber.from(ethers.utils.randomBytes(32));

  // sign meta transaction
  const signature = await wrose.signMetaWithdraw(to, value.toString(), nonce.toString(), reward.toString());
  // POST to /api/relay
  const transaction = await fetch("/api/relay", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      signature,
      to,
      value: value.toString(),
      nonce: nonce.toString(),
      reward: reward.toString(),
    }),
  }).then((res) => res.json());
  return transaction;
}
