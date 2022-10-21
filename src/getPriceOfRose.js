export default async function getPriceOfRose() {
  const response = await fetch("https://api.coincap.io/v2/assets?ids=oasis-network", {
    method: "GET",
  }).then((res) => res.json());
  const price = Math.round(response.data[0].priceUsd * 100) / 100;
  return price;
}
