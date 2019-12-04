import { resolve as resolvePath } from 'path';
import { PathLike } from 'fs';
import getFolderContent from 'vamtiger-get-directory-content-recursive';
import createFolder from 'vamtiger-create-directory';
import { ICopy } from './types';
import getGroupedFolders from './get-grouped-folders';
import copyFile from 'vamtiger-copy-file';

export default async function ({ source: currentSource, destination: currentDestination, exclude: pattern, currentWorkingDirectory }: ICopy) {
    const workingDirectory = currentWorkingDirectory || process.cwd();
    const exclude = pattern && new RegExp(pattern);
    const source = resolvePath(workingDirectory, currentSource);
    const destination = resolvePath(workingDirectory, currentDestination);
    const { directory, file } = await getFolderContent({
        path: source,
        classified: true
    });
    const sourceFolders = ((exclude && directory.filter(currentFolder => !(currentFolder as string).match(exclude)) || directory) as string[]);
    const destinationFolders = sourceFolders.map(currentFolder => currentFolder.replace(source, destination));
    const sourceFiles = (exclude && file.filter(currentFile => !(currentFile as string).match(exclude)) || file) as string[];
    const groupedFolders = getGroupedFolders({
        paths: destinationFolders
    });
    const copyFileParams = sourceFiles.map(sourceFile => ({
        source: sourceFile,
        destination: sourceFile.replace(source, destination)
    }));

    await groupedFolders.reduce(
        (createFolders, folders) => createFolders.then(() => Promise.all(folders.map(folder => createFolder(folder as PathLike)))),
        Promise.resolve() as Promise<any>
    );

    await Promise.all(copyFileParams.map(copyFile));
}