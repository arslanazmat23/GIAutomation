// cypress/support/step_definitions/signup_flow.steps.ts

import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { SignupPage } from '../../support/PageObjectModel/clientSignUp';
import { RoleSelectionPage } from '../../support/PageObjectModel/clientSignUp';

const signup = new SignupPage();
const roleSelection = new RoleSelectionPage();

// ------------- Background -------------
Given('the user is on the home page', () => {
  cy.visit('https://reactdev.getinsights.org');
  cy.wait(4000);
});

// ------------- Screen 1: Landing Page -------------
When('the user clicks {string} on the hero banner', (buttonText: string) => {
  cy.contains('button', buttonText).click();
});

// ------------- Screen 2: Get Started Page -------------
When('the user enters a valid email {string}', (email: string) => {
  cy.get('input[type="email"]').clear().type(email);
});

Then('the "LET\'S DO THIS" button is enabled', () => {
  cy.get('.form-holder > .btn').should('be.enabled');
});

When('the user clicks "Let’s Do This"', () => {
  cy.get('.form-holder > .btn').click();
});

Then('the first name and last name fields are visible', () => {
  cy.get('#inputField2').should('be.visible');
  cy.get('#inputField3').should('be.visible');
});

Then('the NEXT button on the name page is disabled', () => {
  cy.get('.form-holder > .btn').should('be.disabled');
});

// ------------- Screen 3: Name Input -------------
When('the user enters first name {string} and last name {string}', (firstName: string, lastName: string) => {
  cy.get('#inputField2').clear().type(firstName);
  cy.get('#inputField3').clear().type(lastName);
});

Then('the cell number field is visible', () => {
  cy.get('#inputField4').should('be.visible');
});

Then('the NEXT button on the cell page is disabled', () => {
  cy.get('.form-holder > .btn').should('be.disabled');
});

// ------------- Screen 4: Phone Number Input -------------
When('the user enters a valid cell number {string}', (cellNumber: string) => {
  cy.get("input[type='text']").clear({ force: true }).type(cellNumber, { force: true });
});

Then('the "NEXT" button is enabled', () => {
  cy.get('.form-holder > .btn').should('be.enabled');
});

When('the user clicks "NEXT"', () => {
  cy.get('.form-holder > .btn').click();
});

Then('the role selection radio buttons are visible', () => {
  cy.get('input[type="radio"]').its('length').should('be.gte', 1);
});

Then('the NEXT button on the role selection page is disabled', () => {
  cy.get('.signup_holder > .btn').should('be.disabled');
});

// ------------- Screen 5: Role Selection -------------
When('the user selects role {string}', (role: string) => {
  roleSelection.selectRole(role);
 
});

Then('the "NEXT" button on role selection Page is enabled', () => {
 roleSelection.nextButton().should('be.enabled');});

When('the user clicks "NEXT" on role Page', () => {
  roleSelection.nextButton().click();
});

Then('the password and confirm-password fields are visible', () => {
  cy.xpath("(//input[@type='password'])[1]").should('be.visible');
  cy.xpath("(//input[@type='password'])[2]").should('be.visible');
});

Then('the "Get Started" button is disabled', () => {
  cy.get('.col > .btn').should('be.disabled');
});

// ------------- Screen 6: Password & Agreements -------------
When('the user enters password {string} and confirms it', (password: string) => {
  cy.xpath("(//input[@type='password'])[1]").clear().type(password);
  cy.xpath("(//input[@type='password'])[2]").clear({ force: true }).type(password, { force: true });
});

When('the user checks the "Terms and Conditions" checkbox', () => {
  cy.get('ul > :nth-child(1) > label > :nth-child(2)').scrollIntoView().click({ force: true });
  //cy.get('input#c1').should('be.checked')
});

When('the user checks the "Code of Ethics" checkbox', () => {
  cy.get(':nth-child(2) > label > span').scrollIntoView().click({ force: true });
  //.should('be.checked');
});

When('the user clicks "Get Started"', () => {
  cy.contains('button', 'Get Started').click();
});

// ------------- Email Verification Prompt Fixture -------------

Then('the {string} should be displayed', (fixtureKey: string) => {
  cy.getTestData('prompt.json', fixtureKey).then(() => {
  cy.get('h2').should('be.visible');
  });
});

// ------------- Screen 7: Email Verification Prompt -------------
When('the user clicks "Continue"', () => {
  cy.wait(2000);
  cy.get('.signup_holder > .btn').click();
});

Then('the Membership Plans page should be displayed', () => {
  cy.url().should('include', '/pricing');
});

Then('the "Annual" tab should be selected', () => {
  cy.contains('.tab', 'Annual').should('have.class', 'active');
});

// ------------- Email Verification Step -------------
When('the user retrieves and visits their verification link for {string}', (email: string) => {
  signup.retrieveEmailVerificationLink(email);
});

Then('the email verification page should be displayed', () => {
  cy.url().should('include', '/ConfirmEmail');

});

When('the user clicks "Proceed" on the verification page', () => {
  cy.get('.email-verification-success-msg > .btn').click();
});

Then('the My Account page should be displayed', () => {
  cy.url().should('include', '/my-account');
  cy.get('h4 > img').should('be.visible');
});
