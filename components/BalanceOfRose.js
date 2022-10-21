import React, { useState } from "react";
import { ethers } from "ethers";

export default function BalanceOfRose({ wrose }) {
  const [balance, setBalance] = useState(null);

  getBalance();
  async function getBalance() {
    const wei = await wrose.signer.getBalance();
    const balanceOf = ethers.utils.formatEther(wei);
    setBalance((Math.round(balanceOf * 10000) / 10000).toString());
    await new Promise((resolve) => setTimeout(resolve, 5000));
    getBalance();
  }

  return (
    <>
      <div className="text-sm mt-2">Balance: {balance}</div>
    </>
  );
}
