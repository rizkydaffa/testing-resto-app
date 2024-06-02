/* eslint-disable no-dupe-keys */
/* eslint-disable max-len */
/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  testMatch: [
    '**/tests/**/*.test.[jt]s?(x)',
  ],

  // The Path to modules that run some code to configure or setup the tetsing envirement before it test
  setupFiles: ['fake-indexeddb/auto'],

  // The test envioment that will be used for testing
  testEnvironment: 'jsdom',

  // A map from regular expression to paths to transformers
  transform: {
    '^.+\\.(js|ts)$': 'babel-jest',

  },
};

module.exports = config;
