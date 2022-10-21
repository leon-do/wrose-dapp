import React, { useState } from "react";

export default function Wrap({ wrose }) {
  const [amount, setAmount] = useState("1");

  async function wrap() {
    const txHash = await wrose.wrap(amount);
    console.log(txHash);
  }

  return (
    <>
      <div>
        <input value={amount} onChange={(e) => setAmount(e.target.value)} />
        <button onClick={wrap}>Wrap</button>
      </div>
    </>
  );
}
