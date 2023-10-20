import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagebirdService {
  getHello(): string {
    return 'Hello World!';
  }
}
