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
  if (ms < 5000) {
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

    // for debugging only
    // console.log({
    //   name,
    //   label,
    //   timeLimit,
    //   throwError,
    // })

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

Cypress.Commands.add(
  'timeBetween',
  { prevSubject: 'optional' },
  (subject, mark1, mark2, label, timeLimit, throwError) => {
    if (typeof mark1 !== 'string') {
      throw new Error('Expected a starting time mark name')
    }
    if (!mark1) {
      throw new Error('Expected a starting string time mark name')
    }
    if (typeof mark2 !== 'string') {
      throw new Error('Expected a finishing time mark name')
    }
    if (!mark2) {
      throw new Error('Expected a finishing string time mark name')
    }

    if (typeof timeLimit === 'boolean') {
      throwError = timeLimit
      timeLimit = undefined
    }

    if (typeof label === 'number') {
      timeLimit = label
      label = undefined
    }

    // for debugging only
    // console.log({
    //   name,
    //   label,
    //   timeLimit,
    //   throwError,
    // })

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

    const startedAt = Cypress.env(mark1)
    if (!startedAt) {
      throw new Error(`Cannot find the starting time mark ${mark1}`)
    }
    const timestamp = Cypress.env(mark2)
    if (!timestamp) {
      throw new Error(`Cannot find the finishing time mark ${mark2}`)
    }
    const elapsed = timestamp - startedAt
    const formatted = formatDurationMs(elapsed)

    if (label) {
      if (timeLimit && elapsed > timeLimit) {
        cy.log(
          `🆘 ${formatted} ${label} between **${mark1}** and **${mark2}** (above the time limit ${timeLimit}ms)`,
        )
        if (throwError) {
          cy.log('**cypress-time-marks throwing an error**').then(() => {
            const msg = `🆘 ${formatted} ${label} between **${mark1}** and **${mark2}** (above the time limit ${timeLimit}ms)`
            throw new Error(msg)
          })
        }
      } else {
        cy.log(`🌀 ${formatted} ${label} between **${mark1}** and **${mark2}**`)
      }
    } else {
      if (timeLimit && elapsed > timeLimit) {
        cy.log(
          `🆘 ${formatted} between **${mark1}** and **${mark2}** (above the time limit ${timeLimit}ms)`,
        )
        if (throwError) {
          cy.log('**cypress-time-marks throwing an error**').then(() => {
            const msg = `🆘 ${formatted} between **${mark1}** and **${mark2}** (above the time limit ${timeLimit}ms)`
            throw new Error(msg)
          })
        }
      } else {
        cy.log(`🌀 ${formatted} between **${mark1}** and **${mark2}**`)
      }
    }

    // pass the previous subject, if any
    cy.wrap(subject, { log: false })
  },
)
