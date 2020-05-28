/*
 * @Author: Rainy
 * @Date: 2020-04-13 22:11:07
 * @LastEditors: Rainy
 * @LastEditTime: 2020-04-20 21:25:34
 */

import { gitClone } from './gitClone';
import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import validateProjectName from 'validate-npm-package-name';
import { chalk, spinner, clearConsole } from 'power-gem';

const { logWithSpinner, stopSpinner, succeedSpinner } = spinner;

type IFunction = () => any;

interface IOptions {
  cwd?: string;
  merge?: boolean;
  force?: boolean;
}

export const initProject = async (projectName: string, options: IOptions) => {
  const cwd = options.cwd || process.cwd();
  const inCurrent: boolean = projectName === '.';
  const name: string = inCurrent ? path.relative('../', cwd) : projectName;
  const targetDir: string = path.resolve(cwd, projectName || '.');

  const result: {
    validForNewPackages: boolean;
    errors: IFunction[];
    warnings: IFunction[];
  } = validateProjectName(name);

  if (!result.validForNewPackages) {
    console.error(chalk.red(`Invalid project name: "${name}"`));
    result.errors &&
      result.errors.forEach(err => {
        console.error(chalk.red.dim('Error: ' + err));
      });
    result.warnings &&
      result.warnings.forEach(warn => {
        console.error(chalk.red.dim('Warning: ' + warn));
      });
    process.exit(1);
  }

  if (fs.existsSync(targetDir) && !options.merge) {
    logWithSpinner(`Fetching remote project ${chalk.cyan(name)}...`);
    if (options.force) {
      await fs.remove(targetDir);
    } else {
      await clearConsole();
      if (inCurrent) {
        const { ok } = await inquirer.prompt([
          {
            name: 'ok',
            type: 'confirm',
            message: `Generate project in current directory?`,
          },
        ]);
        if (!ok) {
          return;
        }
      } else {
        const { action } = await inquirer.prompt([
          {
            name: 'action',
            type: 'list',
            message: `Target directory ${chalk.cyan(targetDir)} already exists. Pick an action:`,
            choices: [
              { name: 'Overwrite', value: 'overwrite' },
              { name: 'Merge', value: 'merge' },
              { name: 'Cancel', value: false },
            ],
          },
        ]);
        if (!action) {
          return;
        } else if (action === 'overwrite') {
          console.log(`\nRemoving ${chalk.cyan(targetDir)}...`);
          await fs.remove(targetDir);
        }
      }
    }
  }
  await download(name);
};

async function download(name: string) {
  await inquirer
    .prompt([
      {
        type: 'list',
        name: 'type',
        message: 'Choice the template of the project which you need?',
        choices: ['node-ts', 'vuepress-docs-template'],
      },
    ])
    .then(async answers => {
      logWithSpinner(`Fetching remote project ${chalk.cyan(name)}...`);
      await gitClone({
        // repository: 'Rain120/qq-music-api',
        repository: 'flippidippi/download-git-repo-fixture',
        projectName: 'test/tmp',
        opts: {},
        onResolved: async () => {
          succeedSpinner('Download Successfully');
          await clearConsole();
        },
        onRejected: err => {
          stopSpinner();
        },
      });
      stopSpinner();
    });
}
