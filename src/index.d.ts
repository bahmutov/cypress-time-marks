// https://glebbahmutov.com/blog/publishing-cypress-command/

// load type definitions that come with Cypress module
// and then add our new commands to the "cy" object
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Creates a timestamp with the given name.
     * Yields the current subject to the next command or assertion.
     * @param name Name for the new time mark
     * @see https://github.com/bahmutov/cypress-time-marks
     */
    timeMark(name: string): Chainable<any>

    /**
     * Measures the time elapsed since the given time mark.
     * Yields the current subject to the next command or assertion.
     * @see https://github.com/bahmutov/cypress-time-marks
     * @param label Extra text to show in the Command Log
     * @param timeLimit The time limit to warn in milliseconds
     * @param throwError Throws an error if the elapsed time is above the time limit
     */
    timeSince(
      name: string,
      label?: string,
      timeLimit?: number,
      throwError?: boolean,
    ): Chainable<any>

    /**
     * Measures the time elapsed since the given time mark.
     * Yields the current subject to the next command or assertion.
     * @param timeLimit The time limit to warn in milliseconds
     * @param throwError Throws an error if the elapsed time is above the time limit
     * @see https://github.com/bahmutov/cypress-time-marks
     */
    timeSince(
      name: string,
      timeLimit?: number,
      throwError?: boolean,
    ): Chainable<any>

    /**
     * Measures the time elapsed between two time marks.
     * The marks should have already happened.
     * Yields the current subject to the next command or assertion.
     * @see https://github.com/bahmutov/cypress-time-marks
     * @param mark1 The first time mark
     * @param mark2 The second time mark
     * @param label Extra text to show in the Command Log
     * @param timeLimit The time limit to warn in milliseconds
     * @param throwError Throws an error if the elapsed time is above the time limit
     * @example
     *  cy.timeBetween('start', 'end', 'loading time', 2000, true)
     */
    timeBetween(
      mark1: string,
      mark2: string,
      label?: string,
      timeLimit?: number,
      throwError?: boolean,
    ): Chainable<any>

    /**
     * Measures the time elapsed between two time marks.
     * The marks should have already happened.
     * Yields the current subject to the next command or assertion.
     * @see https://github.com/bahmutov/cypress-time-marks
     * @param mark1 The first time mark
     * @param mark2 The second time mark
     * @param timeLimit The time limit to warn in milliseconds
     * @param throwError Throws an error if the elapsed time is above the time limit
     * @example
     *  cy.timeBetween('start', 'end', 2000, true)
     */
    timeBetween(
      mark1: string,
      mark2: string,
      timeLimit?: number,
      throwError?: boolean,
    ): Chainable<any>
  }
}
