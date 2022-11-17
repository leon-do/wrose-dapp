import React, { useState, useEffect } from "react";
import getPriceOfRose from "../src/getPriceOfRose";

export default function ValueOfRose({ amount }) {
  const [value, setValue] = useState(""); // value = amount * price

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
}
