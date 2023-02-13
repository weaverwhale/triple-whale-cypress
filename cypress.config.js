const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1440,
  viewportHeight: 1080,
  e2e: {
    setupNodeEvents(on, config) {
      on('before:browser:launch', () => {
        if(config.env.demo) {
          // @TODO
        }
      })
    },
  },
});
