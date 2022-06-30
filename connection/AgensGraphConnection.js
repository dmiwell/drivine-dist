"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgensGraphConnection = void 0;
const AgensGraphCursor_1 = require("../cursor/AgensGraphCursor");
const StatementLogger_1 = require("../logger/StatementLogger");
const logger_1 = require("../logger");
const AgensGraphSpecCompiler_1 = require("../query/AgensGraphSpecCompiler");
const PgCursor = require('pg-cursor');
class AgensGraphConnection {
    constructor(client, resultMapper, defaultLanguage) {
        this.client = client;
        this.resultMapper = resultMapper;
        this.defaultLanguage = defaultLanguage;
        this.logger = new logger_1.DrivineLogger(AgensGraphConnection.name);
    }
    sessionId() {
        return this.client['sessionId'];
    }
    async query(spec) {
        const finalizedSpec = spec.finalizedCopy(this.defaultLanguage);
        const compiledSpec = new AgensGraphSpecCompiler_1.AgensGraphSpecCompiler(finalizedSpec).compile();
        const hrStart = process.hrtime();
        const logger = new StatementLogger_1.StatementLogger(this.sessionId());
        const result = await this.client.query(compiledSpec.statement, compiledSpec.parameters);
        logger.log(spec, hrStart);
        return this.resultMapper.mapQueryResults(result.rows, finalizedSpec);
    }
    async openCursor(spec) {
        const finalizedSpec = spec.finalizedCopy(this.defaultLanguage);
        const compiledSpec = new AgensGraphSpecCompiler_1.AgensGraphSpecCompiler(finalizedSpec).compile();
        const pgCursorSpec = new PgCursor(compiledSpec.statement, compiledSpec.parameters);
        const pgCursor = await this.client.query(pgCursorSpec);
        return new AgensGraphCursor_1.AgensGraphCursor(this.sessionId(), finalizedSpec, pgCursor, this.resultMapper);
    }
    async startTransaction() {
        await this.client.query(`BEGIN`);
    }
    async commitTransaction() {
        await this.client.query(`COMMIT`);
    }
    async rollbackTransaction() {
        await this.client.query(`ROLLBACK`);
    }
    async release(err) {
        if (err) {
            this.logger.warn(`Closing session with error: ${err}`);
        }
        this.client.release(err);
        return Promise.resolve();
    }
}
exports.AgensGraphConnection = AgensGraphConnection;
//# sourceMappingURL=AgensGraphConnection.js.map