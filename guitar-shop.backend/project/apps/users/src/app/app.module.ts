import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { ConfigUsersModule } from '@project/users-config';
import { getMongooseOptions } from '@project/modules-options';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UserModule,
    ConfigUsersModule,
    MongooseModule.forRootAsync(getMongooseOptions('mongo')),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
