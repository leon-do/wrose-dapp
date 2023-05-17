import { ethers } from "ethers";
import WROSE from "./wrose";

/**
 * creates meta transaction
 * signs meta transaction
 * sends meta transaction to relayer
 */
export default async function metaSend(wrose: WROSE, amount: string, to: string) {
  const reward = 0.01 * Number(amount);
  // fetch replay nonce
  const nonce = ethers.BigNumber.from(ethers.utils.randomBytes(32)).toString();
  // sign meta transaction
  const signature = await wrose.signMetaWithdraw(to, amount, nonce, reward.toString());
  // POST to /api/relay
  const transaction = await fetch("/api/relay", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      signature,
      to,
      amount: Number(amount),
      nonce,
      reward,
    }),
  }).then((res) => res.json());
  return transaction;
}
