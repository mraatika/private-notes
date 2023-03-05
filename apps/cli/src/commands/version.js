const render = require('../renderer');
const versionView = require('../views/version');

module.exports = function run() {
  return render(versionView());
};
