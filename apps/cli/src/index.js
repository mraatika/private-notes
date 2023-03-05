require('dotenv').config();
const chalk = require('chalk');
const prompter = require('./prompter');
const { commands, runCommand } = require('./commands');

async function promptCommand() {
  const input = await prompter(
    'What should we do? ',
    'hint: type help for a list of available commands?',
  );

  const [command, type] = input.trim().split(' ');

  if (!commands.includes(command)) {
    console.log(chalk.red(`\nUnknown commmand: ${command}`));
    return promptCommand();
  }

  return [command, type];
}

async function loop() {
  const [command, type] = await promptCommand();

  try {
    await runCommand(command, type);
  } catch (e) {
    console.error(chalk.red(e.message));
  }

  loop();
}

async function start() {
  runCommand('help');
  loop();
}

start();
