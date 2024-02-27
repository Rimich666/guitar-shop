#!/usr/bin/env node
import CLIApplication from "./cli";
// import VersionCommand from './core/cli-command/version.command.js';
// import ImportCommand from './core/cli-command/import.command.js';
// import StealDataCommand from './core/cli-command/steal-data.command.js';
// import GenerateCommand from './core/cli-command/generate.command.js';
// import FormatCommand from './core/cli-command/format.command.js';
// import ProgressCommand from './core/cli-command/progress.command.js';
import HelpCommand from "./commands/helper.command";
import TestCommand from "./commands/test.command";
import GenerateCommand from "./commands/generate/generate.command";


const myManager = new CLIApplication();
myManager.registerCommands([
  new HelpCommand,
  new TestCommand,
  // new VersionCommand,
  // new ImportCommand, new StealDataCommand,
  new GenerateCommand
  // , new FormatCommand,
  // new ProgressCommand
]);
myManager.processCommand(process.argv);
