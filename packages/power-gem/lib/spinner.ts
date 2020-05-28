/// <reference path='../typings/index.d.ts' />

import ora from 'ora';
import chalk from 'chalk';
import { spinnerList } from './ora-spinner-list';

const spinner: ISpinner = ora({
  spinner: spinnerList.moon,
});

let lastMsg: ILastMsg = null;
let isPaused: boolean = false;

export function logWithSpinner(symbol: any, msg?: any, loading?: IOraSpinner) {
  if (!msg) {
    msg = symbol;
    symbol = chalk.green('✔');
  }
  if (lastMsg) {
    spinner.stopAndPersist({
      symbol: lastMsg.symbol,
      text: lastMsg.text,
    });
  }
  spinner.text = ' ' + msg;
  if (loading) {
    spinner.loading = spinner;
  }
  lastMsg = {
    symbol: symbol + ' ',
    text: msg,
  };
  spinner.start();
};

export function stopSpinner(persist?: boolean | undefined) {
  if (lastMsg && persist !== false) {
    spinner.stopAndPersist({
      symbol: lastMsg.symbol,
      text: lastMsg.text,
    });
  } else {
    spinner.stop();
  }
  lastMsg = null;
};

export function pauseSpinner() {
  if (spinner.isSpinning) {
    spinner.stop();
    isPaused = true;
  }
};

export function resumeSpinner() {
  if (isPaused) {
    spinner.start();
    isPaused = false;
  }
};

export function succeedSpinner(text: string) {
  spinner.succeed(text);
};

export function warnSpinner(text: string) {
  spinner.warn(text);
};
export function infoSpinner(text: string) {
  spinner.info(text);
};

export function failSpinner(text: string) {
  spinner.fail(text);
};
