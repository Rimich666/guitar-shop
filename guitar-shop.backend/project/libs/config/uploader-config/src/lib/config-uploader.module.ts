import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {appConfig, EnvPaths, mongoConfig, uploaderConfig} from '@project/configurations';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, mongoConfig, uploaderConfig],
      envFilePath: EnvPaths.uploader
    }),
  ],
  providers: [],
  exports: [],
})
export class ConfigUploaderModule {}
