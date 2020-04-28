const {
  flow, get, last, merge, toPairs,
} = require('lodash/fp');
const readPkgUp = require('read-pkg-up');
const { readJsonSync, outputJsonSync } = require('fs-extra');

/** Normalize `Jest context` param, which is actualy [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) type */
const normalizeContext = (context) => flow(toPairs, last, last)(context);

/** Take `rootDir` from normalized Jest context */
const getContextRootDir = (context) => get('config.rootDir', normalizeContext(context));

/** Find & get the closest package.json starting from `cwd` directory */
const getPkg = (cwd) => readPkgUp.sync({ cwd }).packageJson;

/** Get package.json information from the `context directory` where Jest was called */
exports.getContextPkg = (context) => {
  const pkgDir = getContextRootDir(context);
  const pkgContent = getPkg();
  const pkgName = get('name', pkgContent);

  return [pkgContent, pkgName, pkgDir];
};

/** Read JSON report file silently (won't throw if error) */
const readReport = (fileDir) => {
  const file = readJsonSync(fileDir, { throws: false });

  if (!file) return {};

  return file;
};

exports.writeReport = (fileDir, pkgReport) => {
  const currentReport = readReport(fileDir);
  const report = merge(currentReport, pkgReport);

  outputJsonSync(fileDir, report, { spaces: 2 });
};
