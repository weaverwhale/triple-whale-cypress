// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('login', () => { 
  cy.fixture('login.json').then((user) => {
    const { email, password } = user
    cy.visit('https://app.triplewhale.com/signin')
    cy.wait(500)

    // login
    if (Cypress.$('input[type="email"]').length > 0) {
      cy.get('input[type="email"]').type(email)
      cy.get('input[type="password"]').type(password)
      cy.get('button[type="button"]').click()

    }
  })
})

Cypress.Commands.add('madisonPod', () => { 
  cy.visit('https://app.triplewhale.com/all-shops-admin')
  cy.wait(1000)

  // if logged in, go to madison
  cy.get('.search-container input').type('madison')
  cy.get('.admin-shop-card button').click()
})

const urlPrefix = 'https://app.triplewhale.com/api/v2/'
Cypress.Commands.add('stubSummaryResponses', () => {
  cy.intercept('POST', `${urlPrefix}/summary-page/compare-stats*`, {
    statusCode: 200,
    fixture: 'compare-stats.json'
  }).as('compare-stats')

  cy.intercept('POST', `${urlPrefix}/attribution/get-all-stats*`, {
    statusCode: 200,
    fixture: 'get-all-stats.json'
  }).as('get-all-stats')

  cy.intercept('POST', `${urlPrefix}/attribution/get-metrics*`, {
    statusCode: 200,
    fixture: 'get-metrics.json'
  }).as('get-metrics')

  cy.intercept('GET', `${urlPrefix}/tw-metrics/metrics-data*`, {
    statusCode: 200,
    fixture: 'metrics-data.json'
  }).as('metrics-data')

  cy.intercept('POST', `${urlPrefix}/metrics-table/metrics-data*`, {
    statusCode: 200,
    fixture: 'metrics-data.json'
  }).as('metrics-data')

  cy.intercept('GET', `${urlPrefix}/**/*`, []).as('catch-all')
  cy.intercept('POST', `${urlPrefix}/**/*`, []).as('catch-all')

  cy.intercept('POST', '*ingest.sentry.io*', []).as('sentry')
})