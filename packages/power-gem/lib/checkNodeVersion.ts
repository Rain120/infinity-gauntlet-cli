/*
 * @Author: Rainy
 * @Date: 2020-03-29 16:35:38
 * @LastEditors: Rainy
 * @LastEditTime: 2020-04-05 12:13:42
 */

import chalk from 'chalk';
import semver from 'semver';

export default function checkNodeVersion(wanted: string, id: string | number) {
  if (!semver.satisfies(process.version, wanted)) {
    console.log(
      chalk.red(
        'You are using Node ' +
          process.version +
          ', but this version of ' +
          id +
          ' requires Node ' +
          wanted +
          '.\nPlease upgrade your Node version.',
      ),
    );
    process.exit(1);
  }
}
