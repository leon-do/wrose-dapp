import React, { useState } from "react";
import Head from "next/head";
import web3Onboard from "../src/web3Onboard";
import WROSE from "../src/wrose";
import NavApp from "../components/NavApp";
import BalanceOfRose from "../components/BalanceOfRose";
import BalanceOfWrose from "../components/BalanceOfWrose";
import ValueOfRose from "../components/ValueOfRose";
import getBalanceOfRose from "../src/getBalanceOfRose";

export default function Wrap() {
  const [signer, setSigner] = useState(null);
  const [wrose, setWrose] = useState(null);
  const [amount, setAmount] = useState(null);

  async function connect() {
    const signer = await web3Onboard();
    if (signer) {
      setSigner(signer);
      setWrose(new WROSE(signer));
    }
  }

  async function wrap() {
    if (!(await isValidAmount())) return alert("Amount exceeds balance");
    const transactionHash = await wrose.wrap(amount);
    console.log({ transactionHash });
  }

  async function isValidAmount() {
    const balance = await getBalanceOfRose(wrose);
    // leave a lil bit of gas
    return amount <= balance - 0.005;
  }

  return (
    <>
      <Head>
        <title>Wrapped Rose</title>
        <meta name="description" content="Wrap Rose WROSE on Oasis Sapphire" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavApp />

      <div className="flex min-h-full items-center justify-center py-12 px-4">
        <div className="w-full max-w-md p-2 rounded-xl border border-slate-700 bg-slate-900">
          <div className="m-2">Wrap</div>

          <div className="rounded-xl bg-slate-800">
            <table className="min-w-full">
              <tbody>
                <tr>
                  <td className="pl-4 py-3 w-2/3">
                    <input disabled={!signer} type="number" onChange={(e) => setAmount(e.target.value)} className="text-4xl rounded-md w-full bg-transparent focus:outline-none" placeholder="0" />
                    {wrose ? <ValueOfRose amount={amount} /> : <></>}
                  </td>
                  <td className="text-right pr-4">
                    <div className="text-xl">ROSE</div>
                    {wrose ? <BalanceOfRose wrose={wrose} /> : <></>}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-center text-gray-500"> ↓ </div>

          <div className="rounded-xl bg-slate-800">
            <table className="min-w-full">
              <tbody>
                <tr>
                  <td className="pl-4 py-3 w-2/3">
                    <input disabled className="text-4xl rounded-md w-full bg-transparent focus:outline-none" placeholder={amount || 0} />
                    {wrose ? <ValueOfRose amount={amount} /> : <></>}
                  </td>
                  <td className="text-right pr-4">
                    <div className="text-xl">WROSE</div>
                    {wrose ? <BalanceOfWrose wrose={wrose} /> : <></>}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            {!signer ? (
              <button onClick={() => connect()} className="text-xl w-full justify-center rounded-3xl mt-3 p-4 bg-sky-600 hover:bg-sky-500">
                Connect Wallet
              </button>
            ) : (
              <button onClick={() => wrap()} className="text-xl w-full justify-center rounded-3xl mt-3 p-4 bg-sky-600 hover:bg-sky-500">
                Wrap
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
