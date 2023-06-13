import React, { useState } from "react";
import Head from "next/head";
import { ethers } from "ethers";
import web3Onboard from "../scripts/web3Onboard";
import WROSE from "../scripts/wrose";
import Nav from "../components/Nav";
import BalanceOfRose from "../components/BalanceOfRose";
import BalanceOfWrose from "../components/BalanceOfWrose";
import ValueOfRose from "../components/ValueOfRose";
import getBalanceOfRose from "../scripts/getBalanceOfRose";
import getBalanceOfWrose from "../scripts/getBalanceOfWrose";
import Modal from "../components/Modal";

export default function Wrap() {
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner>();
  const [wrose, setWrose] = useState<WROSE>();
  const [amount, setAmount] = useState("");
  // modal info
  const [showModal, setShowModal] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(true);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [displayButton, setDisplayButton] = useState(true);
  const [href, setHref] = useState("");

  async function connect() {
    const signer = await web3Onboard();
    if (signer) {
      setSigner(signer);
      setWrose(new WROSE(signer));
    }
  }

  async function unwrap() {
    if (!wrose || !amount) return;
    displayModal(true, "Loading", "Please wait...", false);
    setShowModal(true);
    if (!(await isValidAmount())) {
      displayModal(false, "Error", "Invalid Amount", true);
      setShowModal(true);
      return;
    }
    try {
      const transactionHash = await wrose.unwrap(amount);
      displayModal(true, "Success", "Transaction Hash: " + transactionHash);
      displayModal(true, "Success", `Transaction Hash: ${transactionHash}`, true, `${process.env.EXPLORER_URL}/tx/${transactionHash}`);
      setShowModal(true);
    } catch (error: any) {
      displayModal(false, "Error", error.message);
      setShowModal(true);
    }
  }

  async function isValidAmount() {
    if (!wrose || !amount) return false;
    const wroseBalance = await getBalanceOfWrose(wrose);
    const roseBalance = await getBalanceOfRose(wrose);
    // leave a lil bit of gas
    return Number(amount) <= wroseBalance && roseBalance >= 0.005;
  }

  // from <Modal />
  function handleModal() {
    setShowModal(false);
  }

  function displayModal(success: boolean, title: string, message: string, display = true, href = "") {
    setModalSuccess(success);
    setModalTitle(title);
    setModalMessage(message);
    setDisplayButton(display);
    setHref(href);
  }

  return (
    <>
      <Head>
        <title>Wrapped Rose</title>
        <meta name="description" content="Wrap Rose WROSE on Oasis Sapphire" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />

      <div className="flex min-h-full items-center justify-center py-12 px-4">
        <div className="w-full max-w-md p-2 rounded-xl border border-slate-700 bg-slate-900">
          <div className="m-2">Unwrap</div>

          <div className="rounded-xl bg-slate-800">
            <table className="min-w-full">
              <tbody>
                <tr>
                  <td className="pl-4 py-3 w-2/3">
                    <input disabled={!signer} onChange={(e) => setAmount(e.target.value)} className="text-4xl rounded-md w-full bg-transparent focus:outline-none" placeholder="0" />
                    {wrose ? <ValueOfRose amount={Number(amount)} /> : <></>}
                  </td>
                  <td className="text-right pr-4">
                    <div className="text-xl">{process.env.WROSE_NAME}</div>
                    {wrose ? <BalanceOfWrose wrose={wrose} /> : <></>}
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
                    <input disabled type="number" className="text-4xl rounded-md w-full bg-transparent focus:outline-none" placeholder={amount || ""} />
                    {wrose ? <ValueOfRose amount={Number(amount)} /> : <></>}
                  </td>
                  <td className="text-right pr-4">
                    <div className="text-xl">{process.env.CHAIN_TOKEN}</div>
                    {wrose ? <BalanceOfRose wrose={wrose} /> : <></>}
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
              <button onClick={() => unwrap()} className="text-xl w-full justify-center rounded-3xl mt-3 p-4 bg-sky-600 hover:bg-sky-500">
                Unwrap
              </button>
            )}
          </div>
        </div>
      </div>

      {showModal ? <Modal success={modalSuccess} title={modalTitle} message={modalMessage} handleModal={handleModal} displayButton={displayButton} href={href} /> : <></>}
    </>
  );
}
