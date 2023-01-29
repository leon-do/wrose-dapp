import getReplayNonce from "./getReplayNonce";
import WROSE from "./wrose";

/**
 * creates meta transaction
 * signs meta transaction
 * sends meta transaction to relayer
 */
export default async function metaSend(wrose: WROSE, amount: string, to: string) {
  const reward = 0.01 * Number(amount);
  // get signer address
  const signerAddress = await wrose.signer.getAddress();
  // fetch replay nonce
  const nonce = await getReplayNonce(signerAddress);
  // create meta transaction
  const metaTransaction = await wrose.createMetaWithdraw(to, amount, nonce.response, reward.toString());
  // sign meta transaction
  const signature = await wrose.signMetaWithdraw(metaTransaction);
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
      nonce: nonce.response,
      reward,
    }),
  }).then((res) => res.json());
  return transaction;
}
