"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionPropertiesFromEnv = void 0;
const DatabaseType_1 = require("./DatabaseType");
const assert = require("assert");
function ConnectionPropertiesFromEnv(connectionName) {
    const prefix = connectionName ? `${connectionName}_` : '';
    const stringFromEnv = (envVar) => process.env[`${prefix}${envVar}`];
    const numberFromEnv = (envVar) => {
        const setting = process.env[`${prefix}${envVar}`];
        if (setting === undefined) {
            return undefined;
        }
        const number = Number(setting);
        assert(!isNaN(number), `${envVar} could not be parsed to number`);
        return number;
    };
    const databaseType = stringFromEnv('DATABASE_TYPE');
    const host = stringFromEnv('DATABASE_HOST');
    const port = numberFromEnv('DATABASE_PORT');
    const userName = stringFromEnv('DATABASE_USER');
    const password = stringFromEnv('DATABASE_PASSWORD');
    const idleTimeout = numberFromEnv('DATABASE_IDLE_TIMEOUT');
    const connectionTimeout = numberFromEnv('DATABASE_CONNECTION_TIMEOUT');
    const databaseName = stringFromEnv('DATABASE_NAME');
    const defaultGraphPath = stringFromEnv('DATABASE_DEFAULT_GRAPH_PATH');
    const protocol = stringFromEnv('DATABASE_PROTOCOL');
    const poolMax = numberFromEnv('DATABASE_POOL_MAX');
    assert(databaseType, `${prefix}DATABASE_TYPE for named connection is required.`);
    assert(host, `${prefix}DATABASE_HOST for named connection is required.`);
    if (databaseType === DatabaseType_1.DatabaseType.AGENS_GRAPH) {
        assert(databaseName, `${prefix}DATABASE_NAME for named connection is required.`);
    }
    return {
        databaseType,
        host,
        port,
        userName,
        password,
        idleTimeout,
        connectionTimeout,
        databaseName,
        defaultGraphPath,
        protocol,
        poolMax
    };
}
exports.ConnectionPropertiesFromEnv = ConnectionPropertiesFromEnv;
//# sourceMappingURL=ConnectionProperties.js.map