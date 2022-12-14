export default async function getReplayNonce(address) {
  const nonce = await fetch("/api/replayNonce", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ address }),
  }).then((res) => res.json());
  return nonce;
}
