/*
 * @Author: Rainy
 * @Date: 2020-04-06 16:06:00
 * @LastEditors: Rainy
 * @LastEditTime: 2020-05-03 18:54:57
 */

const { generateFile } = require('space-gem');
const debug = require('debug')('one-cli:add');

function add(options = {}, context = process.cwd()) {
  debug(options)
  generateFile({ options, context });
}

module.exports = (...args) => {
  return add(...args);
};
