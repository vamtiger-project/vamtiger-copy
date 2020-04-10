"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const { slash } = types_1.StringConstant;
function default_1({ paths }) {
    const groups = [];
    let pathCount;
    let group;
    let currentPaths = paths;
    let currentPath;
    let index = 0;
    for (index; index < paths.length && currentPaths.length; index++) {
        currentPath = paths[index];
        pathCount = currentPath.split(slash).length;
        group = currentPaths.filter(currentPath => currentPath.split(slash).length === pathCount);
        if (group.length) {
            groups.push(group);
            currentPaths = currentPaths.filter(currentPath => !group.includes(currentPath));
        }
    }
    ;
    return groups;
}
exports.default = default_1;
//# sourceMappingURL=get-grouped-folders.js.map