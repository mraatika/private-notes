module.exports = async function run(type) {
  switch (type) {
    case 'collection':
      console.log('list collections');
      break;
    default:
      throw new Error(`No such resource: ${type}!`);
  }
};
