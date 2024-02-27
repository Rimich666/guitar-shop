import {Inject, Injectable} from '@nestjs/common';
import {AmqpConnection} from '@golevelup/nestjs-rabbitmq';
import {rabbitConfig} from '@project/configurations';
import {ConfigType} from '@nestjs/config';
import {RegisterUserDto} from '@project/shared-dto';
import {RabbitRoutingKeys} from '@project/modules-options';

@Injectable()
export class NotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbitOptions: ConfigType<typeof rabbitConfig>,
  ) {}

  public async registerUser(dto: RegisterUserDto) {
    console.log(this.rabbitOptions.bindings);
    return this.rabbitClient.publish<RegisterUserDto>(
      this.rabbitOptions.bindings[RabbitRoutingKeys.RegisterUser].exchange,
      this.rabbitOptions.bindings[RabbitRoutingKeys.RegisterUser].binding,
      { ...dto }
    );
  }
}
