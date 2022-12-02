// https://glebbahmutov.com/blog/publishing-cypress-command/

// load type definitions that come with Cypress module
// and then add our new commands to the "cy" object
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    timeMark(name: string): Chainable<any>
    timeSince(
      name: string,
      label?: string,
      timeLimit?: number,
      throwError?: boolean,
    ): Chainable<any>
  }
}
