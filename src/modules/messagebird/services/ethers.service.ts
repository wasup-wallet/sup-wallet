// Third Party Dependencies
import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

// Local Dependencies
import { ConfigService } from 'src/config/config.service';
import { Blockchain } from 'src/config/config.keys';

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
    const contract = new ethers.Contract(
      this.configService.get(Blockchain.CONTRACT_ADDRESS),
      this.configService.get(Blockchain.ABI),
      provider,
    );

    return contract;
  }
}
