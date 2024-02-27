import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import {MailerModule} from '@nestjs-modules/mailer';
import {getMailerAsyncOptions, getRabbitMQOptions} from '@project/modules-options';
import {RabbitMQModule} from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    MailerModule.forRootAsync(getMailerAsyncOptions('mail')),
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('rabbit')
    ),
  ],
  providers: [MailService],
  controllers: [MailController],
})
export class MailModule {}
