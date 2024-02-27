import {readFile} from 'node:fs/promises';
import {DEFAULT_CONFIG_PATH, DefaultConfig, GenerateConfig, Parameters} from './generate-config.consts';

export const getUserParams = (params: string[][]) => {
  const config: GenerateConfig = {} as GenerateConfig;
  params.forEach((param) => {
    const key = Parameters[param[0].substring(1) as keyof typeof Parameters] as keyof GenerateConfig;
    if (key.startsWith('is')) {
      config[key] = true;
    } else if (param[1]) {
      config[key] = param[1];
    }
  });
  return config;
};

export const parseParameters = async (parameters: string[]): Promise<GenerateConfig> => {
  const params = Array.from(parameters,(param, index) =>
    ([param, parameters[index + 1]])).filter((param) =>
    param[0].startsWith('-')).map((param) => {
    if (!param[1] || param[1].startsWith('-')) {
      param[1] = '';
    }
    return param;
  });
  console.log('parser', params);
  let pathConfig = params.length ? params.splice(params.findIndex((param) =>
    param[0] === '-config'), 1)[0][1] : '';
  pathConfig = pathConfig ? pathConfig : DEFAULT_CONFIG_PATH;
  const config: GenerateConfig = {} as GenerateConfig;

  Object.assign(config, DefaultConfig);
  if (pathConfig){
    try {
      Object.assign(config, JSON.parse(await readFile(pathConfig, { encoding: 'utf8' })));
    } catch (err){
      console.error(`Can't read config file from path: ${pathConfig}: ${err}`);
    }
  }
  Object.assign(config, getUserParams(params));
  return config;
};
