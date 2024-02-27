import {CliCommandInterface} from '../cli-command.interface';
import chalk from "chalk";


export default class TestCommand implements CliCommandInterface {
  public readonly name = '--test';

  public async execute(): Promise<void> {
    console.log(chalk.blue.bold('test command'))
  }
}
