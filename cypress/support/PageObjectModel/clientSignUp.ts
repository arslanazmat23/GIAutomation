export class SignupPage {
  retrieveEmailVerificationLink(toAddress: string) {
    const serverId = Cypress.env('MAILOSAUR_SERVER_ID') as string;

    cy.task('getMailosaurMessage', { serverId, sentTo: toAddress }).then((email: any) => {
      // make sure body is a string
      const body = (email.html?.body ?? email.text?.body) as string;
      if (typeof body !== 'string') {
        throw new Error(`Email body was empty for ${toAddress}`);
      }

      const match = body.match(/https?:\/\/\S+/);
      if (!match) {
        throw new Error(`No link found in email for ${toAddress}`);
      }

      const verificationLink = match[0];
      // 3) Now you have a link:
      cy.log(`Visiting verification link → ${verificationLink}`);
      cy.visit(verificationLink, { failOnStatusCode: false });
      cy.contains('Your email address is verified.').should('be.visible');
    });
  }
}
