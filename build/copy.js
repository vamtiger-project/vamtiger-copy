"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const vamtiger_get_directory_content_recursive_1 = require("vamtiger-get-directory-content-recursive");
const vamtiger_create_directory_1 = require("vamtiger-create-directory");
const get_grouped_folders_1 = require("./get-grouped-folders");
const vamtiger_copy_file_1 = require("vamtiger-copy-file");
async function default_1({ source: currentSource, destination: currentDestination, exclude: pattern, currentWorkingDirectory }) {
    const workingDirectory = currentWorkingDirectory || process.cwd();
    const exclude = pattern && new RegExp(pattern);
    const source = path_1.resolve(workingDirectory, currentSource);
    const destination = path_1.resolve(workingDirectory, currentDestination);
    const { directory, file } = await vamtiger_get_directory_content_recursive_1.default({
        path: source,
        classified: true
    });
    const sourceFolders = (exclude && directory.filter(currentFolder => !currentFolder.match(exclude)) || directory);
    const destinationFolders = sourceFolders.map(currentFolder => currentFolder.replace(source, destination));
    const sourceFiles = (exclude && file.filter(currentFile => !currentFile.match(exclude)) || file);
    const groupedFolders = get_grouped_folders_1.default({
        paths: destinationFolders
    });
    const copyFileParams = sourceFiles.map(sourceFile => ({
        source: sourceFile,
        destination: sourceFile.replace(source, destination)
    }));
    await groupedFolders.reduce((createFolders, folders) => createFolders.then(() => Promise.all(folders.map(folder => vamtiger_create_directory_1.default(folder)))), Promise.resolve());
    await Promise.all(copyFileParams.map(vamtiger_copy_file_1.default));
}
exports.default = default_1;
//# sourceMappingURL=copy.js.map