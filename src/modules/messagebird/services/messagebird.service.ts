import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { EthersService } from './ethers.service';
import algosdk from 'algosdk';
// import algosdk from '../src';

@Injectable()
export class MessagebirdService {
  constructor(private readonly ethersService: EthersService) {}

  async createWallet() {
    const generatedAccount = algosdk.generateAccount();
    const passphrase = algosdk.secretKeyToMnemonic(generatedAccount.sk);
    console.log(`My address: ${generatedAccount.addr}`);
    console.log(`My passphrase: ${passphrase}`);
  }

  async createWalletEVM(phonenumber: string) {
    const wallet = ethers.Wallet.createRandom();
    console.log('Wallet address:', wallet.address);
    console.log('Private Key:', wallet.privateKey);
    await this.ethersService.createAccount(phonenumber, wallet.address);
    return wallet;
  }

  async getBalance(phonenumber: string) {
    return await this.ethersService.getBalance(phonenumber);
  }

  async getAddress(phonenumber: string) {
    return await this.ethersService.getBalance(phonenumber);
  }
}
