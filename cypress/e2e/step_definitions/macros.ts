import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { eventCheckout } from '../../support/PageObjectModel/eventCheckout';
import { Login } from '../../support/PageObjectModel/Login';
import { Membership } from '../../support/PageObjectModel/Pricing';
import { macros } from '../../support/PageObjectModel/macrosCheckout';

const event = new eventCheckout();
const login = new Login();
const membership = new Membership();
const macrosPage = new macros();

// ✅ Global constants (adjust if you use env vars instead)
const email = Cypress.env('MacrosEmail');
const password = Cypress.env('MacrosPassword');

Given('I open the application URL', () => {
  login.DevUrl();
});

Given('I wait for {int} seconds', (seconds: number) => {
  cy.wait(seconds * 1000);
});

// Given('I open the hamburger menu', () => {
//   login.Hamburger();
// });

Given('I click the Sign In option', () => {
  login.Hamburger_Signin();
});

Given('I log in with valid Macros credentials', () => {
  login.enterEmail(email);
  login.enterPassword(password);
  login.clickLogin();
});

Given('I enter demo password', () => {
  login.enterDemoPassword2();
});

// Given('I cancel any active subscription gracefully', () => {
//   membership.cancelActiveSubscriptionGracefully();
// });

When('I navigate to the Macros page', () => {
  macrosPage.RedirecttoMacrosPage();
});

When('I click Buy Macros or Upgrade Plan button and handle flow accordingly', () => {
  macrosPage.differentiateUpgradePlanAndBuyMacros();
});

When('I click on the Plus Plan Monthly Buy button', () => {
  macrosPage.ClickOnPlusPlanMonthlyBuyButton();
});

When('I click the Upgrade Plan button in the modal', () => {
  macrosPage.UpgradePlanMacroButtonRedirect();
});

When('I click on the Pro Plan Monthly Buy button with confirm modal', () => {
  membership.clickOnProPlanMonthlyBuyButton();
});

When('I click on the Plus Plan Annual Buy button with confirm modal', () => {
  membership.clickOnPlusPlanAnnualBuyButtonWithConfirmModal();
});

When('I click on the Pro Plan Annual Buy button with confirm modal', () => {
  membership.clickOnProPlanAnnualBuyButtonWithConfirmModal();
});

When('I fill the event checkout form', () => {
  event.fillCheckoutForm();
});

When('I open the menu icon', () => {
  cy.get('.menu-icon > img').click();
});

When('I redirect to the Membership page', () => {
  membership.RedirectToMembershipPage();
});

When('I logout', () => {
  login.logout();
});

Then('I should be redirected to the thank-you page', () => {
  cy.url().should('include', 'https://reactdev.getinsights.org/');
});
