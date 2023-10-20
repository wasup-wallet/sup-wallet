import { Body, Controller, Get, Post } from '@nestjs/common';
import { MessagebirdService } from './../services/messagebird.service';

@Controller('messagebird')
export class MessagebirdController {
  constructor(private readonly messagebirdService: MessagebirdService) {}
  /**
   * @memberof MessagebirdController
   * @description Verify if a whatsapp account exists.
   * @param {string} phone The phone number to verify.
   * @returns {object} Returns an object with the verification status and a message.
   */
  @Post('verify-account')
  async verifyAccount(@Body('phone') phone: string) {
    return {
      verified: false,
      number: phone,
      status: 'success',
    };
  }

  /**
   * @memberof MessagebirdController
   * @description Create a new wallet for a whatsapp user.
   * @param {string} phone The phone number to create the wallet.
   * @param {string} password The password to create the wallet.
   * @returns {string} Returns a string with the wallet id.
   */
  @Post('create-wallet')
  async createWallet(
    @Body('phone') phone: string,
    @Body('password') password:  string,
  ) {
    const wallet = await this.messagebirdService.createWallet();
    return {
      walletId: wallet.address,
      msg: `The wallet was created for the phone ${phone} with the password ${password}`,
      status: 'success',
    };
  }

  /**
   * @memberof MessagebirdController
   * @description Get the balance of a wallet.
   * @param {string} phone The phone number to get the balance.
   * @param {string} password The password to get the balance.
   * @returns {number} Returns the balance of the wallet.
   */
  @Post('wallet-balance')
  async getWalletBalance(
    @Body('phone') phone: string,
    @Body('password') password: string,
  ) {
    return {
      msg: `The wallet balance was requested for the phone ${phone} with the password ${password}`,
      balance: 100,
      currency: 'USDT',
      red: 'ETH',
      status: 'success',
    };
  }

  /**
   * @memberof MessagebirdController
   * @description Get Paid for a wallet.
   * @param {string} phone The phone number to get paid.
   * @param {string} password The password to get paid.
   * @returns {string} Returns the QR code for the payment.
   */
  @Post('wallet-paid')
  async getWalletPaid(
    @Body('phone') phone: string,
    @Body('password') password: string,
  ) {
    return {
      msg: `The wallet was paid for the phone ${phone} with the password ${password}`,
      img: 'https://i.ibb.co/Jv6B9Sk/image.png',
      status: 'success',
    };
  }

  /**
   * @memberof MessagebirdController
   * @description Comfirm Transaction for a wallet.
   * @param {string} phone The phone number to get paid.
   * @param {string} password The password to get paid.
   * @returns {number} Returns the balance of the wallet.
   */
  @Post('wallet-confirm')
  async getWalletConfirm(
    @Body('phone') phone: string,
    @Body('password') password: string,
  ) {
    return {
      test: `The Transaction was confirmed for the phone ${phone} with the password ${password}`,
      hash: '0x1234567890',
      status: 'success',
    };
  }
}
