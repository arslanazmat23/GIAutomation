import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import loginpage from '../../support/PageObjectModel/Login';

const credentials = Cypress.env('credentials');
let firstTime = true;

Given('I run login tests with all credentials', () => {
  credentials.forEach(({ email, password, isValid }: any) => {
    if (firstTime) {
      cy.visit(Cypress.env('baseDevUrl'));
      cy.wait(2000); // Wait for the page to load
      loginpage.enterDemoPassword(); // only once
      firstTime = false;
    }

    cy.log(`🔄 Running login for: ${email}`);

    cy.visit('https://reactdev.getinsights.org/my-account');
    loginpage.enterEmail(email);
    loginpage.enterPassword(password);
    loginpage.clickLogin();

    cy.intercept('POST', '**/CustomerLogin').as('loginRequest');
    cy.wait('@loginRequest').then((interception) => {
      const statusCode = interception?.response?.statusCode;
      const body = interception?.response?.body;

      if (statusCode !== 200 || !body?.sessiontoken) {
        const message = body?.Message || 'Unknown error';
        cy.log(`❌ Login failed for ${email} - ${message}`);

        cy.log(`🧾 Status: ${statusCode}`);
        cy.log(`🧾 Body: ${JSON.stringify(body)}`); // <-- Add this

        if (isValid) {
          // if true then email sent // if false then email not sent(known case)
          cy.task('sendEmail', {
            to: 'daniyal.waheed@nullbrainer.io',
            subject: '🚨 GetInsights Login Failed 🚨',
            text: `Login test failed!\nUser: ${email}\nStatus: ${statusCode}\nMessage: ${message}`,
          }).then((result) => {
            cy.log('📧 Email Sent: ' + result);
          });

          cy.wait(3000);
        }
      } else {
        cy.log(`✅ Login successful for ${email}`);
        cy.wait(3000);
      }

      cy.get('.menu-icon > img').click();
      // cy.get('.user_dropdown_link').should('be.visible').click();
      // Logout logic
      cy.get('body').then(($body) => {
        if ($body.text().includes('Hey,')) {
          cy.wait(2000);
          // cy.get('.menu-icon > img').click();
          cy.get('.user_dropdown > :nth-child(5) > a').should('be.visible').click();
        } else {
          cy.get('.other-page-menu > a > .btn').click();
        }
        cy.wait(2000);
      });
    });
  });
});
