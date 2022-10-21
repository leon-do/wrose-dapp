export default async function getBalanceOfWrose(wrose) {
  const balanceOf = await fetch("/api/balanceOf", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ address: await wrose.signer.getAddress() }),
  }).then((res) => res.json());
  return Math.round(balanceOf.response * 10000) / 10000;
}
