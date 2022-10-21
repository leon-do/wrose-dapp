import React, { useState } from "react";

export default function BalanceOfWrose({ wrose }) {
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
    setBalance(Math.round(balanceOf.response * 10000) / 10000);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    getBalance();
  }

  return (
    <>
      <div className="text-sm mt-2">Balance: {balance}</div>
    </>
  );
}
