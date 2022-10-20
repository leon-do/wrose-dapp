import { ethers } from "ethers";

export default class WROSE {
  constructor(_signer) {
    this.contractAddress = process.env.CONTRACT_ADDRESS;
    this.signer = _signer;
    this.contract = new ethers.Contract(this.contractAddress, process.env.ABI, this.signer);
  }

  async signerAddress() {
    return await this.signer.getAddress();
  }

  async balanceOf() {
    const signerAddress = await this.signer.getAddress();
    const balance = await this.contract.callStatic["balanceOf"](signerAddress);
    return ethers.utils.formatEther(balance);
  }

  async wrap(_amount) {
    const receipt = await this.contract["deposit"]({ value: ethers.utils.parseEther(_amount) });
    return receipt.hash;
  }

  async unwrap(_amount) {
    const receipt = await this.contract["withdraw"](ethers.utils.parseEther(_amount));
    return receipt.hash;
  }

  async createMetaWithdraw(_to, _amount, _nonce, _reward) {
    const amount = ethers.utils.parseEther(_amount);
    const reward = ethers.utils.parseEther(_reward);
    const hash = ethers.utils.solidityKeccak256(["address", "address", "uint256", "uint256", "uint256"], [this.contractAddress, _to, amount, _nonce, reward]);
    return hash;
  }

  async signMetaWithdraw(_hash) {
    const signature = await this.signer.signMessage(ethers.utils.arrayify(_hash));
    return signature;
  }

  async relayMetaWithdraw(_signature, _to, _value, _nonce, _reward) {
    const value = ethers.utils.parseEther(_value);
    const reward = ethers.utils.parseEther(_reward);
    const receipt = await this.contract["metaWithdraw"](_signature, _to, value, _nonce, reward);
    return receipt;
  }
}
