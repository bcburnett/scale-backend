// eslint-disable-next-line spaced-comment
/// <reference types="Cypress" />
context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8081');
  });

  describe('Implicit Assertions', () => {
    it('the inner html of the h1 element of the custom element should be scale-backend', () => {
      // https://on.cypress.io/should
      cy.shadowGet('scale-backend')
          .shadowFind('h1')
          .shadowContains('scale-backend');
    });

    it('the state should be {app{myapp: "scale-backend"', () => {
      // https://on.cypress.io/should
      cy.window()
          .its('store')
          .invoke('getState')
          .should((e) => {
            expect(e.app.myapp).to.equal('scale-backend');
          });
    });
  });
});
