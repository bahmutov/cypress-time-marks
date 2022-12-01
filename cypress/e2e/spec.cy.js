/// <reference types="cypress" />

import '../../src'

it('shows the time since the time mark', () => {
  cy.timeMark('start')
    .wait(1500)
    .timeSince('start')
    .wait(500)
    .timeSince('start')
})

it('keeps the original subject', () => {
  cy.wrap('hello')
    .timeMark('start')
    .should('equal', 'hello')
    .wait(500)
    .timeSince('start')
    .should('equal', 'hello')
})

it('supports multiple marks', () => {
  cy.timeMark('a1')
    .wait(1000)
    .timeMark('a2')
    .wait(1000)
    .timeSince('a1')
    .timeSince('a2')
})
