import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

@Injectable()
export class MessagebirdService {
  getHello(): string {
    return 'Hello World!';
  }

  createWallet() {
    const wallet = ethers.Wallet.createRandom();
    console.log("Wallet address:", wallet.address);
    console.log("Private Key:", wallet.privateKey);
    return wallet;
  }
}
