// Third Party Dependencies
import { Body, Controller, Post, Res } from '@nestjs/common';
import { createCanvas } from 'canvas';
import * as QRCode from 'qrcode';

// Local Dependencies
import { MessagebirdService } from './../services/messagebird.service';
import { EthersService } from './../services/ethers.service';

@Controller('messagebird')
export class MessagebirdController {
  constructor(
    private readonly messagebirdService: MessagebirdService
  ) { }
  /**
   * @memberof MessagebirdController
   * @description Verify if a whatsapp account exists.
   * @param {string} phone The phone number to verify.
   * @returns {object} Returns an object with the verification status and a message.
   */
  @Post('verify-account')
  async verifyAccount(@Body('phone') phone: string) {
    console.log('=> verify-account');
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
    @Body('password') password: string,
  ) {
    console.log('=> create-wallet');
    console.log('=> phone:', phone);
    const wallet = await this.messagebirdService.createWallet();
    return {
      walletId: wallet,
      msg: `The wallet was created for the phone ${phone}.`,
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
    console.log('=> wallet-balance');
    // const balance = await this.messagebirdService.getBalance(phone);
    const address = 'EPLINETDU5B3F64TQXG44KEXQ24J4EUJWIO4VLQJ2IQEIFEQ6VVBT2MEE4';
    const balance = await this.messagebirdService.getBalance(address);
    // return balance;
    return {
      msg: `The wallet balance was requested for the phone ${phone}.`,
      balance,
      currency: 'ALGO',
      red: 'Algorand',
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
    @Post('send')
    async sendToken(
      @Body('phone') phone: string,
      @Body('password') password: string,
      @Body('amount') amount: number,
    ) {
      console.log('=> send');
      // const balance = await this.messagebirdService.getBalance(phone);
      const from = 'EPLINETDU5B3F64TQXG44KEXQ24J4EUJWIO4VLQJ2IQEIFEQ6VVBT2MEE4';
      const privateKey = '216,22,78,84,110,216,204,99,248,237,157,183,148,74,171,82,85,65,124,196,41,225,185,100,132,32,126,147,103,199,200,214,35,214,134,146,99,167,67,178,251,147,133,205,206,40,151,134,184,158,18,137,178,29,202,174,9,210,32,68,20,144,245,106';
      const mnemonic = 'swallow debate clay manage often body hurt over notice clean fiber festival live business evolve thrive now bag aware dawn song crack rent absorb exact';
      const to = 'A76RRSTWM5YCTBDISI5ZNJP4OKKZR7ZLCPCCGLFIUNXVHARGF3ONELBETM';
      const amounttoSend = amount * 1000000;
      const balance = await this.messagebirdService.sendTokens(from, to, mnemonic, amounttoSend);
      return balance;
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
    console.log('=> wallet-paid');
    // const address = await this.messagebirdService.getAddress(phone);
    const canvas = createCanvas(300, 300);
    const context = canvas.getContext('2d');

    context.fillStyle = '#e9ebee';
    context.fillRect(0, 0, 300, 300);

    const data = 'https://www.facebook.com/';

    await QRCode.toCanvas(canvas, data, {
      color: {
        dark: '#4267b2',
        light: '#e9ebee',
      },
    });

    return {
      msg: `The wallet was paid for the phone ${phone}.`,
      // img: 'https://i.ibb.co/Jv6B9Sk/image.png',
      img: 'https://www.coini.app/assets/img_algorand_address.png',
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
    console.log('=> wallet-confirm');
    return {
      test: `The Transaction was confirmed for the phone ${phone}.`,
      hash: '43E3GZRSUEWZC6YQH6VDHQ4TWL4QENBWA7ZP3DMXAPI74HBBULCA',
      status: 'success',
    };
  }
}
