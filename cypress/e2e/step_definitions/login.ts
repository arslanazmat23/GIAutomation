import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../../support/PageObjectModel/LoginPage';
//import DashboardPage from "../../support/PageObjectModel/Dashboard_Redirection";

const customerEmail = Cypress.env('customerEmail');
const customerPassword = Cypress.env('customerPassword');
const adminEmail = Cypress.env('AdminEmail');
const adminPassword = Cypress.env('AdminPassword');

Given('I open the login page', () => {
  LoginPage.visitLoginPage(); // Visit the login page using the method from LoginPage
});

When('I enter customer valid credentials', () => {
  LoginPage.enterDemoPassword1(); // Call the method to perform login steps
  LoginPage.enterEmail(customerEmail); // Enter email using the method from LoginPage
  LoginPage.enterPassword(customerPassword); // Enter password using the method from LoginPage
});

When('I enter admin valid credentials', () => {
  LoginPage.enterDemoPassword1(); // Call the method to perform login steps
  LoginPage.enterEmail(adminEmail); // Enter email using the method from LoginPage
  LoginPage.enterPassword(adminPassword); // Enter password using the method from LoginPage
});

// When("I click the login button", () => {
//     LoginPage.clickLoginButton(); // Click the login button using the method from LoginPage
// });

Then('I should be redirected to the HomePage', () => {
  //check if the dashboard is displayed after login
  cy.wait(3000); // Wait for the page to load
  LoginPage.verifyDashboard();
});
Then('I should be redirected to the Admin Dashboard', () => {
  // Here you can add assertions to verify that the admin dashboard is displayed
  LoginPage.VerifyAdminDashboard(); // Verify the admin dashboard using the method from LoginPage
});
