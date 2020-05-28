/*
 * @Author: Rainy
 * @Date: 2020-03-22 11:01:02
 * @LastEditors: Rainy
 * @LastEditTime: 2020-04-20 21:22:14
 */

import download from 'download-git-repo';
import fs from 'fs-extra';
import { chalk, ora, spinner } from 'power-gem';

interface IAnyObject {
  [key: string]: any;
};

interface IOptions {
  repository: string;
  projectName: string;
  opts: IAnyObject | {
    clone?: boolean
  };
  onResolved?: () => any;
  onRejected?: (err: Error) => any;
};


export const gitClone = async (options: IOptions) => {
  const { repository, projectName, opts = { clone: false } , onResolved, onRejected } = options;
  
  // clone will fail if tmpdir already exists
  // https://github.com/flipxfx/download-git-repo/issues/41
  if (opts && opts.clone) {
    await fs.remove(projectName)
  }

  await new Promise((resolve, reject) => {
    download(repository, projectName, opts, (err: any) => {
      if (err) {
        onRejected(err);
        return reject(err);
      }
      resolve(onResolved())
    })
  })
};
