import React, { useState, useEffect } from "react";
import getPriceOfRose from "../scripts/getPriceOfRose";

type Props = {
  amount: number;
};

const ValueOfRose: React.FunctionComponent<Props> = ({ amount }) => {
  const [value, setValue] = useState(0); // value = amount * price

  useEffect(() => {
    handleValue();
  });

  async function handleValue() {
    const price = await getPriceOfRose();
    setValue(Math.round(amount * price * 100000) / 100000);
  }

  return (
    <>
      <div className="text-sm mt-2">${value}</div>
    </>
  );
};

export default ValueOfRose;
