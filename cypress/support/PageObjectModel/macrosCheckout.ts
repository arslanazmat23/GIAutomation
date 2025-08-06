// cypress/support/Pages/macros.ts

import { Membership } from './Pricing';
import { eventCheckout } from './eventCheckout';

// ✅ Instantiate other page objects
const membership = new Membership();
const eventPage = new eventCheckout();

export class macros {
  RedirecttoMacrosPage(): void {
    cy.get('.menu-icon > img').should('be.visible').click();
    cy.get('.onepress-menu-mobile > :nth-child(5) > span').should('be.visible').click({ force: true });
    cy.get('.sub-menu > :nth-child(5) > a').click({ force: true });
    cy.url().should('include', '/macros');
  }

  differentiateUpgradePlanAndBuyMacros(): void {
    //cy.get(':nth-child(1) > .data-section > .main-content > .content-right > .download > .btn').click();
    cy.wait(5000);
    cy.get(':nth-child(1) > .col-xl-8 > :nth-child(1) > .col-5 > .download > .btn, :nth-child(1) > .data-section > .main-content > .content-right > .download > .btn', { timeout: 15000 }).click();
    cy.wait(2000);

    cy.get('body').then(($body) => {
      if ($body.find('.modal-footer > :nth-child(1)').length > 0) {
        cy.get('.modal-footer > :nth-child(1)').click();
        cy.log('Upgrade button clicked');
      } else {
        cy.log('Upgrade button not present, skipping...');
      }
    });

    cy.wait(3000);
    cy.url().then((currentUrl: string) => {
      if (currentUrl.includes('/macros')) {
        cy.wait(5000);
        this.loopCheckAndBuyMacro();
      } else if (currentUrl.includes('/pricing')) {
        membership.clickOnPlusPlanMonthlyBuyButton();
        cy.wait(2000);
        eventPage.fillCheckoutForm();
      } else {
        cy.log('Unknown redirection URL: ' + currentUrl);
      }
    });
  }

  loopCheckAndBuyMacro(): void {
    const checkAndBuy = (): void => {
      cy.get('body').then(($body) => {
        const alertBox = $body.find('.form-group.alert.alert-danger');
        const buyBtnExists = $body.find('.BUY > .btn').length > 0;

        if (
          alertBox.length > 0 &&
          alertBox.is(':visible') &&
          alertBox.text().includes('You have already Bought this Macro Product')
        ) {
          cy.log('Macro already purchased');
          this.RedirecttoMacrosPage();

              cy.get(':nth-child(1) > .col-xl-8 > :nth-child(1) > .col-5 > .download > .btn, :nth-child(1) > .data-section > .main-content > .content-right > .download > .btn', { timeout: 10000 })
            .should('be.visible')

            .click()
            .then(() => {
              cy.wait(2000);

              if ($body.find('.modal-footer > :nth-child(1)').length > 0) {
                cy.get('.modal-footer > :nth-child(1)').click();
                cy.log('Upgrade button clicked');
              } else {
                cy.log('Upgrade button not present, skipping...');
              }

              cy.wait(2000);

              cy.get('body').then(($newBody) => {
                if ($newBody.find('.BUY > .btn').length > 0) {
                  cy.get('.BUY > .btn').click();
                  cy.log('Buy/Download button clicked');
                  cy.wait(2000);

                  cy.url().then((url) => {
                    if (url.includes('/checkout')) {
                      cy.log('Redirected to checkout — was Buy button');
                      eventPage.fillCheckoutForm();
                    } else {
                      cy.log('Still on macros page — was Download button');
                    }
                  });
                } else {
                  cy.log('Buy/Download button not found after redirect.');
                  cy.wait(1000);
                  checkAndBuy();
                }
              });
            });
        } else if (buyBtnExists) {
          cy.get('.BUY > .btn').click();
          cy.wait(2000);

          cy.url().then((url) => {
            if (url.includes('/checkout')) {
              cy.log('Redirected to checkout — was Buy button');
              eventPage.fillCheckoutForm();
            } else {
              cy.log('Still on macros page — was Download button');
            }
          });
        } else {
          cy.log('Neither alert nor buy/download button found — exiting.');
        }
      });
    };

    checkAndBuy();
  }

  ContinueAnywaybuyMacroButtonRedirect(): void {
    cy.get(':nth-child(1) > .col-xl-8 > :nth-child(1) > .col-5 > .download > .btn').click();
    cy.wait(2000);
    cy.get('.modal-footer > :nth-child(1)').click();
    cy.wait(2000);

    cy.get('body').then(($body) => {
      if ($body.text().includes('You have already Bought this Macro Product')) {
        cy.log('Macro already purchased');
        this.RedirecttoMacrosPage();
        cy.get('.BUY > .btn').click();
        cy.log('Buy/Download button clicked');
      } else {
        cy.get('.BUY > .btn').click();
        cy.log('Buy/Download button clicked');
      }
    });
  }

  UpgradePlanMacroButtonRedirect(): void {
    cy.get(':nth-child(1) > .data-section > .main-content > .content-right > .download > .btn').click();
    cy.wait(2000);
    cy.get('.modal-footer > :nth-child(2)').click();
    cy.wait(2000);
  }

  ClickOnPlusPlanMonthlyBuyButton(): void {
    cy.wait(2000);
    cy.get("div[class='FilterPlans'] li:nth-child(1)").click(); // click on the Monthly toggle
    cy.get(':nth-child(1) > .plan-card > .buy > .btn').should('be.visible').click(); //click on the Plus Plan Monthly Buy button
    cy.wait(2000);
  }
}
