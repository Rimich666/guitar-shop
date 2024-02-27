import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {appConfig, EnvPaths, jwtConfig} from '@project/configurations';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, jwtConfig],
      envFilePath: EnvPaths.products
    }),
  ]
})
export class ConfigProductsModule {}
