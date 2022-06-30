"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionProviderBuilder = void 0;
const DatabaseType_1 = require("./DatabaseType");
const DrivineError_1 = require("../DrivineError");
const Neo4jConnectionProvider_1 = require("./Neo4jConnectionProvider");
const assert = require("assert");
const AgensGraphConnectionProvider_1 = require("./AgensGraphConnectionProvider");
const logger_1 = require("../logger");
class ConnectionProviderBuilder {
    constructor(registry) {
        this.logger = new logger_1.DrivineLogger(ConnectionProviderBuilder.name);
        this.registry = registry;
    }
    withProperties(properties) {
        var _a, _b;
        this._type = properties.databaseType;
        this._host = properties.host;
        this._port = properties.port;
        this._userName = properties.userName;
        this._password = properties.password;
        this._idleTimeout = properties.idleTimeout;
        this._connectionTimeout = (_a = properties.connectionTimeout) !== null && _a !== void 0 ? _a : 5000;
        this._name = properties.databaseName;
        this._defaultGraphPath = properties.defaultGraphPath;
        this._protocol = properties.protocol;
        this._poolMax = (_b = properties.poolMax) !== null && _b !== void 0 ? _b : 40;
        return this;
    }
    withType(type) {
        assert(type, `database type argument is required`);
        this._type = type;
        return this;
    }
    host(host) {
        this._host = host;
        return this;
    }
    port(port) {
        this._port = port;
        return this;
    }
    userName(userName) {
        this._userName = userName;
        return this;
    }
    password(password) {
        this._password = password;
        return this;
    }
    protocol(protocol) {
        this._protocol = protocol;
        return this;
    }
    idleTimeout(idleTimeout) {
        this._idleTimeout = idleTimeout;
        return this;
    }
    databaseName(name) {
        this._name = name;
        return this;
    }
    defaultGraphPath(path) {
        this._defaultGraphPath = path;
        return this;
    }
    register(name = 'default') {
        const retained = this.registry.connectionProvider(name);
        if (retained != undefined) {
            return retained;
        }
        assert(this._host, `host config is required`);
        if (this._type === DatabaseType_1.DatabaseType.AGENS_GRAPH || this._type == DatabaseType_1.DatabaseType.POSTGRES) {
            this.registry.register(this.buildAgensGraphAndPostgresProvider(name));
        }
        else if (this._type === DatabaseType_1.DatabaseType.NEO4J) {
            this.registry.register(this.buildNeo4jProvider(name));
        }
        else {
            throw new DrivineError_1.DrivineError(`Type ${this._type} is not supported by ConnectionProviderBuilder`);
        }
        return this.registry.connectionProvider(name);
    }
    buildAgensGraphAndPostgresProvider(name) {
        if (!this._port) {
            this._port = 5432;
        }
        if (this._port !== 5432) {
            this.logger.warn(`${this._port} is a non-standard port for AgensGraph/Postgres.`);
        }
        if (!this._idleTimeout) {
            this._idleTimeout = 500;
        }
        assert(this._name, `Database name is required`);
        return new AgensGraphConnectionProvider_1.AgensGraphConnectionProvider(name, this._type, this._defaultGraphPath, {
            host: this._host,
            user: this._userName,
            password: this._password,
            database: this._name,
            port: this._port,
            idleTimeoutMillis: this._idleTimeout,
            connectionTimeoutMillis: this._connectionTimeout,
            max: this._poolMax
        });
    }
    buildNeo4jProvider(name) {
        assert(this._userName, `Neo4j requires a username`);
        if (this._idleTimeout) {
            this.logger.warn(`idleTimeout is not supported by Neo4j`);
        }
        if (!this._port) {
            this._port = 7687;
        }
        if (this._port !== 7687) {
            this.logger.warn(`${this._port} is a non-standard port for Neo4j`);
        }
        return new Neo4jConnectionProvider_1.Neo4jConnectionProvider(name, this._type, this._host, this._port, this._userName, this._password, this._name, this._protocol, {
            connectionTimeout: this._connectionTimeout,
            maxConnectionPoolSize: this._poolMax
        });
    }
}
exports.ConnectionProviderBuilder = ConnectionProviderBuilder;
//# sourceMappingURL=ConnectionProviderBuilder.js.map