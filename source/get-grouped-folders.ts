import { dirname } from 'path';
import { IGetGroupedFolders, StringConstant } from './types';

const { slash } = StringConstant;

export default function ({paths}: IGetGroupedFolders) {
    const groups = [] as string[][];

    let pathCount: number;
    let group: string[];
    let currentPaths = paths;
    let currentPath: string;
    let index = 0;



    for (index; index < paths.length && currentPaths.length; index ++) {
        currentPath = paths[index];
        pathCount = currentPath.split(slash).length;

        group = currentPaths.filter(currentPath => currentPath.split(slash).length === pathCount);

        if (group.length) {
            groups.push(group);

            currentPaths = currentPaths.filter(currentPath => !group.includes(currentPath));
        }
    };

    return groups;
}