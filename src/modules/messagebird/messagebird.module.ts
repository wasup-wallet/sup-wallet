import { Module } from '@nestjs/common';
import { MessagebirdController } from './controllers/messagebird.controller';
import { MessagebirdService } from './services/messagebird.service';
import { EthersService } from './services/ethers.service';
import { ConfigService } from './../../config/config.service';
// import {} from ''

@Module({
  imports: [ConfigService],
  controllers: [MessagebirdController],
  providers: [MessagebirdService, EthersService, ConfigService],
})
export class MessagebirdModule {}
