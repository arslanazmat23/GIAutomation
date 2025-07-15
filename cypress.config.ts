import { defineConfig } from 'cypress';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import esbuildPlugin from '@badeball/cypress-cucumber-preprocessor/esbuild';
import nodemailer from 'nodemailer';
import MailosaurClient from 'mailosaur';

export default defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.feature',
    baseUrl: 'https://reactdev.getinsights.org/',
    chromeWebSecurity: false,

    setupNodeEvents(on, config) {
      // 1) Cucumber preprocessor setup
      addCucumberPreprocessorPlugin(on, config);
      on('file:preprocessor', createBundler({ plugins: [esbuildPlugin(config)] }));

      // 2) Register all tasks in one place
      on('task', {
        // Send email via Gmail
        async sendEmail({ to, subject, text }: { to: string; subject: string; text: string }) {
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: config.env.GMAIL_USER, // move credentials to env
              pass: config.env.GMAIL_PASS,
            },
          });
          const mailOptions = { from: config.env.GMAIL_USER, to, subject, text };
          try {
            const info = await transporter.sendMail(mailOptions);
            return `Email sent: ${info.response}`;
          } catch (err: any) {
            return `Email error: ${err.message}`;
          }
        },

        // Retrieve the Mailosaur message
        async getMailosaurMessage({ serverId, sentTo }: { serverId: string; sentTo: string }) {
          const client = new MailosaurClient(config.env.MAILOSAUR_API_KEY);
          const msg = await client.messages.get(serverId, { sentTo });
          // return only JSON-serializable fields
          return {
            id: msg.id,
            from: msg.from,
            subject: msg.subject,
            text: msg.text?.body ?? '',
            html: msg.html?.body ?? '',
            links: msg.html?.links ?? [],
          };
        },
      });

      // return the updated config
      return config;
    },
  },

  env: {
    MAILOSAUR_API_KEY: process.env.MAILOSAUR_API_KEY,
    MAILOSAUR_SERVER_ID: process.env.MAILOSAUR_SERVER_ID,
    GMAIL_USER: process.env.GMAIL_USER,
    GMAIL_PASS: process.env.GMAIL_PASS,
  },
});
