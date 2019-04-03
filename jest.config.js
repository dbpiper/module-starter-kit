// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {

  // Stop running tests after `n` failures
  bail: 10,

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage
  // information should be collected
  collectCoverageFrom: [
    'src/*.ts',
  ],

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // A set of global variables that need to be available in all test environments
  globals: {
    'ts-jest': {
      babelConfig: false,
    },
  },

  // A preset that is used as a base for Jest's configuration
  preset: 'ts-jest',

  // The test environment that will be used for testing
  testEnvironment: 'node',

  // The glob patterns Jest uses to detect test files
  testMatch: [
    '**/__tests__/**/*.[t]s?(x)',
    '**/?(*.)+(spec|test).[t]s?(x)',
  ],

  // An array of regexp pattern strings that are matched against all test paths,
  //  matched tests are skipped
  testPathIgnorePatterns: [
    '/node_modules/',
    '/utils/',
    '/mockData/',
    '/lib/',
  ],
};
