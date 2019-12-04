import { resolve as resolvePath, basename } from 'path';
import { expect } from 'chai';
import { it, describe, before, after } from 'mocha';
import bash from 'vamtiger-bash';
import createFile from 'vamtiger-create-file';
import copy from '../copy';

const sourceFolderName = basename(__filename).replace(/\.\w+$/, '');
const destinationFolderName = `${sourceFolderName}-destination`;
const sourceFolderPath = resolvePath(
    __dirname,
    `${sourceFolderName}-source`
);
const sourceSubFolderPath = resolvePath(
    sourceFolderPath,
    'sub-folder'
);
const sourceSubSubFolderPath = resolvePath(
    sourceFolderPath,
    'sub-folder',
    'sub-sub-folder'
);
const sourceSubFolder01 = resolvePath(
    sourceFolderPath,
    'sub-folder-01'
);
const sourceSubfolderFile = resolvePath(
    sourceSubFolderPath,
    'file.txt'
);
const sourceSubfolder01File = resolvePath(
    sourceSubFolder01,
    'file.txt'
);
const sourceSubSubfolderFile = resolvePath(
    sourceSubSubFolderPath,
    'file.txt'
);
const destinationFolderPath = resolvePath(
    __dirname,
    destinationFolderName
);
const createSourceFolder = `mkdir ${sourceFolderPath}`;
const createSourceSubfolder = `mkdir ${sourceSubFolderPath}`;
const createSourceSubfolder01 = `mkdir ${sourceSubFolder01}`;
const createSubSubfolder = `mkdir ${sourceSubSubFolderPath}`;
const createSourceSubfolderFile = `touch ${sourceSubfolderFile}`;
const createSourceSubfolderFile01 = `touch ${sourceSubfolder01File}`;
const createSourceSubSubfolderFile = `touch ${sourceSubSubfolderFile}`;
const createDestinationFolder = `mkdir ${destinationFolderPath}`;
const removeSourceFolder = `rm -rf ${sourceFolderPath}`;
const removeSourceSubfolder = `rm -rf ${sourceSubFolderPath}`;
const removeDestinationFolder = `rm -rf ${destinationFolderPath}`;
const copyParams = {
    source: sourceFolderPath.replace(`${__dirname}/`, ''),
    destination: destinationFolderPath.replace(`${__dirname}/`, ''),
    currentWorkingDirectory: __dirname,
    exclude: 'node_modules'
}

describe('copy', function () {
    before(beforeTest);

    after(afterTest);

    it('copy folder', async function () {
        const copyFolder = await copy(copyParams);
    });
});

async function beforeTest() {
    await removeFolders();
    await createFolders()
}

async function afterTest() {
    await removeFolders();
}

async function createFolders() {
    await Promise.all([
        bash(createSourceFolder),
        bash(createDestinationFolder)
    ]);

    await Promise.all([
        bash(createSourceSubfolder),
        bash(createSourceSubfolder01)
    ]);

    await Promise.all([
        bash(createSourceSubfolderFile),
        bash(createSourceSubfolderFile01)
    ]);

    await Promise.all([
        bash(createSubSubfolder)
    ]);

    await Promise.all([
        bash(createSourceSubSubfolderFile)
    ]);
}

async function removeFolders() {
    await Promise.all([
        bash(removeSourceFolder),
        bash(removeDestinationFolder)
    ]);
}