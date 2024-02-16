# cypress-time-marks ![cypress version](https://img.shields.io/badge/cypress-13.5.1-brightgreen)

> Custom Cypress commands to measure elapsed time

```js
cy.timeMark('start').wait(1500).timeSince('start').wait(500).timeSince('start')
```

![Time marks](./images/marks.png)

See [spec.cy.js](./cypress/e2e/spec.cy.js)

- 📺 Watch the video [Measure The Elapsed Time In Your Cypress Tests](https://youtu.be/3ASVKBgYAYc)
- 🎓 Covered in my course [Cypress Network Testing Exercises](https://cypress.tips/courses/network-testing)
  - [Bonus 52: Measure the time it takes to show the loaded data on the page](https://cypress.tips/courses/network-testing/lessons/bonus52)
  - [Bonus 85: Measure cy.requests and parts of tests](https://cypress.tips/courses/network-testing/lessons/bonus85)
- 🎓 Covered in my course [Cypress Plugins](https://cypress.tips/courses/cypress-plugins)
  - [Lesson p1: Time how long the app takes to add an item](https://cypress.tips/courses/cypress-plugins/lessons/p1)
  - [Lesson p2: Test a Toast component timing](https://cypress.tips/courses/cypress-plugins/lessons/p2)

## Install

Add this plugin as a dev dependency

```
# if using NPM
$ npm i -D cypress-time-marks
# if using Yarn
$ yarn add -D cypress-time-marks
```

Import this plugin from the spec file or from the support file

```js
// cypress/e2e/spec.cy.js or cypress/support/e2e.js
import 'cypress-time-marks'
```

This should give you two new custom commands `cy.timeMark(name)` and `cy.timeSince(name)`. If you want TypeScript definitions, this module [includes them](./src/index.d.ts):

```js
// my spec JS file
/// <reference types="cypress-time-marks" />
```

## Options

```ts
cy.timeSince(markName: string, label?: string, timeLimit?: number, throwError?: boolean)
```

### labels

You can log a label when using `cy.timeSince(name, label)`

```js
cy.timeMark('start')
  .wait(1500)
  .timeSince('start', 'initial wait')
  .wait(500)
  .timeSince('start', 'final load')
```

![Time marks with labels](./images/labels.png)

### time limit warning

You can pass a time limit after the mark name to warn if the elapsed time is longer than the limit. It won't fail the test, but it will change the icon to warn you.

```js
cy.timeMark('start')
  .wait(100)
  .timeSince('start', 'under time limit', 200)
  .wait(500)
  .timeSince('start', 'over time limit', 200)
  .timeSince('start', 200)
```

![Time limit warnings](./images/time-limit.png)

### fail the test

You can fail the test if the elapsed time is above the given limit.

```js
cy.timeMark('start').wait(100).timeSince(
  'start', // mark name
  'waiting', // message
  50, // time limit (ms)
  true, // throw an error if above the time limit
)
```

![Failing test because of the time limit](./images/throw.png)

## timeBetween

Sometimes you want to measure time, but assert the durations after the fact.

```js
// run commands and capture the marks
cy.timeMark('start').wait(400).timeMark('finish')
// confirm the durations between two marks
cy.timeBetween('start', 'finish')
```

You can add a label, set maximum duration, and even throw an error if the duration is above the given limit.

```js
// label this duration "loading time" in the command log
// and if it exceeds 1 second, throw an error failing the test
cy.timeBetween('start', 'finish', 'loading time', 1000, true)
```

## See also

- [cypress-timestamps](https://github.com/bahmutov/cypress-timestamps) plugin

## Small print

Author: Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt; &copy; 2022

- [@bahmutov](https://twitter.com/bahmutov)
- [glebbahmutov.com](https://glebbahmutov.com)
- [blog](https://glebbahmutov.com/blog)
- [videos](https://www.youtube.com/glebbahmutov)
- [presentations](https://slides.com/bahmutov)
- [cypress.tips](https://cypress.tips)
- [Cypress Tips & Tricks Newsletter](https://cypresstips.substack.com/)
- [my Cypress courses](https://cypress.tips/courses)

License: MIT - do anything with the code, but don't blame me if it does not work.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/cypress-time-marks/issues) on Github
