/*
 * @Author: Rainy
 * @Date: 2020-04-20 20:42:43
 * @LastEditors: Rainy
 * @LastEditTime: 2020-04-20 21:04:38
 */

export const initPrompt: (props: IAnyObject) => IPrompt[] = (props) => ([
  {
    name: 'name',
    type: 'input',
    message: 'package name:',
    default: props.name,
  },
  {
    name: 'version',
    type: 'input',
    message: 'version:',
    default: props.version || '1.0.0',
  },
  {
    name: 'description',
    type: 'input',
    message: 'description:',
    default: props.description,
  },
  {
    name: 'repo',
    type: 'input',
    message: 'git repository:',
    default: props.repo,
  },
  {
    name: 'author',
    type: 'input',
    message: 'author:',
    default: props.author || 'Rain120',
  },
  {
    name: 'keywords',
    type: 'input',
    message: 'keywords:',
  },
  {
    name: 'license',
    type: 'input',
    message: 'license:',
    default: props.license || 'ISC',
  },
]);
