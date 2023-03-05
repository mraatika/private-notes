const views = {
  main: `
        private-notes-cli [command] [type] <options>

        [command]
          add ............. Create a new [type]
          remove .......... Delete [type]
          update .......... Update [type]
          help ............ Show this help
          version ......... Display the app version
        `,
};

module.exports = function helpView(command) {
  switch (command) {
    default:
      return views.main;
  }
};
