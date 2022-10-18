import { ethers } from "ethers";
import * as sapphire from "@oasisprotocol/sapphire-paratime";
import Joi from "joi";

// prettier-ignore
const signer = sapphire.wrap(new ethers.Wallet(process.env.RELAY_PRIVATE_KEY).connect(ethers.getDefaultProvider(sapphire.NETWORKS.testnet.defaultGateway)));
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, process.env.ABI, signer);

const schema = Joi.object({
  address: Joi.string().required(),
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send({ error: "Only POST allowed" });
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).send({ error: error.message });
  const nonce = await contract["replayNonce"](value.address);
  res.status(200).json({ response: nonce.toString() });
}
