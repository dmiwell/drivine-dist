"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectSql = exports.sqlInjections = exports.InjectCypher = exports.cypherInjections = exports.InjectFileContents = exports.fileContentInjections = exports.InjectPersistenceManager = exports.persistenceManagerInjections = void 0;
const common_1 = require("@nestjs/common");
const path_1 = require("path");
exports.persistenceManagerInjections = [];
const InjectPersistenceManager = (database = 'default') => {
    if (!exports.persistenceManagerInjections.includes(database)) {
        exports.persistenceManagerInjections.push(database);
    }
    return (0, common_1.Inject)(`PersistenceManager:${database}`);
};
exports.InjectPersistenceManager = InjectPersistenceManager;
exports.fileContentInjections = [];
const InjectFileContents = (dirNameOrPath, resource) => {
    const filename = fileNameFor(dirNameOrPath, undefined, resource);
    if (!exports.fileContentInjections.includes(filename)) {
        exports.fileContentInjections.push(filename);
    }
    return (0, common_1.Inject)(`FileContents:${filename}`);
};
exports.InjectFileContents = InjectFileContents;
exports.cypherInjections = [];
const InjectCypher = (dirNameOrPath, resource) => {
    const filename = fileNameFor(dirNameOrPath, 'cypher', resource);
    if (!exports.cypherInjections.includes(filename)) {
        exports.cypherInjections.push(filename);
    }
    return (0, common_1.Inject)(`CYPHER:${filename}`);
};
exports.InjectCypher = InjectCypher;
exports.sqlInjections = [];
const InjectSql = (dirNameOrPath, resource) => {
    const filename = fileNameFor(dirNameOrPath, 'sql', resource);
    if (!exports.sqlInjections.includes(filename)) {
        exports.sqlInjections.push(filename);
    }
    return (0, common_1.Inject)(`SQL:${filename}`);
};
exports.InjectSql = InjectSql;
function fileNameFor(dirNameOrPath, extension, resourceName) {
    if (resourceName) {
        const path = (0, path_1.join)(`${dirNameOrPath}/${resourceName}`);
        return require.resolve(extension ? `${path}.${extension}` : `${path}`);
    }
    else {
        return require.resolve(extension ? `${dirNameOrPath}.${extension}` : `${dirNameOrPath}`);
    }
}
//# sourceMappingURL=DrivineInjectionDecorators.js.map