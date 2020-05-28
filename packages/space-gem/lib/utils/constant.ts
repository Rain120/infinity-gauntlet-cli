/*
 * @Author: Rainy
 * @Date: 2020-05-03 17:11:40
 * @LastEditors: Rainy
 * @LastEditTime: 2020-05-03 17:57:15
 */

import path from 'path';

export const exportBaseUrl = path.join(process.cwd(), '');

/**
 * 
 * @param type IAddFilesType from type.d
 */
export const getFiles = (type: IAddFilesType): string[] => ({
    'node': ['Node.gitignore'],
    'react': ['React.gitignore'],
    'eslint': ['.eslintrc.js', '.eslintignore'],
    'prettier': ['.prettierrc', '.prettierignore'],
})[type.toLowerCase()];

/**
 * 
 * @param type IAddFilesType
 * @param basePath generator path
 */
export const getTypeFiles = (type: IAddFilesType, basePath: string = '') => {
    const files: string[] = getFiles(type);
    return files.map(file => getTypeFile(basePath || exportBaseUrl, file));
}

export const getTypeFile = (basePath: string, name: string): string => {
    return path.join(basePath, name);
}
