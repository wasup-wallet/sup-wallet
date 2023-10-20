import { Module } from '@nestjs/common';
import { MessagebirdController } from './controllers/messagebird.controller';
import { MessagebirdService } from './services/messagebird.service';

@Module({
  controllers: [MessagebirdController],
  providers: [MessagebirdService],
})
export class MessagebirdModule {}
