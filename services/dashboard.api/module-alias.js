/* eslint-disable @typescript-eslint/no-var-requires */

const tsConfigPaths = require('tsconfig-paths');
const { map, pipe, replace } = require('ramda');
const tsConfig = require('./tsconfig.json');

const baseUrl = './dist';

tsConfigPaths.register({
  baseUrl,
  paths: map((path) => map(pipe(replace('src/', ''), replace('.ts', '.js')))(path))(tsConfig.compilerOptions.paths),
});
