/* eslint-disable @typescript-eslint/no-var-requires */

const tsConfigPaths = require('tsconfig-paths');
const { map, replace } = require('ramda');
const tsConfig = require('./tsconfig.json');

const baseUrl = './dist';

tsConfigPaths.register({
  baseUrl,
  paths: map((path) => map(replace('src/', ''))(path))(tsConfig.compilerOptions.paths),
});
