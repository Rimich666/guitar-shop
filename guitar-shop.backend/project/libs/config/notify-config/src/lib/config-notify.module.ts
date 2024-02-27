import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {appConfig, EnvPaths, mailConfig, rabbitConfig,} from '@project/configurations';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, mailConfig, rabbitConfig],
      envFilePath: EnvPaths.notify
    }),
  ],
})
export class ConfigNotifyModule {}
