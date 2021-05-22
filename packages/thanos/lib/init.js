/*
 * @Author: Rainy
 * @Date: 2020-04-11 22:06:22
 * @LastEditors: Rainy
 * @LastEditTime: 2021-05-19 19:47:05
 */

const { initProject } = require('space-gem');
const debug = require('debug')('one-cli:init');

function init(name = '', options = {}) {
  debug(name);
  initProject(name, options);
}

module.exports = (...args) => {
  return init(...args);
};
