import React, { useState, useEffect } from "react";
import getBalanceOfRose from "../scripts/getBalanceOfRose";
import WROSE from "../scripts/wrose";

type Props = {
  wrose: WROSE;
};

const BalanceOfRose: React.FunctionComponent<Props> = ({ wrose }) => {
  const [balance, setBalance] = useState("");

  useEffect(() => {
    getBalanceOfRose(wrose).then((bal) => setBalance(bal.toString()));
    setInterval(async () => {
      const balanceOf = await getBalanceOfRose(wrose);
      setBalance(balanceOf.toString());
    }, 5000);
  }, []);

  return (
    <>
      <div className="text-sm mt-2">Balance: {balance}</div>
    </>
  );
};

export default BalanceOfRose;
