require('dotenv').config();

const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Relatório de Testes',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    reportDir: 'cypress/relatorio',
  },
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL,

    watchForFileChanges: false,

    viewportWidth: 1366,
    viewportHeight: 768,
    screenshotOnRunFailure: true,
    video: false,
    failOnStatusCode: false,

    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.name === 'chrome') {
          launchOptions.args.push('--incognito');
          launchOptions.args.push('--disable-extensions');
          launchOptions.args.push(
            '--disable-component-extensions-with-background-pages',
          );
          launchOptions.args.push('--force-device-scale-factor=0.8');
        }

        return launchOptions;
      });

      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
  },
  defaultCommandTimeout: 15000,
});