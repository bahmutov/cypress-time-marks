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

it('supports labels', () => {
  cy.timeMark('start')
    .wait(1500)
    .timeSince('start', 'initial wait')
    .wait(500)
    .timeSince('start', 'final load')
})

it('warns about time limit', () => {
  cy.timeMark('start')
    .wait(100)
    .timeSince('start', 'under time limit', 200)
    .wait(500)
    .timeSince('start', 'over time limit', 200)
    .timeSince('start', 200)
})
