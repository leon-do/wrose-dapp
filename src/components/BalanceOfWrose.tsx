import React, { useState } from "react";
import getBalanceOfWrose from "../scripts/getBalanceOfWrose";
import WROSE from "../scripts/wrose";

type Props = {
  wrose: WROSE;
};

const BalanceOfWrose: React.FunctionComponent<Props> = ({ wrose }) => {
  const [balance, setBalance] = useState("");

  const handleBalance = async () => {
    try {
      const balanceOf = await getBalanceOfWrose(wrose);
      setBalance(balanceOf.toString());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="text-sm mt-2">
        <button onClick={() => handleBalance()}>🔄</button>
        <span> Balance: {balance} </span>
      </div>
    </>
  );
};

export default BalanceOfWrose;
