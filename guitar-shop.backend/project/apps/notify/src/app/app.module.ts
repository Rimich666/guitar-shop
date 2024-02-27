import { Module } from '@nestjs/common';
import { MailModule } from './mail/mail.module';
import {ConfigNotifyModule} from '@project/notify-config';

@Module({
  imports: [
    MailModule,
    ConfigNotifyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
