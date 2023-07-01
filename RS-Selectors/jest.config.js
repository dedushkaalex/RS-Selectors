/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "transform": {
    "^.+\\.ts?$": "ts-jest",
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub"
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$",
  preset: 'ts-jest',
  testEnvironment: 'node',
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  "resolver": "jest-webpack-resolver",
  
};