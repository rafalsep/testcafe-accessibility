# Testcafe accessibility
###### Small lib that can be used to run accessibility for testcafe using axe and generate html report with screenshot

[![Build Status](https://travis-ci.org/rafalsep/testcafe-accessibility.svg)](https://travis-ci.org/rafalsep/testcafe-accessibility)

<p align="center">
    <img src="https://raw.github.com/rafalsep/testcafe-accessibility/master/media/content.png" alt="content" />
</p>

## Features

- uses axe as underlying accessibility engine
- can be used to generate report for each url separately due to ${MODULE} in the test name
- will automatically take a screenshot after running the accessibility test and link it to the accessibility test
- supports quarantine mode and parallel test execution

## Install

```
npm install testcafe-accessibility
```

## Configuration

Once installed add `accessibility` configuration in `.testcaferc.js` file

```js
module.exports = {
  // some other config
  accessibility: {
    path: 'tmp',
    pathPattern: '${DATE}/${FIXTURE}/accessibility/[${TEST}]_[${MODULE}]_${TIME}_${QUARANTINE_ATTEMPT}.html',
  },
};
```

| Required | Argument                  | Description                                                                                                                                                                                                                                                   | Example              |
| -------- |---------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| -------------------- |
| Yes      | accessibility.path        | The base directory where accessibility reports will be saved                                                                                                                                                                                                  | tmp                  |
| Yes      | accessibility.pathPattern | A pattern that defines how TestCafe composes the relative path to a accessibility file. See [Screenshot and Video Directories](https://testcafe.io/documentation/402840/guides/advanced-guides/screenshots-and-videos#screenshot-and-video-directories).      | ${DATE}/${TEST}.json |

## Examples

See working examples in examples folder

## Author

Rafal Szczepankiewicz
