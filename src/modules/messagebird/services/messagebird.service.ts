import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { EthersService } from './ethers.service';

@Injectable()
export class MessagebirdService {
  constructor(private readonly ethersService: EthersService) {}

  async createWallet() {
    await this.ethersService.getBalance('993059945');
    const wallet = ethers.Wallet.createRandom();
    console.log('Wallet address:', wallet.address);
    console.log('Private Key:', wallet.privateKey);
    console.log('=> wallet', wallet);
    return wallet;
  }
}
