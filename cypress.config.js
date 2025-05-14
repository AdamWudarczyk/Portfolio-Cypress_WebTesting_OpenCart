const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
    baseUrl: 'https://www.saucedemo.com',
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      charts: true,
      reportPageTitle: 'SauceDemo Cypress Report',
      embeddedScreenshots: true,
      inlineAssets: true,
    },
  },
});