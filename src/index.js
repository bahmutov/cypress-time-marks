/// <reference types="cypress" />

const format = require('format-duration')

Cypress.Commands.add(
  'timeMark',
  { prevSubject: 'optional' },
  (subject, name) => {
    if (typeof name !== 'string') {
      throw new Error('Expected a time mark name')
    }
    if (!name) {
      throw new Error('Expected a string time mark name')
    }
    const timestamp = new Date()
    const str = timestamp.toISOString()
    cy.log(`🌀 **${name}** at ${str}`)
    Cypress.env(name, timestamp)

    // pass the previous subject, if any
    cy.wrap(subject, { log: false })
  },
)

// we could take precision as a parameter
Cypress.Commands.add(
  'timeSince',
  { prevSubject: 'optional' },
  (subject, name, label) => {
    if (typeof name !== 'string') {
      throw new Error('Expected a time mark name')
    }
    if (!name) {
      throw new Error('Expected a string time mark name')
    }
    if (label) {
      if (typeof label !== 'string') {
        throw new Error('Label should be a string')
      }
    }

    const startedAt = Cypress.env(name)
    if (!startedAt) {
      throw new Error(`Cannot find time mark ${name}`)
    }
    const timestamp = new Date()
    const elapsed = timestamp - startedAt
    const formatted = format(elapsed, { leading: true })

    if (label) {
      cy.log(`🌀 ${formatted} ${label} since **${name}**`)
    } else {
      cy.log(`🌀 ${formatted} since **${name}**`)
    }

    // pass the previous subject, if any
    cy.wrap(subject, { log: false })
  },
)
