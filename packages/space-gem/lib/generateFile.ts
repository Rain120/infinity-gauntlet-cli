/*
 * @Author: Rainy
 * @Date: 2020-04-11 12:04:50
 * @LastEditors: Rainy
 * @LastEditTime: 2020-05-03 23:45:44
 */

import inquirer from 'inquirer';
import path from 'path';
import util from 'util';
import fs from 'fs';
import { spinner, logger, chalk } from 'power-gem';
import { getFiles, getTypeFiles } from './utils/constant';

const exportBaseUrl = path.join(process.cwd(), '');

export const generateFile = async ({ options, context }) => {
  const ignorePaths = getTypeFiles(options, exportBaseUrl);
  const isExist = ignorePaths.some(p => fs.existsSync(p));
  if (isExist) {
    inquirer
      .prompt([
        {
          type: 'confirm',
          name: 'opType',
          message: 'Your current directory already has add Files? Do you want to continue?',
          default: true,
        },
      ])
      .then(async answers => {
        if (answers.opType) {
          await createFiles(options);
        } else {
          return;
        }
      });
  } else if (/git/gi.test(options)) {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'fileType',
          message: 'Choice the type of ignore file ?',
          choices: ['Node', 'React'],
        },
      ])
      .then(async answers => {
        const { fileType } = answers;
        await createFiles(fileType);
      });
  } else {
    await createFiles(options);
  }
};

async function createFiles(type: IAddFilesType) {
  const files = getFiles(type);
  spinner.logWithSpinner(`✨`, `Adding ${type} in ${chalk.yellow(process.cwd())}.`);
  await addFiles(type, files);
  spinner.stopSpinner();
  logger.log(`${chalk.green('✔')}  Successfully add ${type} files`);
}

/**
 * Add Files
 * @param paths add file paths
 */
async function addFiles(type, paths: string[]) {
  try {
    const readdir = util.promisify(fs.readdir);
    const readFilePath = path.join('./generateFiles')
    console.log('fileNames 2', readFilePath);
    const fileNames: string[] = await readdir(readFilePath);

    fileNames
      .filter(path => paths.includes(path))
      .forEach(async fileName => {
        console.log('fileName', fileName);
        const writeFilePath = path.join('./generateFiles', fileName)
        await fs.readFile(writeFilePath, 'utf-8', async (err, data) => {
          if (err) {
            return err;
          }
          console.log('data', data);
          await fs.writeFile(fileName, data, e => {
            if (e) {
              return e;
            }
            logger.log(`${chalk.green('✔')} Successfully generate ${fileName} of ${type}`);
          });
        });
      });
  } catch (error) {
    console.log('error', error);
  }
}

/**
 * @param {String} dirname
 * @returns
 */
function mkDirsSync(dirname: string): boolean {
  if (fs.existsSync(dirname)) {
    return true;
  }
  if (mkDirsSync(path.dirname(dirname))) {
    fs.mkdirSync(dirname);
    return true;
  }
}
