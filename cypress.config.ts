import { defineConfig } from "cypress";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import esbuildPlugin from "@badeball/cypress-cucumber-preprocessor/esbuild";
import MailosaurClient from "mailosaur";

export default defineConfig({
  e2e: {
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      addCucumberPreprocessorPlugin(on, config);
      on("file:preprocessor", createBundler({ plugins: [esbuildPlugin(config)] }));

      const mailosaur = new MailosaurClient(config.env.MAILOSAUR_API_KEY);

      on("task", {
        async getMailosaurMessage({ serverId, sentTo }) {
          const message = await mailosaur.messages.get(serverId, {
            sentTo,
          });
          return message;
        },
      });

      return config;
    },
    specPattern: "cypress/e2e/**/*.feature",
    baseUrl: "https://reactdev.getinsights.org/", // change as needed
    //stepDefinitions: "cypress/step_definitions/**/*.ts"
    
  },
  env: {
      MAILOSAUR_API_KEY: "HCaQwBZ6crMhw7H3sGBGCwhBKCyCKnIn",
      MAILOSAUR_SERVER_ID: "wrijtpjg",
    } 
});