import React, { useState, useEffect } from "react";
import getBalanceOfRose from "../scripts/getBalanceOfRose";
import WROSE from "../scripts/wrose";

type Props = {
  wrose: WROSE;
};

const BalanceOfRose: React.FunctionComponent<Props> = ({ wrose }) => {
  const [balance, setBalance] = useState("");

  useEffect(() => {
    handleBalance();
  }, []);

  const handleBalance = async () => {
    try {
      const balanceOf = await getBalanceOfRose(wrose);
      setBalance(balanceOf.toString());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="text-sm mt-2">
        <button onClick={() => handleBalance()}>🔄</button>
        <span className="text-sm mt-2"> Balance: {balance}</span>
      </div>
    </>
  );
};

export default BalanceOfRose;
