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

it('duration under 5 seconds', () => {
  // should show time in milliseconds
  cy.spy(cy, 'log').as('log')
  cy.timeMark('start').wait(4000).timeSince('start')
  cy.get('@log')
    .should('be.calledTwice')
    .invoke('getCalls')
    .should('have.length', 2)
    .invoke('map', (c) => c.args[0])
    .invoke({ timeout: 0 }, 'find', (msg) =>
      msg.match(/\s\d+ms since \*\*start\*\*/),
    )
    .should('be.an', 'string')
})

it('duration above 5 seconds', () => {
  // should show time in seconds
  cy.spy(cy, 'log').as('log')
  cy.timeMark('start').wait(5000).timeSince('start')
  cy.get('@log')
    .should('be.calledTwice')
    .invoke('getCalls')
    .should('have.length', 2)
    .invoke('map', (c) => c.args[0])
    .invoke({ timeout: 0 }, 'find', (msg) =>
      msg.match(/\s00:05 since \*\*start\*\*/),
    )
    .should('be.an', 'string')
})

// confirm the failing test when the time limit has been exceeded
describe.skip('fails the test', () => {
  it('fails the test if the elapsed time is above the limit', () => {
    cy.timeMark('start').wait(100).timeSince('start', 50, true)
  })

  it('fails the test if the elapsed time is above the limit (with label)', () => {
    cy.timeMark('start').wait(100).timeSince('start', 'waiting', 50, true)
  })
})
