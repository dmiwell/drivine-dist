"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Neo4jConnectionProvider = void 0;
const Neo4jConnection_1 = require("./Neo4jConnection");
const Neo4jResultMapper_1 = require("../mapper/Neo4jResultMapper");
const neo = require('neo4j-driver');
const short_unique_id_1 = require("short-unique-id");
const shortId = new short_unique_id_1.default({ length: 7 });
class Neo4jConnectionProvider {
    constructor(name, type, host, port, user, password, database, protocol = 'bolt', config) {
        this.name = name;
        this.type = type;
        this.host = host;
        this.port = port;
        this.user = user;
        this.password = password;
        this.database = database;
        this.protocol = protocol;
        this.config = config;
        const authToken = neo.auth.basic(this.user, this.password);
        this.driver = neo.driver(`${this.protocol}://${this.host}:${this.port}`, authToken, { ...config });
    }
    async connect() {
        const session = this.driver.session({
            database: this.database
        });
        session['sessionId'] = shortId();
        const connection = new Neo4jConnection_1.Neo4jConnection(session, new Neo4jResultMapper_1.Neo4jResultMapper());
        return Promise.resolve(connection);
    }
    async end() {
        return this.driver.close();
    }
}
exports.Neo4jConnectionProvider = Neo4jConnectionProvider;
//# sourceMappingURL=Neo4jConnectionProvider.js.map