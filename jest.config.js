/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch :[ "**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(test).[jt]s?(x)" ]
};