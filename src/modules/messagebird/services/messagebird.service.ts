import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { EthersService } from './ethers.service';

@Injectable()
export class MessagebirdService {
  constructor(private readonly ethersService: EthersService) {}

  async createWallet(phonenumber: string) {
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
