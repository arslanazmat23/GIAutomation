/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add(
  'getIframeBody',
  (iframeSelector: string): Cypress.Chainable<JQuery<HTMLElement>> => {
    return cy
      .get(iframeSelector)
      .its('0.contentDocument.body').should('not.be.empty')
      .then((body) => cy.wrap(body as JQuery<HTMLElement>));
  }
);

declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Custom command to get the body of an iframe.
     * It waits for the iframe's contentDocument and body to be fully loaded.
     * @example cy.getIframeBody('iframe#stripe-card-element').find('.card-number-input').type('1234...');
     */
    getIframeBody(iframeSelector: string): Chainable<JQuery<HTMLElement>>;
  }
}

Cypress.Commands.add('getIframeBody', (iframeSelector) => {
  // Get the iframe element and ensure it's visible
  return cy.get(iframeSelector, { timeout: 10000 })
    .should('be.visible') // Ensure the iframe element itself is in the DOM and visible
    .then($iframe => {
      // Use a Cypress Promise to poll until the iframe's contentDocument.body is ready
      // Explicitly type the resolve function to ensure it resolves with JQuery<HTMLElement>
      return new Cypress.Promise<JQuery<HTMLElement>>(resolve => {
        const checkIframeContent = () => {
          const contentDocument = $iframe.prop('contentDocument');
          // Check if contentDocument exists, its readyState is 'complete', and its body is available
          if (contentDocument && contentDocument.readyState === 'complete' && contentDocument.body) {
            // Resolve the promise with the iframe's body wrapped in a Cypress JQuery object
            resolve(Cypress.$(contentDocument.body));
          } else {
            // If not ready, retry after a short delay
            setTimeout(checkIframeContent, 100);
          }
        };
        checkIframeContent(); // Start checking
      });
    }); // The promise itself returns Chainable<JQuery<HTMLElement>>
});