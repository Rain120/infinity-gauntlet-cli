/*
 * @Author: Rainy
 * @Date: 2020-04-16 22:00:57
 * @LastEditors: Rainy
 * @LastEditTime: 2020-04-19 17:17:16
 */

import path from 'path';
import fs from 'fs-extra';

function deleteRemovedFiles(directory: string, newFiles: any, previousFiles: any): Promise<any> {
    const filesToDelete = Object.keys(previousFiles).filter(filename => !newFiles[filename]);

    return Promise.all(
        filesToDelete.map(filename => fs.unlink(path.join(directory, filename)))
    );
}

export default async function writeFileTree(dir: string, files: any, previousFiles: any): Promise<any> {
    if (previousFiles) {
        await deleteRemovedFiles(dir, files, previousFiles);
    }

    (Object.keys(files) as string[]).forEach((name: string, index: number) => {
        const filePath: string = path.join(dir, name);
        fs.ensureDirSync(path.dirname(filePath));
        fs.writeFileSync(filePath, files[name]);
    })
}
