import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import {appsConfig, httpConfig, appConfig, EnvPaths} from '@project/configurations';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, appsConfig, httpConfig],
      envFilePath: EnvPaths.bff
    }),
  ],
  providers: [],
  exports: [],
})
export class ConfigBffModule {}
