const { defaults: tsPresets } = require('ts-jest/presets');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: 'packages',
  transform: {
    ...tsPresets.transform
    //   "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: '(/__tests__/.*\\.(test|spec))\\.[tj]s?$',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node'
  ],
  collectCoverageFrom: [
    "**/baseTs/upperFirst.ts",
    "**/baseTs/camelCase.ts",
    "!**/node_modules/**",
    "!**/vendor/**"
  ]
}