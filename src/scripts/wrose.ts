import { ethers, BigNumber } from "ethers";

export default class WROSE {
  contractAddress: string;
  // add type to signer
  signer: ethers.Signer;
  contract: ethers.Contract;

  constructor(_signer: ethers.Signer) {
    this.contractAddress = process.env.CONTRACT_ADDRESS as string;
    this.signer = _signer;
    this.contract = new ethers.Contract(this.contractAddress, process.env.ABI as string, this.signer);
  }

  async signerAddress() {
    return await this.signer.getAddress();
  }

  async balanceOf() {
    const balance = await this.contract.callStatic["balanceOf"]();
    return ethers.utils.formatEther(balance).toString();
  }

  async wrap(_value: string) {
    const receipt = await this.contract["deposit"]({ value: ethers.utils.parseEther(_value), gasLimit: 100000 });
    return receipt.hash;
  }

  async unwrap(_value: string) {
    const receipt = await this.contract["withdraw"](ethers.utils.parseEther(_value), { gasLimit: 100000 });
    return receipt.hash;
  }

  async signMetaWithdraw(_to: string, _value: string, _nonce: string, _reward: string) {
    const msgParams = JSON.stringify({
      domain: {
        name: "WROSE",
        version: "1",
        chainId: 23294,
        verifyingContract: process.env.CONTRACT_ADDRESS,
      },
      message: {
        to: _to,
        value: _value.toString(),
        nonce: _nonce.toString(),
        reward: _reward.toString(),
      },
      primaryType: "Message",
      types: {
        EIP712Domain: [
          { name: "name", type: "string" },
          { name: "version", type: "string" },
          { name: "chainId", type: "uint256" },
          { name: "verifyingContract", type: "address" },
        ],
        Message: [
          { name: "to", type: "address" },
          { name: "value", type: "uint256" },
          { name: "nonce", type: "uint256" },
          { name: "reward", type: "uint256" },
        ],
      },
    });

    // use ethers to send raw eth_signTypedData_v4
    if (this.signer.provider == null) throw new Error("No provider");
    // @ts-ignore
    const signature = await this.signer.provider.send("eth_signTypedData_v4", [await this.signerAddress(), msgParams]);
    return signature;
  }
}
