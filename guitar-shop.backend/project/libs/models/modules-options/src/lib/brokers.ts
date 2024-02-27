import { ConfigService } from '@nestjs/config';
import {getRabbitMQConnectionString} from "@project/util-core";

export function getRabbitMQOptions(optionSpace: string) {
  return {
    useFactory: async (config: ConfigService) => ({
      exchanges: config.get<string[]>(`${optionSpace}.exchanges`).map((name) =>
        ({
          name: name,
          type: 'direct'
        })
      ),
      uri:getRabbitMQConnectionString({
        host: config.get<string>(`${optionSpace}.host`),
        password: config.get<string>(`${optionSpace}.password`),
        user: config.get<string>(`${optionSpace}.user`),
        port: config.get<string>(`${optionSpace}.port`),
      }),
      connectionInitOptions: { wait: true },
      enableControllerDiscovery: true,
    }),
    inject: [ConfigService]
  }
}
