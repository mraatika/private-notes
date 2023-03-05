const chalk = require('chalk');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

module.exports = function prompter(question, helper) {
  return new Promise((resolve) => {
    console.log(question);

    if (helper) {
      console.log(chalk.hex('#757575')(helper));
    }

    return rl.question('> ', resolve);
  });
};
