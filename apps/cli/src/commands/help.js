const render = require('../renderer');
const helpView = require('../views/help');

module.exports = function run() {
  return render(helpView());
};
