// cypress.config.js
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    username: "Admin",
    password: "admin123",
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
// cypress/support/commands.js
