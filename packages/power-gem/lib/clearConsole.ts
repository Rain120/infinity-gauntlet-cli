/*
 * @Author: Rainy
 * @Date: 2020-03-28 15:34:49
 * @LastEditors: Rainy
 * @LastEditTime: 2020-04-05 12:13:57
 */

'use strict';

export const clearConsole = () => {
  process.stdout.write(process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H');
};
