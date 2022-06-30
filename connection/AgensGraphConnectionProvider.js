"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgensGraphConnectionProvider = void 0;
const DatabaseType_1 = require("./DatabaseType");
const AgensGraphConnection_1 = require("./AgensGraphConnection");
const DrivineError_1 = require("../DrivineError");
const AgensResultMapper_1 = require("../mapper/AgensResultMapper");
const AgensGraph = require('@bitnine-oss/ag-driver');
class AgensGraphConnectionProvider {
    constructor(name, type, defaultGraphPath, connectionProperties) {
        this.name = name;
        this.type = type;
        this.defaultGraphPath = defaultGraphPath;
        this.connectionProperties = connectionProperties;
        this.pool = new AgensGraph.Pool({ ...connectionProperties });
    }
    async connect() {
        const client = await this.pool.connect();
        if (!Object.prototype.hasOwnProperty.call(client, 'sessionId')) {
            await this.setSessionId(client);
        }
        if (this.defaultGraphPath && client['graphPath'] !== this.defaultGraphPath) {
            await this.setGraphPath(client, this.defaultGraphPath);
        }
        return new AgensGraphConnection_1.AgensGraphConnection(client, new AgensResultMapper_1.AgensResultMapper(), this.defaultLanguageFor(this.type));
    }
    async end() {
        await this.pool.end();
    }
    async setSessionId(client) {
        const statement = `
            select format('%s.%s', to_hex(extract(epoch from backend_start)::int), to_hex(pid)) as sid
            from pg_stat_activity
            where pid = pg_backend_pid()`;
        const result = await client.query(statement);
        client['sessionId'] = result.rows[0].sid;
    }
    async setGraphPath(client, path) {
        await client.query(`set graph_path = ${path}`);
        client['graphPath'] = path;
    }
    defaultLanguageFor(database) {
        switch (database) {
            case DatabaseType_1.DatabaseType.AGENS_GRAPH:
                return 'CYPHER';
            case DatabaseType_1.DatabaseType.POSTGRES:
                return 'SQL';
            default:
                throw new DrivineError_1.DrivineError(`${database} is not supported by AgensGraphConnectionProvider`);
        }
    }
}
exports.AgensGraphConnectionProvider = AgensGraphConnectionProvider;
//# sourceMappingURL=AgensGraphConnectionProvider.js.map