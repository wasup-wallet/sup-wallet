// Third Party Dependencies.
import { Module } from '@nestjs/common';

// Local Dependencies.
import { DatabaseModule } from './database/database.module';
import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/config.module';
import { Configuration } from './config/config.keys';

@Module({
  imports: [DatabaseModule, ConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  static port: number | string;
  constructor(private readonly _configService: ConfigService) {
    // Set port from config service.
    AppModule.port = this._configService.get(Configuration.PORT);
  }
}
