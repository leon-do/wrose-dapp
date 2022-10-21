import React, { useState, useEffect } from "react";

export default function PriceOfRose({ amount }) {
  const [value, setValue] = useState(""); // value = amount * price

  useEffect(() => {
    handleValue();
  }, [amount]);

  async function handleValue() {
    const response = await fetch("https://api.coincap.io/v2/assets?ids=oasis-network", {
      method: "GET",
    }).then((res) => res.json());
    const price = Math.round(response.data[0].priceUsd * 100) / 100;
    setValue(amount * price);
  }

  return (
    <>
      <div className="text-sm mt-2">${value}</div>
    </>
  );
}
