import React, { useState } from "react";

export default function Unwrap({ wrose }) {
  const [amount, setAmount] = useState("1");

  async function unwrap() {
    const txHash = await wrose.unwrap(amount);
    console.log(txHash);
  }

  return (
    <>
      <div>
        <input value={amount} onChange={(e) => setAmount(e.target.value)} />
        <button onClick={unwrap}>Unwrap</button>
      </div>
    </>
  );
}
