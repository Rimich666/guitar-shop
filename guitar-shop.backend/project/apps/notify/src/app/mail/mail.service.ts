import { Injectable } from '@nestjs/common';
import {MailerService} from '@nestjs-modules/mailer';
import {RegisterUserDto} from '@project/shared-dto';
import {EmailSubject} from '@project/shared-constants';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
  ) {}

  public async sendNotifyNewUser(user: RegisterUserDto) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: EmailSubject.EmailRegisterUser,
      template: './register-user',
      context: {
        user: `${user.name}`,
        email: `${user.email}`,
        password: `${user.password}`,
        link: `${user.url}`
      }
    })
  }
}
