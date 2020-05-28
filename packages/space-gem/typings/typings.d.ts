/*
 * @Author: Rainy
 * @Date: 2020-03-30 21:02:30
 * @LastEditors: Rainy
 * @LastEditTime: 2020-04-20 20:58:07
 */

type IAddFilesType = 'Node' | 'Eslint' | 'Prettier';

type IPromptType = 'input' | 'number' | 'confirm' | 'list' | 'rawlist' | 'expand' | 'checkbox' | 'password' | 'editor'

interface IPrompt {
  name: string;
  type: IPromptType;
  message: string | Function;
  default?: any;
  when?: (vars: IAnyObject) => boolean | boolean;
  choices?: Array<any>;
  transform?: Function;
  deniesStore?: boolean;
  askAnswered?: boolean;
  suffix?: string;
}
