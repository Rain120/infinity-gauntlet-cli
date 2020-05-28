/*
 * @Author: Rainy
 * @Date: 2020-04-11 22:06:22
 * @LastEditors: Rainy
 * @LastEditTime: 2020-04-19 19:31:25
 */

const { initProject } = require('space-gem');
const debug = require('debug')('infinity-gauntlet-cli:init');

function init(name = '', options = {}) {
  debug(name);
  initProject(name, options);
}

module.exports = (...args) => {
  return init(...args);
};
