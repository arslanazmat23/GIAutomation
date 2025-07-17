declare namespace Cypress {
  interface Chainable<Subject = any> {
    getIframeBody(iframeSelector: string): Chainable<JQuery<HTMLElement>>;
  }
}
declare namespace Cypress {
  interface Chainable {
    getTestData(fixture: string, key: string): Chainable<string>;
  }
}
