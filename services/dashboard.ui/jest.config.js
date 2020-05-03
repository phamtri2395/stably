module.exports = {
  clearMocks: true,
  verbose: true,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  coverageReporters: ['html', 'text'],

  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },

  reporters: [
    'default',
    ['@stably/tools/jest-reporter', { compact: true, testType: 'unit', reportDir: '../../reports/test-results.json' }],
  ],

  testEnvironment: 'jsdom',
};
