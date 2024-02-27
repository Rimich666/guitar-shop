import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {UserRepository} from './user.repository';
import {MongooseModule} from '@nestjs/mongoose';
import {UserModel, UserSchema} from '@project/user-models';
import {JwtModule} from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import {getJwtOptions} from '@project/modules-options';
import {JwtAccessStrategy} from '@project/util-core';
import {LocalStrategy} from './strategies/local.strategy';
import {NotifyModule} from '../notify/notify.module';


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserModel.name,
        schema: UserSchema,
      },
    ]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions
    }),
    NotifyModule
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    JwtAccessStrategy,
    LocalStrategy,
  ],
})
export class UserModule {}
