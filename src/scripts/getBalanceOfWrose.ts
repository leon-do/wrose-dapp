import WROSE from "./wrose";

export default async function getBalanceOfWrose(wrose: WROSE) {
  const balanceOf = await wrose.balanceOf();
  return Math.round(Number(balanceOf) * 10000) / 10000;
}
