/// <reference path="./index.d.ts" />

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

function formatDurationMs(ms) {
  if (ms < 2000) {
    return ms + 'ms'
  } else {
    return format(ms, { leading: true })
  }
}

// we could take precision as a parameter
Cypress.Commands.add(
  'timeSince',
  { prevSubject: 'optional' },
  (subject, name, label, timeLimit, throwError) => {
    if (typeof name !== 'string') {
      throw new Error('Expected a time mark name')
    }
    if (!name) {
      throw new Error('Expected a string time mark name')
    }

    if (typeof timeLimit === 'boolean') {
      throwError = timeLimit
      timeLimit = undefined
    }

    if (typeof label === 'number') {
      timeLimit = label
      label = undefined
    }
    console.log({
      name,
      label,
      timeLimit,
      throwError,
    })

    if (label) {
      if (typeof label !== 'string') {
        throw new Error('Label should be a string')
      }
    }
    if (typeof timeLimit !== 'undefined') {
      if (typeof timeLimit !== 'number') {
        throw new Error('Expected a time limit in milliseconds')
      }
      if (timeLimit < 0) {
        throw new Error(`Expected positive time limit, got ${timeLimit}`)
      }
    }

    const startedAt = Cypress.env(name)
    if (!startedAt) {
      throw new Error(`Cannot find time mark ${name}`)
    }
    const timestamp = new Date()
    const elapsed = timestamp - startedAt
    const formatted = formatDurationMs(elapsed)

    if (label) {
      if (timeLimit && elapsed > timeLimit) {
        cy.log(
          `🆘 ${formatted} ${label} since **${name}** (above the time limit ${timeLimit}ms)`,
        )
        if (throwError) {
          cy.log('**cypress-time-marks throwing an error**').then(() => {
            const msg = `🆘 ${formatted} ${label} since ${name} (above the time limit ${timeLimit}ms)`
            throw new Error(msg)
          })
        }
      } else {
        cy.log(`🌀 ${formatted} ${label} since **${name}**`)
      }
    } else {
      if (timeLimit && elapsed > timeLimit) {
        cy.log(
          `🆘 ${formatted} since **${name}** (above the time limit ${timeLimit}ms)`,
        )
        if (throwError) {
          cy.log('**cypress-time-marks throwing an error**').then(() => {
            const msg = `🆘 ${formatted} since ${name} (above the time limit ${timeLimit}ms)`
            throw new Error(msg)
          })
        }
      } else {
        cy.log(`🌀 ${formatted} since **${name}**`)
      }
    }

    // pass the previous subject, if any
    cy.wrap(subject, { log: false })
  },
)
