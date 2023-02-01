import type { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import * as sapphire from "@oasisprotocol/sapphire-paratime";
import Joi from "joi";

type Data = {
  response: string;
};

type Error = {
  error: string;
};

// prettier-ignore
const signer = sapphire.wrap(new ethers.Wallet(process.env.RELAY_PRIVATE_KEY as string).connect(ethers.getDefaultProvider(process.env.CHAIN_RPC_URL)));
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS as string, process.env.ABI as string, signer);

const schema = Joi.object({
  signature: Joi.string().required(),
  to: Joi.string().required(),
  amount: Joi.number().required(),
  nonce: Joi.string().required(),
  reward: Joi.number().required(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data | Error>) {
  try {
    if (req.method !== "POST") return res.status(405).send({ error: "Only POST allowed" });
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).send({ error: error.message });
    if (value.reward < value.amount * 0.01) return res.status(400).send({ error: "Incorrect reward" });
    const amount = ethers.utils.parseEther(value.amount.toString()).toString();
    const reward = ethers.utils.parseEther(value.reward.toString()).toString();
    const receipt = await contract["metaWithdraw"](value.signature, value.to, amount, value.nonce, reward);
    res.status(200).json({ response: receipt.hash });
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
}