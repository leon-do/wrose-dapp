import React, { useState, useEffect } from "react";
import getBalanceOfWrose from "../scripts/getBalanceOfWrose";
import WROSE from "../scripts/wrose";

type Props = {
  wrose: WROSE;
};

const BalanceOfWrose: React.FunctionComponent<Props> = ({ wrose }) => {
  const [balance, setBalance] = useState("");

  useEffect(() => {
    getBalanceOfWrose(wrose).then((bal) => setBalance(bal.toString()));
    setInterval(async () => {
      const balanceOf = await getBalanceOfWrose(wrose);
      setBalance(balanceOf.toString());
    }, 5000);
  }, []);

  return (
    <>
      <div className="text-sm mt-2">Balance: {balance}</div>
    </>
  );
};

export default BalanceOfWrose;
