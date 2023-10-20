import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import contractABI from './../../../contracts/contractABI.json';

const contractAddress = '0x0A07BD1C0cAE8335dCb3cbD74F8CaC82fFd7b419';
// const contractABI = [...]; // Define aquí el ABI del contrato
// const provider = new ethers.providers.JsonRpcProvider('https://polygon-mainnet.infura.io/v3/d8b554afb90b4e7196f5f8160dcc7fb8');
const provider = new ethers.JsonRpcProvider('https://polygon-mainnet.infura.io/v3/d8b554afb90b4e7196f5f8160dcc7fb8');
const contractx = new ethers.Contract(contractAddress, contractABI, provider);


@Injectable()
export class MessagebirdService {
  async getAddress() {
    const phonenumber = '573017218540';
    const result = await contractx.getBalance(phonenumber);
    console.log("Resultado del método:", result);
  }

  async createWallet() {
    const wallet = ethers.Wallet.createRandom();
    console.log('Wallet address:', wallet.address);
    console.log('Private Key:', wallet.privateKey);
    console.log('=> wallet', wallet);
    await this.getAddress();
    return wallet;
  }


}
