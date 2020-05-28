/*
 * @Author: Rainy
 * @Date: 2020-03-29 16:55:18
 * @LastEditors: Rainy
 * @LastEditTime: 2020-04-19 18:29:20
 */

interface IAnyObject {
  [key: string]: any;
}

type ILastMsg = {
  symbol?: string;
  text?: string;
} | null;

interface ISpinner {
  [key: string]: any;
}

interface IOraSpinner {
  interval: number | string;
  frames?: string[];
}
