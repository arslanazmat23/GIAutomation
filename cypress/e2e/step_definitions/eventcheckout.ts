import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { eventCheckout } from '../../support/PageObjectModel/eventCheckout';
import Login from '../../support/PageObjectModel/Login';

// const login = new Login();
const event = new eventCheckout();

const email = Cypress.env('email');
const password = Cypress.env('password');

Given('I visit the login page', () => {
  Login.DevUrl();
});

Given('I enter the demo password in Event Checkout', () => {
  Login.enterDemoPassword1();
});

Given('I open the hamburger menu', () => {
  Login.Hamburger();
});

Given('I select the sign-in option', () => {
  Login.Hamburger_Signin();
});

Given('I log in with valid credentials', () => {
  Login.enterEmail(email);
  Login.enterPassword(password);
  Login.clickLogin();
  cy.wait(7000);
});

When('I navigate to the Events section from the hamburger menu', () => {
  Login.Hamburger();
  cy.wait(4000);
  event.clickHamburgerEvents();
});

When('I click the "Register Now" button', () => {
  cy.wait(2000);
  event.clickRegisterNowButton();
});

When('I add {int} attendee', (count: number) => {
  event.addAttendees(count);
});

When('I fill attendee {int} details with {string} as the attendance type', (index: number, type: string) => {
  // 'index' will be the integer (e.g., 1)
  // 'type' will be the string (e.g., "In Person")
  cy.wait(3000);
  event.fillFirstAttendeeDetails(type);
});

When('I fill attendee {int} details with {string} as the attendance type.', (index: number, type1: string) => {
  cy.wait(3000);
  event.fillSecondAttendeeDetails(type1);
});

When('I click "Proceed to Checkout"', () => {
  event.preCheckout();
  cy.wait(5000);
  event.clickProceedToCheckout();
});

When('I fill out the checkout form with the address checkbox checked', () => {
  event.fillCheckoutForm_with_Checked_Checkbox();
});

When('I fill out the checkout form with the address checkbox unchecked', () => {
  event.fillCheckoutForm();
});

Then('I should see the receipt page after successful checkout', () => {
  cy.wait(5000);
  event.checkoutReceipt();
});

When('I add {int} attendees', (count: number) => {
  event.addAttendees(count);
});
