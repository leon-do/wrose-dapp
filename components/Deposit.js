import React, { useState } from "react";

export default function Deposit({ wrose }) {
  const [amount, setAmount] = useState("1");

  async function deposit() {
    const txHash = await wrose.deposit(amount);
    console.log(txHash);
  }

  return (
    <>
      <div>
        <input value={amount} onChange={(e) => setAmount(e.target.value)} />
        <button onClick={deposit}>Deposit</button>
      </div>
    </>
  );
}
