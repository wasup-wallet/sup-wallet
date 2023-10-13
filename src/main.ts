// Third Party Dependencies
import { NestFactory } from '@nestjs/core';

// Local Dependencies
import { AppModule } from './app.module';

async function bootstrap() {
  // Init NestJS app and set global prefix.
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  // Start listening on port.
  await app.listen(AppModule.port);
}
bootstrap();
