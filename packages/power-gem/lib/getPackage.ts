/*
 * @Author: Rainy
 * @Date: 2020-04-16 22:20:22
 * @LastEditors: Rainy
 * @LastEditTime: 2020-04-16 22:26:09
 */

import path from 'path';
import fs from 'fs';

function getPackageJson(projectPath: string): string | IAnyObject {
    const packagePath = path.join(projectPath, 'package.json');
    let packageJson: string | IAnyObject = '';

    try {
        packageJson = fs.readFileSync(packagePath, 'utf8');
    } catch (error) {
        throw new Error(`The package.json file at '${packagePath}' does not exist`)
    }

    try {
        packageJson = JSON.parse(packageJson)
    } catch (error) {
        throw new Error('The package.json is malformed')
    }
    
    return packageJson;
}

export default function getPkg(context: string): string | IAnyObject {
    return getPackageJson(context);
}
