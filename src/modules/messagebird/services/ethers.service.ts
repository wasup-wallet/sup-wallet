// Third Party Dependencies
import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import contractABI from './../../../contracts/contractABI.json';

// Local Dependencies
import { ConfigService } from 'src/config/config.service';
import { Blockchain, WalletOwner } from 'src/config/config.keys';

@Injectable()
export class EthersService {
  /**
   * @memberof EthersService
   * @description The constructor of the service.
   * @param {object} configService The config service.
   */
  constructor(private readonly configService: ConfigService) {}

  /**
   * @memberof EthersService
   * @description Connect to the provider.
   * @returns {object} Returns an object with the provider.
   */
  connectToProvider() {
    const provider = new ethers.providers.JsonRpcProvider(
      this.configService.get(Blockchain.PROVIDER_URL),
    );
    return provider;
  }

  /**
   * @memberof EthersService
   * @description Get the contract.
   * @param {object} provider The provider object.
   * @returns {object} Returns an object with the contract.
   */
  getContract(provider) {

    console.log('this.configService.get(Blockchain.CONTRACT_ADDRESS)', this.configService.get(Blockchain.CONTRACT_ADDRESS));
    console.log('provider', provider);

    const contract = new ethers.Contract(
      this.configService.get(Blockchain.CONTRACT_ADDRESS),
      contractABI,
      provider,
    );

    return contract;
  }

  async getBalance(phonenumber: string) {
    const contract = this.getContract(this.connectToProvider());
    const result = await contract.getBalance(phonenumber);
    console.log('Resultado del método:', result.toString());
    return result.toString();
  }

  async createAccount(phonenumber: string, wallet: string) {
    console.log('=> WalletOwner.PRIVATE_KEY:', this.configService.get(WalletOwner.PRIVATE_KEY));
    // const provider = this.connectToProvider();
    // const walletOwner = new ethers.Wallet(this.configService.get(WalletOwner.PRIVATE_KEY));
    // // create an instance of wallet owner
    // const signer = walletOwner.connect(provider);
    // const contract = new ethers.Contract(Blockchain.CONTRACT_ADDRESS, contractABI, signer);
    // const result = await contract.createAccount(phonenumber, wallet);
    // console.log("=> createAccount:", result);
    const tempPrivateKey = '0xe0bced44cc0ae50d2aa5d1cb3864b85cbf0018aed1e275c74e0c7e34cc8be510';
    const provider = new ethers.providers.JsonRpcProvider('https://polygon-mumbai.infura.io/v3/d8b554afb90b4e7196f5f8160dcc7fb8');
    const walletOwner = new ethers.Wallet(tempPrivateKey);
    const signer = walletOwner.connect(provider);
    const contract = new ethers.Contract('0x0a07bd1c0cae8335dcb3cbd74f8cac82ffd7b419', contractABI, signer);
    const result = await contract.createAccount(phonenumber, wallet);
    console.log("createAccount:", result);
  }
}
