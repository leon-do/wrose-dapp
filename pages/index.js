import React, { useState } from "react";
import Head from "next/head";
import { ethers } from "ethers";
import web3Onboard from "../src/web3Onboard";
import WROSE from "../src/wrose";
import metaSend from "../src/metaSend";
import Nav from "../components/Nav";
import BalanceOfWrose from "../components/BalanceOfWrose";
import ValueOfRose from "../components/ValueOfRose";
import getBalanceOfWrose from "../src/getBalanceOfWrose";
import Modal from "../components/Modal";
import ModalSend from "../components/ModalSend";

export default function Wrap() {
  const [signer, setSigner] = useState(null);
  const [wrose, setWrose] = useState(null);
  const [amount, setAmount] = useState(null);
  const [to, setTo] = useState(null);
  // modal info
  const [showModal, setShowModal] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(true);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [showModalSend, setShowModalSend] = useState(false);
  const [displayButton, setDisplayButton] = useState(true);

  async function connect() {
    const signer = await web3Onboard();
    if (signer) {
      setSigner(signer);
      setWrose(new WROSE(signer));
    }
  }

  async function displayModalSend() {
    displayModal(true, "Loading", "Please wait...", false);
    setShowModal(true);
    if (!(await isValidAmount())) {
      displayModal(false, "Error", "Invalid Address or Amount");
      return;
    }
    setShowModal(false);
    setShowModalSend(true);
  }

  async function isValidAmount() {
    const isAddress = ethers.utils.isAddress(to);
    if (!amount || !to || !isAddress) return false;
    const balance = await getBalanceOfWrose(wrose);
    return amount <= balance;
  }

  // from <Modal />
  function handleModal() {
    setShowModal(false);
  }

  // from <ModalSend />
  async function handleModalSend(send) {
    setShowModalSend(false);
    if (!send) return;
    displayModal(true, "Loading", "Please wait...", false);
    setShowModal(true);
    try {
      const { response } = await metaSend(wrose, amount, to);
      displayModal(true, "Success", "Transaction Hash: " + response);
      setShowModal(true);
    } catch (error) {
      displayModal(false, "Error", error.message);
      setShowModal(true);
    }
  }

  function displayModal(success, title, message, display = true) {
    setModalSuccess(success);
    setModalTitle(title);
    setModalMessage(message);
    setDisplayButton(display);
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
          <div className="m-2">Send</div>

          <div className="rounded-xl bg-slate-800">
            <table className="min-w-full">
              <tbody>
                <tr>
                  <td className="pl-4 py-3 w-2/3">
                    <input disabled={!signer} type="number" onChange={(e) => setAmount(e.target.value)} className="text-4xl rounded-md w-full bg-transparent focus:outline-none" placeholder="0" />
                    {wrose ? <ValueOfRose amount={amount} /> : <></>}
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
                    <input disabled={!signer} onChange={(e) => setTo(e.target.value)} className="truncate text-4xl rounded-md w-full bg-transparent focus:outline-none" placeholder="0xAlice" />
                  </td>
                  <td className="text-right pr-4">
                    <div className="text-xl">{process.env.CHAIN_TOKEN}</div>
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
              <button onClick={() => displayModalSend()} className="text-xl w-full justify-center rounded-3xl mt-3 p-4 bg-sky-600 hover:bg-sky-500">
                Send
              </button>
            )}
          </div>
        </div>
      </div>
      {showModal ? <Modal success={modalSuccess} title={modalTitle} message={modalMessage} handleModal={handleModal} displayButton={displayButton} /> : <></>}
      {showModalSend ? <ModalSend to={to} amount={amount} handleModalSend={handleModalSend} /> : <></>}
    </>
  );
}
