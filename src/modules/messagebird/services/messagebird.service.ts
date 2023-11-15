import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { EthersService } from './ethers.service';
import { Buffer } from 'buffer';
import algosdk from 'algosdk';

@Injectable()
export class MessagebirdService {
  constructor(private readonly ethersService: EthersService) { }

  /**
   * Create wallet with AlgoSDK
   */
  async createWallet() {
    const generatedAccount = algosdk.generateAccount();
    const privateKey = generatedAccount.sk;
    const passphrase = algosdk.secretKeyToMnemonic(generatedAccount.sk);
    console.log(`My address: ${generatedAccount.addr}`);
    console.log(`My privateKey: ${privateKey}`);
    console.log(`My passphrase: ${passphrase}`);
  }

  async createWalletEVM(phonenumber: string) {
    const wallet = ethers.Wallet.createRandom();
    console.log('Wallet address:', wallet.address);
    console.log('Private Key:', wallet.privateKey);
    await this.ethersService.createAccount(phonenumber, wallet.address);
    return wallet;
  }

  getAlgodClient() {
    const baseServer = 'https://testnet-algorand.api.purestake.io/ps2';
    const port = '';
    const token = {
      'X-API-Key': 'g0AxRo9VtjaqZMynHoAIvaTFp7j5OOHe9PBFlM60'
    };
    const algodclient = new algosdk.Algodv2(token, baseServer, port);
    return algodclient;
  }

  async getBalance(address) {
    const algodClient = this.getAlgodClient();
    const acctInfo = await algodClient.accountInformation(address).do();
    console.log(`Account balance: ${acctInfo.amount} microAlgos`);
    return acctInfo.amount / 1000000;
  }

  async sendTokens(from, to, mnemonic, amount) {
    // const privateKeyUint8Array = new Uint8Array(privateKey.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    const privateKey = algosdk.mnemonicToSecretKey(mnemonic);
    const algodClient = this.getAlgodClient();
    const suggestedParams = await algodClient.getTransactionParams().do();
    const ptxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from,
      suggestedParams,
      to,
      amount,
      note: new Uint8Array(Buffer.from('hello world')),
    });
    const signedTxn = ptxn.signTxn(privateKey.sk);
    const { txId } = await algodClient.sendRawTransaction(signedTxn).do();
    const result = await algosdk.waitForConfirmation(algodClient, txId, 4);
    console.log(result);
    console.log(`Transaction Information: ${result.txn}`);
    console.log(`Decoded Note: ${Buffer.from(result.txn.txn.note).toString()}`);
  }

  async getBalanceEVM(phonenumber: string) {
    return await this.ethersService.getBalance(phonenumber);
  }

  async getAddressEVM(phonenumber: string) {
    return await this.ethersService.getBalance(phonenumber);
  }
}
