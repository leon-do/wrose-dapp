import React, { useEffect, useState } from "react";

export default function Withdraw({ wrose }) {
  const [amount, setAmount] = useState("0.9");
  const [to, setTo] = useState("0xdA064B1Cef52e19caFF22ae2Cc1A4e8873B8bAB0");

  async function metaWithdraw() {
    if (amount < 0.5) return alert(`Minimum amount must be: 0.5 WROSE`);
    const maxWithdraw = await getMaxWithdraw();
    if (maxWithdraw < 0.5) return alert(`Maximum amount must be: 0.5 WROSE`);
    if (amount > maxWithdraw) return alert(`Maximum amount must be: ${maxWithdraw} WROSE`);
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

  async function getMaxWithdraw() {
    const address = await wrose.signerAddress();
    const balanceOf = await fetch("/api/balanceOf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address,
      }),
    }).then((res) => res.json());
    // account for the 1% fee
    return Math.floor(balanceOf.response * 0.99 * 100) / 100;
  }

  return (
    <>
      <div>
        <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" />
        <input value={to} onChange={(e) => setTo(e.target.value)} />
        <button onClick={metaWithdraw}>Meta Withdraw</button>
      </div>
    </>
  );
}
