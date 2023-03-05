const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

function readVersion() {
  const packageJSON = fs.readFileSync(
    path.resolve(__dirname, '../../package.json'),
    'utf-8',
  );
  const json = JSON.parse(packageJSON);
  return json.version;
}

module.exports = function versionView() {
  return chalk.green(`private-notes-cli v${readVersion()}`);
};
