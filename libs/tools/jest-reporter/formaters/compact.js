const {
  flow, invoke, mapValues, path,
} = require('lodash/fp');

module.exports = (result) => ({
  result: {
    testSuites: `${result.numPassedTestSuites} passed / ${
      result.numPassedTestSuites + result.numFailedTestSuites
    } total`,
    tests: `${result.numPassedTests} passed / ${result.numPassedTests + result.numFailedTests} total`,
  },
  coverage: flow(
    invoke('coverageMap.getCoverageSummary'),
    path('data'),
    mapValues(({ pct }) => `${pct}%`),
  )(result),
});
