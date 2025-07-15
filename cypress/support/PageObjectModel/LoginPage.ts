import cypress from 'cypress';

const baseURL = Cypress.env('baseDevUrl');
const DemoPass = Cypress.env('DemoPass');
const Email = Cypress.env('email');
const Password = Cypress.env('password');

class LoginPage {
  visitLoginPage() {
    cy.visit(`${baseURL}/my-account`);
  }

  navigateToLogin() {
    const DemoPass = Cypress.env('DemoPass');
    cy.get('#inputField1', { timeout: 10000 })
      .should('exist')
      .type(DemoPass + '{Enter}', { force: true });

    cy.get('.menu-icon > img').should('be.visible').click();
    cy.get('.other-page-menu > a > .btn').should('be.visible').click();

    cy.wait(3000); // Consider using dynamic waiting instead
  }

  enterDemoPassword1() {
    const DemoPass = Cypress.env('DemoPass');
    cy.get('#inputField1', { timeout: 10000 })
      .should('exist')
      .type(DemoPass + '{Enter}', { force: true });
  }

  enterEmail(email: string) {
    cy.get("input[name='Email']").should('be.visible').type(Email);
  }

  enterPassword(password: string) {
    cy.get("input[name='Password']").should('be.visible').type(Password);
  }

  clickLoginButton() {
    cy.get("button[type='submit']").should('be.visible').click();
  }

  verifyDashboard() {
    cy.wait(3000);
    cy.url().should('include', baseURL);
  }

  VerifyAdminDashboard() {
    cy.url().should('include', baseURL + '/gi-team/dashboard');
  }
}

export default new LoginPage();
