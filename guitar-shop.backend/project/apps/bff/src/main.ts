/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import {ConfigService} from '@nestjs/config';
import {corsMiddleware} from '@project/shared-enhancers';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{rawBody: true,});

  const globalPrefix = '';
  app.setGlobalPrefix(globalPrefix);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');
  // app.enableCors({origin: true});
  app.use(corsMiddleware);
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
  Logger.log(
    `🎯  Current mode: ${configService.get('application.environment')}`
  )
}

bootstrap();
