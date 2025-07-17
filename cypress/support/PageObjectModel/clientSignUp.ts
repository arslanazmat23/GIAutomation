export class SignupPage {
  retrieveEmailVerificationLink(toAddress: string) {
    const serverId = Cypress.env('MAILOSAUR_SERVER_ID') as string;

    cy.task('getMailosaurMessage', { serverId, sentTo: toAddress })
      .then((email: any) => {
        // 1) Pull Mailosaur’s parsed <a href> links
        const parsed: Array<{ href: string }> = email.html?.links ?? [];

        // 2) Find the one whose href ends up on your ConfirmEmail route
        let verificationLink = parsed
          .map(l => l.href)
          .find(h => h.includes('/ConfirmEmail?'));

        // 3) Fallback: raw‑HTML regex for exactly that path
        if (!verificationLink) {
          const body = email.html?.body ?? email.text ?? '';
          const rx = /https?:\/\/reactdev\.getinsights\.org\/ConfirmEmail\?[^\s"'<>]+/;
          verificationLink = body.match(rx)?.[0];
        }

        if (!verificationLink) {
          throw new Error(
            `No confirmation link found for ${toAddress}.\nParsed links: ${JSON.stringify(parsed, null, 2)}`
          );
        }

        cy.log(`Visiting confirmation URL → ${verificationLink}`);
        cy.visit(verificationLink, { failOnStatusCode: false });
        cy.get('.email-verification-success-msg > h4').should('be.visible');
      });
  }
}
