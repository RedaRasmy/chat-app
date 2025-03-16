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

// Cypress.Commands.add('login',(username,password) =>{
//     cy.session([username,password],()=>{
//         cy.visit('/')
//         cy.url().should('include','https://chatappbyreda.kinde.com')
//         cy.get('input[id="sign_up_sign_in_credentials_p_username"]').type(username)
//         cy.get('button[type="submit"]').click()
//         cy.get('input[id="verify_password_p_password"]').type(password)
//         cy.get('button[data-kinde-button="true"]').click()
//         cy.wait(1000)
//         cy.get('[data-testid="chatApp"]').should("exist")
//     })
// })