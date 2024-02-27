import * as process from 'process';
import {camelCaseToEnvStyle} from '@project/util-core';
import {Logger} from '@nestjs/common';
import {FIELD_SEPARATOR} from '@project/shared-constants';


export enum RabbitRoutingKeys {
  RegisterUser = 'RegisterUser',
}

const keys = ['routingKey', 'exchange', 'queue'];

export const getSubscribeOption = (key: RabbitRoutingKeys) => {
  const envName = camelCaseToEnvStyle(key, '');
  try {
    const options = Object.fromEntries(process.env[envName]
      .split(FIELD_SEPARATOR).map((item, index) => [keys[index], item]));
    Logger.log(`Environment: ${envName} has been read successfully`);
    console.log(options);
    return options;
  } catch (error){
    Logger.error(`
      Failed to read environment : "${envName}". Please check .env file.
      Some rabbit messages will not be delivered.
      Expected: "${envName}=rabbitRouting${FIELD_SEPARATOR}exchange${FIELD_SEPARATOR}queue"`);
  }
};
