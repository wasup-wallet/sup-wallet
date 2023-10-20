import { Module } from '@nestjs/common';
import { MessagebirdController } from './controllers/messagebird.controller';

@Module({
  controllers: [MessagebirdController],
})
export class MessagebirdModule {}
