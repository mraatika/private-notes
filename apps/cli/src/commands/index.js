const commands = [
  'add',
  'update',
  'remove',
  'list',
  'get',
  'version',
  'help',
  'exit',
];

const resourceTypes = ['collection', 'note'];

function validateResourceType(type) {
  if (!type || !resourceTypes.includes(type)) {
    throw new Error(`No such resource type: ${type}`);
  }
}

async function runCommand(command, type) {
  switch (command) {
    case 'list':
      validateResourceType(type);
      return require('./list')(type);
    case 'version':
      return require('./version')();
    case 'exit':
      return require('./exit')();
    default:
      return require('./help')();
  }
}

module.exports = {
  runCommand,
  commands,
  resourceTypes,
};
