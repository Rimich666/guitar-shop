import chalk from 'chalk';
import {CliCommandInterface} from '../cli-command.interface';
export default class HelpCommand implements CliCommandInterface {
  public readonly name = '--help';

  public async execute(): Promise<void> {
    console.log(`
        ${chalk.blue.bold('Программа для подготовки данных для REST API сервера.')}

        ${chalk.cyan('Пример:')}
            main.js --<command> [--arguments]
        ${chalk.cyan('Команды:')}
            --help:                      ${chalk.cyan.italic('# печатает этот текст')}
            --generate                   ${chalk.cyan.italic('# генерирует произвольное количество тестовых данных')}
         `);
  }
}
