/* eslint-disable no-underscore-dangle */

const path = require('path');

const { defaultFormat, compactFormat } = require('./formaters');
const { getContextPkg, writeReport } = require('./utils');

class JestReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig;
    this._options = options;
  }

  onRunComplete(context, result) {
    // context would be empty if there's no test file & 'passWithNoTests' flag on
    if (context.size === 0) return;

    const { compact = false, testType = 'unknown', reportDir } = this._options;
    const format = compact ? compactFormat : defaultFormat;

    const [, pkgName, pkgDir] = getContextPkg(context);
    const testResults = format(result, context);

    const defaultReportFileDir = path.join(pkgDir, 'reports/test-results.json');
    const outputDir = reportDir ? path.resolve(pkgDir, reportDir) : defaultReportFileDir;

    const outputContent = {
      [testType]: {
        [pkgName]: testResults,
      },
    };

    writeReport(outputDir, outputContent);
  }
}

module.exports = JestReporter;
