declare namespace Cypress {
  interface Chainable<Subject = any> {
    getIframeBody(iframeSelector: string): Chainable<JQuery<HTMLElement>>;
  }
}
