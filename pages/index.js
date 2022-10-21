import React, { useState } from "react";
import Head from "next/head";
import web3Onboard from "../src/web3Onboard";
import WROSE from "../src/wrose";
import BalanceOfWrose from "../components/BalanceOfWrose";
import Wrap from "../components/Wrap";
import Unwrap from "../components/Unwrap";
import Send from "../components/Send";

export default function Home() {
  const [signer, setSigner] = useState(null);
  const [wrose, setWrose] = useState(null);

  async function connect() {
    const signer = await web3Onboard();
    setSigner(signer);
    setWrose(new WROSE(signer));
  }

  return (
    <>
      <Head>
        <title>WROSE</title>
        <meta name="description" content="Wrapped Rose On Oasis Network" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <button onClick={connect}>Connect</button>

      {signer ? (
        <>
          <BalanceOfWrose wrose={wrose} />
          <Wrap wrose={wrose} />
          <Unwrap wrose={wrose} />
          <Send wrose={wrose} />
        </>
      ) : (
        <></>
      )}
    </>
  );
}
