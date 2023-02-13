Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})

beforeEach(() => {
  cy.stubSummaryResponses()
})

before(() => {
  cy.login()
  cy.madisonPod()
})

describe('summary page', () => {
  it('should have a menu item', () => {
    cy.get('.menuItem')
  })
})
