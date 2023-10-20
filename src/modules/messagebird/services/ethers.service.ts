// Third Party Dependencies
import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import contractABI from './../../../contracts/contractABI.json';

// Local Dependencies
import { ConfigService } from 'src/config/config.service';
import { Blockchain } from 'src/config/config.keys';

//
// const provider = new ethers.JsonRpcProvider(Blockchain.PROVIDER_URL);
// const contract = new ethers.Contract(Blockchain.CONTRACT_ADDRESS, contractABI, provider);

@Injectable()
export class EthersService {
  /**
   * @memberof EthersService
   * @description The constructor of the service.
   * @param {object} configService The config service.
   */
  constructor(private readonly configService: ConfigService) { }

  async getBalance(phonenumber: string) {
    const provider = new ethers.providers.JsonRpcProvider('https://polygon-mumbai.infura.io/v3/d8b554afb90b4e7196f5f8160dcc7fb8');
    const contract = new ethers.Contract('0x0a07bd1c0cae8335dcb3cbd74f8cac82ffd7b419', contractABI, provider);
    const result = await contract.getBalance(phonenumber);
    console.log("Resultado del método:", result);
  }

  // /**
  //  * @memberof EthersService
  //  * @description Connect to the provider.
  //  * @returns {object} Returns an object with the provider.
  //  */
  // connectToProvider() {
  //   const provider = new ethers.providers.JsonRpcProvider(
  //     this.configService.get(Blockchain.PROVIDER_URL),
  //   );
  //   return provider;
  // }

  // /**
  //  * @memberof EthersService
  //  * @description Get the contract.
  //  * @param {object} provider The provider object.
  //  * @returns {object} Returns an object with the contract.
  //  */
  // getContract(provider) {
  //   const contract = new ethers.Contract(
  //     this.configService.get(Blockchain.CONTRACT_ADDRESS),
  //     this.configService.get(Blockchain.ABI),
  //     provider,
  //   );

  //   return contract;
  // }
}
