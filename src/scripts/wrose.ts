import { ethers } from "ethers";

export default class WROSE {

  contractAddress: string;
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

  async balanceOf(_address: string) {
    const balance = await this.contract.callStatic["balanceOf"](_address);
    return ethers.utils.formatEther(balance);
  }

  async wrap(_amount: string) {
    const receipt = await this.contract["deposit"]({ value: ethers.utils.parseEther(_amount) });
    return receipt.hash;
  }

  async unwrap(_amount: string) {
    const receipt = await this.contract["withdraw"](ethers.utils.parseEther(_amount));
    return receipt.hash;
  }

  async createMetaWithdraw(_to: string, _amount: string, _nonce: string, _reward: string) {
    const amount = ethers.utils.parseEther(_amount);
    const reward = ethers.utils.parseEther(_reward);
    const hash = ethers.utils.solidityKeccak256(["address", "address", "uint256", "uint256", "uint256"], [this.contractAddress, _to, amount, _nonce, reward]);
    return hash;
  }

  async signMetaWithdraw(_hash: string) {
    const signature = await this.signer.signMessage(ethers.utils.arrayify(_hash));
    return signature;
  }

  async verifyMetaWithdraw(_signature: string, _to: string, _amount: string, _nonce: string, _reward: string) {
    const hash = await this.createMetaWithdraw(_to, _amount, _nonce, _reward);
    const signerAddress = await this.signer.getAddress();
    const recoveredAddress = ethers.utils.verifyMessage(ethers.utils.arrayify(hash), _signature);
    return signerAddress === recoveredAddress;
  }

  async relayMetaWithdraw(_signature: string, _to: string, _value: string, _nonce: string, _reward: string) {
    const value = ethers.utils.parseEther(_value);
    const reward = ethers.utils.parseEther(_reward);
    const receipt = await this.contract["metaWithdraw"](_signature, _to, value, _nonce, reward);
    return receipt;
  }
}
