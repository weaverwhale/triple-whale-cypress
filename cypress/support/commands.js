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

const urlPrefix = 'https://api.triplewhale.com/api/v2/'
Cypress.Commands.add('stubSummaryResponses', () => {
  // STATS
  cy.fixture('compare-stats.json').then((fixture) => {
    cy.intercept('POST', `${urlPrefix}/summary-page/compare-stats*`, (req) => {
      // fixture.mainDatePickerSelectionRange.start = req.periods[0].start
      // fixture.mainDatePickerSelectionRange.end = req.periods[0].end
      // fixture.stats[0].start = req.periods[0].start
      // fixture.stats[0].end = req.periods[0].end
      
      return {
        statusCode: 200,
        fixture: fixture
      }
    }).as('compare-stats')
  })

  cy.intercept('POST', `${urlPrefix}/attribution/get-all-stats*`, {
    statusCode: 200,
    fixture: 'get-all-stats.json'
  }).as('get-all-stats')

  cy.intercept('POST', `${urlPrefix}/attribution/get-order-stats-wrapper*`, {
    statusCode: 200,
    fixture: 'get-order-stats.json'
  }).as('get-order-stats-wrapper')

  // METRICS
  cy.intercept('POST', `${urlPrefix}/attribution/get-metrics*`, {
    statusCode: 200,
    fixture: 'metrics.json'
  }).as('get-metrics')

  cy.intercept('GET', `${urlPrefix}/**/metrics-data*`, {
    statusCode: 200,
    fixture: 'metrics.json'
  }).as('metrics-data')

  cy.intercept('POST', `${urlPrefix}/**/metrics/*`, {
    statusCode: 200,
    fixture: 'metrics.json'
  }).as('metrics-data')

  // FINANCE
  cy.intercept('GET', `${urlPrefix}/finance/codat/pnl/all`, {
    statusCode: 200,
    fixture: 'finance-pnl.json'
  }).as('finance-pnl')

  cy.intercept('GET', `${urlPrefix}/finance/plaid/all-balance`, {
    statusCode: 200,
    fixture: 'finance-balance.json'
  }).as('finance-balance')

  cy.intercept('GET', `${urlPrefix}/finance/codat/categories/all`, {
    statusCode: 200,
    fixture: 'finance-categories.json'
  }).as('finance-categories')

  cy.intercept('GET', `${urlPrefix}/finance/codat/transactions/all`, {
    statusCode: 200,
    fixture: 'finance-transactions.json'
  }).as('finance-transactions')

  // cy.intercept('GET', `${urlPrefix}/**/*`, { data: [] }).as('catch-all')
  // cy.intercept('POST', `${urlPrefix}/**/*`, { data: [] }).as('catch-all')

  cy.intercept('POST', '*ingest.sentry.io*', []).as('sentry')
})