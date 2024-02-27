import {Controller, UsePipes, ValidationPipe} from '@nestjs/common';
import {MailService} from './mail.service';
import {RabbitSubscribe} from '@golevelup/nestjs-rabbitmq';
import {getSubscribeOption, RabbitRoutingKeys} from '@project/modules-options';
import {RegisterUserDto} from '@project/shared-dto';

@Controller('mail')
export class MailController {
  constructor(
    private readonly mailService: MailService,
  ) {}

  @RabbitSubscribe(getSubscribeOption(RabbitRoutingKeys.RegisterUser))
  // @UsePipes(ValidationPipe)
  public async create(user: RegisterUserDto) {
    console.log(RabbitRoutingKeys.RegisterUser);
    await this.mailService.sendNotifyNewUser(user);
  }
}
