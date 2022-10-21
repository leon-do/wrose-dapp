import React, { useState } from "react";
import Head from "next/head";
import web3Onboard from "../src/web3Onboard";
import WROSE from "../src/wrose";
import Nav from "../components/Nav";

export default function Unwrap() {
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
        <title>WROSE Unwrap</title>
        <meta name="description" content="Unwrapping Wrap Rose WROSE" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      unwrap page
    </>
  );
}