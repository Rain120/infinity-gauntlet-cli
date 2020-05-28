/* eslint-disable */
'use strict';

const spaceGem = require('..');

describe('space-gem', () => {
  it('needs tests', () => {
    spaceGem.gitClone({
        repository: 'Rain120/qq-music-api',
        projectName: './test',
        opts: {},
        onResolved: () => {
          console.log('cb')
        }
    });
  });
});
