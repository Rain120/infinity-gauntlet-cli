/*
 * @Author: Rainy
 * @Date: 2020-03-27 17:44:29
 * @LastEditors: Rainy
 * @LastEditTime: 2020-04-05 12:22:11
 */

/// <reference path='../typings/index.d.ts' />

export const request = {
  get(uri: string, opts: IAnyObject) {
    // lazy require
    const request = require('request-promise-native');
    const reqOpts = {
      method: 'GET',
      timeout: 30000,
      resolveWithFullResponse: true,
      json: true,
      uri,
      ...opts,
    };

    return request(reqOpts);
  },
};
