/*
 * @Author: Rainy
 * @Date: 2020-04-11 17:22:33
 * @LastEditors: Rainy
 * @LastEditTime: 2020-04-11 17:47:15
 */

import chalk from 'chalk';
import { stripAnsi } from './strip-ansi';

const chalkTag = (message: string) => chalk.bgBlackBright.white.dim(` ${message} `);

const format = (label: string, message: string): string => {
  return message
    .split('\n')
    .map((line: string, index: number) => {
      return index === 0 ? `${label} ${line}` : line.padStart(stripAnsi(label).length);
    })
    .join('\n');
};

export const log = (message?: string, tag = null): void => {
  tag ? console.log(format(chalkTag(tag), message)) : console.log(message);
};

export const info = (message?: string, tag = null) => {
  console.log(format(chalk.bgBlue.black(' INFO ') + (tag ? chalkTag(tag) : ''), message));
};

export const done = (message?: string, tag = null) => {
  console.log(format(chalk.bgGreen.black(' DONE ') + (tag ? chalkTag(tag) : ''), message));
};

export const warn = (message?: string, tag = null) => {
  console.warn(format(chalk.bgYellow.black(' WARN ') + (tag ? chalkTag(tag) : ''), chalk.yellow(message)));
};

export const error = (message?: Error | string, tag = null): void => {
  console.error(format(chalk.bgRed(' ERROR ') + (tag ? chalkTag(tag) : ''), chalk.red(message)));
  if (message instanceof Error) {
    console.error(message.stack)
  }
};
