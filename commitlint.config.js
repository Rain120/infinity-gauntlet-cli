/*
 * @Author: Rainy
 * @Date: 2020-03-07 10:31:23
 * @LastEditors: Rainy
 * @LastEditTime: 2020-03-07 10:31:45
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
        'config'
      ]
    ],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'header-max-length': [0, 'always', 150]
  }
};
