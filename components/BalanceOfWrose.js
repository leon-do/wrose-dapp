import React, { useState } from "react";
import getBalanceOfWrose from "../src/getBalanceOfWrose";

export default function BalanceOfWrose({ wrose }) {
  const [balance, setBalance] = useState(null);

  getBalance();
  async function getBalance() {
    const balance = await getBalanceOfWrose(wrose);
    setBalance(balance.toString());
    await new Promise((resolve) => setTimeout(resolve, 5000));
    getBalance();
  }

  return (
    <>
      <div className="text-sm mt-2">Balance: {balance}</div>
    </>
  );
}
