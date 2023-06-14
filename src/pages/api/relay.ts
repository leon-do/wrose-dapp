import type { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import * as sapphire from "@oasisprotocol/sapphire-paratime";

type Data = {
  response: string;
};

type Error = {
  error: string;
};

// prettier-ignore
const signer = sapphire.wrap(new ethers.Wallet(process.env.RELAY_PRIVATE_KEY as string).connect(ethers.getDefaultProvider(process.env.CHAIN_RPC_URL)));
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS as string, process.env.ABI as string, signer);

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data | Error>) {
  console.log('00000-------')
  console.log(req.body)
  try {
    if (req.method !== "POST") return res.status(405).send({ error: "Only POST allowed" });
    const { signature, to, value, nonce, reward } = req.body;
    if (BigInt(reward) < BigInt(value) / BigInt(100)) return res.status(400).send({ error: "Incorrect reward" });
    const receipt = await contract["metaWithdraw"](signature, to, value, nonce, reward);
    res.status(200).json({ response: receipt.hash });
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
}
