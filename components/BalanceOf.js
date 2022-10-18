import React, { useState } from "react";

export default function Balance({ wrose }) {
  const [balance, setBalance] = useState(null);

  async function getBalance() {
    // const balance = await wrose.balanceOf();
    const balanceOf = await fetch("/api/balanceOf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address: await wrose.signer.getAddress() }),
    }).then((res) => res.json());
    setBalance(balanceOf.response);
  }

  return (
    <>
      <div>
        <button onClick={getBalance}>WROSE Balance: {balance}</button>
      </div>
    </>
  );
}
