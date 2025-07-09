const baseURL = Cypress.env('baseDevURL');
const DemoPass = Cypress.env("DemoPass");
export class Login {

    DevUrl() {
        cy.visit('https://reactdev.getinsights.org/');
    }
    LiveUrl() {
        cy.visit('https://getinsights.org');
    }

    enterDemoPassword() {
        cy.get('.add_delete_points').should('be.visible');
        cy.get('#inputField1', { timeout: 10000 }).should("exist").type(DemoPass + "{Enter}", { force: true });
    }
    enterDemoPassword1() {
        cy.get('#inputField1', { timeout: 10000 }).should("exist").type(DemoPass + "{Enter}", { force: true });
    }

    enterDemoPassword2() {
        cy.get('body').then(($body) => {
            if ($body.find('.add_delete_points').length > 0) {
                cy.log('Demo password field found, proceeding with login');
                cy.get('#inputField1', { timeout: 10000 }).should("exist").type(DemoPass + "{Enter}", { force: true });
            } else {
                cy.log('No demo password field found, skipping demo login');
            }
        });
    }

    enterEmail(emailAddress: string) {
        cy.get('.upInputs > input', { timeout: 15000 }).clear().type(emailAddress);

    }

    enterPassword(password: string) {
        cy.get('#inputField2', { timeout: 10000 }).clear().type(password, { log: false });
    }

    enterhardcodedPassword() {
        cy.get('#inputField2', { timeout: 10000 }).clear().type("qQ112233@!", { log: false });
    }

    clickLogin() {
        cy.get('.col > .btn', { timeout: 15000 }).click();
    }

    Hamburger() {
        cy.get('.menu-icon > img', { timeout: 10000 }).click();
    }

    Hamburger_Signin() {
        cy.get('.other-page-menu > a > .btn', { timeout: 10000 }).click();
    }

    logout() {
        cy.get('.menu-icon > img').click(); // Click on the hamburger menu
        cy.get('.user_dropdown > :nth-child(5) > a').click(); // Click on Sign Out
        cy.wait(2000);
    }        
}
export default new Login();