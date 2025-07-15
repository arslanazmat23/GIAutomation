import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { eventCheckout } from '../../support/PageObjectModel/eventCheckout';
import { Login } from '../../support/PageObjectModel/Login';
import { Membership } from '../../support/PageObjectModel/Pricing';

const event = new eventCheckout();
const login = new Login();
const membership = new Membership();

const email = Cypress.env('pricingEmail');
const password = Cypress.env('pricingPassword');

// ----------- Shared Steps -----------

Given('I navigate to the application URL', () => {
  login.DevUrl();
});

Given('I click the Hamburger menu', () => {
  login.Hamburger();
});

Given('I click on the Sign In option', () => {
  login.Hamburger_Signin();
});

Given('I enter the email', () => {
  login.enterEmail(email);
});

Given('I enter the password', () => {
  login.enterPassword(password);
});

Given('I click the login button', () => {
  login.clickLogin();
  cy.wait(2000);
});

Given('I enter the demo password', () => {
  login.enterDemoPassword2();
});

Given('I cancel any active subscription gracefully', () => {
  membership.cancelActiveSubscriptionGracefully();
});

Given('I navigate to the Membership page', () => {
  membership.RedirectToMembershipPage();
});

Then('I complete the checkout form', () => {
  event.fillCheckoutForm();
});

// ----------- Purchase Plan Buttons -----------

When('I click on the Plus Plan Monthly buy button', () => {
  membership.clickOnPlusPlanMonthlyBuyButton();
});

When('I click on the Pro Plan Monthly buy button', () => {
  membership.clickOnProPlanMonthlyBuyButton();
});

When('I click on the Plus Plan Annual buy button', () => {
  membership.clickOnPlusPlanAnnualBuyButton();
});

When('I click on the Pro Plan Annual buy button', () => {
  membership.clickOnProPlanAnnualBuyButton();
});
