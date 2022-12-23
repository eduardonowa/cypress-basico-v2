// ***********************************************
// This example commands.js shows you how to
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

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
  cy.get('#firstName').type('Eduardo');
  cy.get('#lastName').type('Nowakoski');
  cy.get('#email').type('eduardo_nowa@hotmail.com');
  cy.get('#open-text-area').type('Estou com problemas no meu acesso');
  cy.contains('button[type="submit"]', 'Enviar').click();
  cy.get('.success').should('be.visible');
});
