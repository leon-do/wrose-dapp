import React, { useState } from "react";

export default function Balance({ wrose }) {
  const [balance, setBalance] = useState(null);

  getBalance();
  async function getBalance() {
    const balanceOf = await fetch("/api/balanceOf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address: await wrose.signer.getAddress() }),
    }).then((res) => res.json());
    setBalance(Math.round(balanceOf.response * 100) / 100);
    await new Promise((resolve) => setTimeout(resolve, 9999));
    getBalance();
  }

  return (
    <>
      <div>WROSE Balance: {balance}</div>
    </>
  );
}
