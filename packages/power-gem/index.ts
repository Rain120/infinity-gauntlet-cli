/*
 * @Author: Rainy
 * @Date: 2020-03-27 16:58:29
 * @LastEditors: Rainy
 * @LastEditTime: 2020-04-19 18:27:38
 */

export { clearConsole } from './lib/clearConsole';
export { request } from './lib/request';
export * as spinner from './lib/spinner';
export { spinnerList } from './lib/ora-spinner-list';
export * as logger from './lib/logger';

export { default as checkNodeVersion } from './lib/checkNodeVersion';

import chalk from 'chalk';
import ora from 'ora';
import semver from 'semver';

export {
  chalk,
  ora,
  semver,
};
