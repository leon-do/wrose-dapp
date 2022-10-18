import { ethers } from "ethers";
import * as sapphire from "@oasisprotocol/sapphire-paratime";
import Joi from "joi";

const fee = 0.1;
// prettier-ignore
const signer = sapphire.wrap(new ethers.Wallet(process.env.RELAY_PRIVATE_KEY).connect(ethers.getDefaultProvider(sapphire.NETWORKS.testnet.defaultGateway)));
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, process.env.ABI, signer);

const schema = Joi.object({
  signature: Joi.string().required(),
  to: Joi.string().required(),
  amount: Joi.number().required(),
  nonce: Joi.string().required(),
  reward: Joi.number().required(),
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send({ error: "Only POST allowed" });
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).send({ error: error.message });
  if (value.reward < value.amount * fee) return res.status(400).send({ error: "Incorrect reward" });
  const amount = ethers.utils.parseEther(value.amount.toString()).toString();
  const reward = ethers.utils.parseEther(value.reward.toString()).toString();
  const receipt = await contract["metaWithdraw"](value.signature, value.to, amount, value.nonce, reward);
  res.status(200).json({ response: receipt.hash });
}
