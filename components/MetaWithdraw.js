import React, { useState } from "react";

export default function Withdraw({ wrose }) {
  const [amount, setAmount] = useState("0.09");
  const [to, setTo] = useState("0xdA064B1Cef52e19caFF22ae2Cc1A4e8873B8bAB0");

  async function metaWithdraw() {
    const reward = 0.01 * amount;
    // fetch replay nonce
    const nonce = await fetch("/api/replayNonce", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address: await wrose.signer.getAddress() }),
    }).then((res) => res.json());
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
    console.log(transaction);
  }

  return (
    <>
      <div>
        <input value={amount} onChange={(e) => setAmount(e.target.value)} />
        <input value={to} onChange={(e) => setTo(e.target.value)} />
        <button onClick={metaWithdraw}>Meta Withdraw</button>
      </div>
    </>
  );
}
