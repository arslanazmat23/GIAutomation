import { Login } from './Login';

// Instantiate your Login POM
const login = new Login();

export class Membership {
  RedirectToMembershipPage(): void {
    cy.get('.menu-icon > img').click();
    cy.get('.onepress-menu-mobile > :nth-child(3) > a', { timeout: 30000 }).click({ force: true });
    cy.url().should('include', '/pricing');
  }

  clickOnPlusPlanMonthlyBuyButton(): void {
    cy.get("div[class='FilterPlans'] li:nth-child(1)").click(); // click on the Monthly toggle
    cy.get(':nth-child(1) > .plan-card > .buy > .btn').click(); // click on the Plus Plan Monthly buy button
    cy.url().should('include', '/my-account');
  }

  clickOnProPlanMonthlyBuyButton(): void {
    cy.get("div[class='FilterPlans'] li:nth-child(1)").click(); // click on the Monthly toggle
    cy.get(':nth-child(2) > .plan-card > .buy > .btn').click(); // click on the Pro Plan Monthly buy button
    cy.get('.modal-footer > :nth-child(2)').should('be.visible').click(); // click on the Confirm button in the modal
    cy.url().should('include', '/my-account');
  }

  clickOnProPlanMonthlyBuyButtonWithConfirmModal(): void {
    cy.wait(1000);
    cy.get(':nth-child(2) > .plan-card > .buy > .btn').should('be.visible').click();
    cy.get('.modal-footer > :nth-child(2)').click();
    cy.url().should('include', '/my-account');
  }

  clickOnPlusPlanAnnualBuyButton(): void {
    cy.wait(1000);
    cy.get(':nth-child(1) > .plan-card > .buy > .btn').click();
  }

  clickOnPlusPlanAnnualBuyButtonWithConfirmModal(): void {
    cy.wait(1000);
    cy.get(':nth-child(1) > .plan-card > .buy > .btn').should('be.visible').click();
    cy.get('.modal-footer > :nth-child(2)').click();
    cy.url().should('include', '/my-account');
  }

  clickOnProPlanAnnualBuyButton(): void {
    cy.wait(1000);
    cy.get(':nth-child(2) > .plan-card > .buy > .btn').click();
  }

  clickOnProPlanAnnualBuyButtonWithConfirmModal(): void {
    cy.wait(1000);
    cy.get(':nth-child(2) > .plan-card > .buy > .btn').should('be.visible').click();
    cy.get('.modal-footer > :nth-child(2)').click();
  }

  RedirectToMyAccountPage(): void {
    cy.wait(3000);
    cy.get('.menu-icon > img', { timeout: 10000 }).click(); // click on hamburger menu icon
    cy.get('.user_dropdown > :nth-child(2) > a', { timeout: 10000 }).click(); // Click on My Account link
    cy.get('.tabs > :nth-child(2)', { timeout: 10000 }).click(); // click on subscription tab
  }

  cancelActiveSubscriptionGracefully(): void {
    this.RedirectToMyAccountPage();
    cy.wait(2000);

    cy.get('body').then(($body) => {
      if ($body.find('.status_Active > p').length > 0) {
        cy.log('Active subscription found. Proceeding to downgrade to no plan.');

        cy.get('.menu-icon > img').should('be.visible');
        cy.wait(1000);
        cy.get('.onepress-menu-mobile > :nth-child(3) > a').should('be.visible').click({ force: true });

        cy.url()
          .should('include', '/pricing')
          .then(() => {
            cy.get("div[class='FilterPlans'] li:nth-child(1)").click(); // click on the Monthly toggle
            cy.get(
              'body > div:nth-child(2) > div:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > button:nth-child(1)'
            ).then(($button) => {
              if ($button.is(':disabled')) {
                cy.log('Downgrade button is disabled — clicking fallback buy button.');
                cy.get(':nth-child(2) > .plan-card > .buy > .btn').click(); //Pro Plan Monthly Buy button
              } else {
                cy.log('Pro Plan Monthly Upgrade button not found...');
                cy.get(
                  'body > div:nth-child(2) > div:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > button:nth-child(1)'
                ).click(); // click on the Plus Plan Monthly Downgrade button
              }
            });
            cy.get('.modal-footer > :nth-child(2)').click();
            cy.wait(2000);
            cy.log('Subscription downgraded to no active plan (via modal Confirm button).');
            login.logout();
          });
      } else if ($body.find('.status_PendingCancellation > p').length > 0) {
        cy.log('Pending Cancellation subscription found. Proceeding to downgrade to no plan.');

        cy.get('.menu-icon > img').click();
        cy.get('.onepress-menu-mobile > :nth-child(3) > a').click({ force: true });

        cy.url()
          .should('include', '/pricing')
          .then(() => {
            cy.get("div[class='FilterPlans'] li:nth-child(1)").click(); // click on the Monthly toggle
            cy.get(
              'body > div:nth-child(2) > div:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > button:nth-child(1)'
            ).click(); // click on the Plus Plan Monthly Downgrade button
            cy.get('.modal-footer > :nth-child(2)').click();
            cy.wait(2000);
            cy.log('Subscription downgraded to no active plan (via modal Confirm button).');
            login.logout();
          });
      } else if (
        $body.find('.col-lg-8 > .h3').filter((i, el) => {
          return Cypress.$(el).text().includes('Plus Plan (Monthly)');
        }).length > 0
      ) {
        cy.log('Active Plus Plan (Monthly) subscription found. Proceeding to downgrade to no plan.');
        cy.get('.change').click();
        cy.get("div[class='FilterPlans'] li:nth-child(1)").click(); // click on the Monthly toggle
        cy.get(
          'body > div:nth-child(2) > div:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(4) > button:nth-child(1)'
        ).click(); // click on the PRO Plan Monthly Upgrade button
        cy.get('.modal-footer > :nth-child(2)').click();
        cy.wait(2000);
        cy.log('Subscription upgrade to no active plan (via modal Confirm button).');
        login.logout();
      } else if ($body.text().includes('No Active Plan')) {
        cy.log('No active subscription found. Logging out.');
        login.logout();
      } else {
        cy.log('Unable to determine subscription state.');
      }
    });
  }
}
// Usage example
