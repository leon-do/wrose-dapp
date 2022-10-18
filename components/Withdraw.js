import React, { useState } from "react";

export default function Withdraw({ wrose }) {
  const [amount, setAmount] = useState("0.1");

  async function withdraw() {
    const txHash = await wrose.withdraw(amount);
    console.log(txHash);
  }

  return (
    <>
      <div>
        <input value={amount} onChange={(e) => setAmount(e.target.value)} />
        <button onClick={withdraw}>Withdraw</button>
      </div>
    </>
  );
}
