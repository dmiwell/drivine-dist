"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Neo4jConnection = void 0;
const StatementLogger_1 = require("../logger/StatementLogger");
const DrivineError_1 = require("../DrivineError");
const Neo4jCursor_1 = require("../cursor/Neo4jCursor");
const logger_1 = require("../logger");
const Neo4jSpecCompiler_1 = require("../query/Neo4jSpecCompiler");
class Neo4jConnection {
    constructor(session, resultMapper) {
        this.session = session;
        this.resultMapper = resultMapper;
        this.logger = new logger_1.DrivineLogger(Neo4jConnection.name);
    }
    sessionId() {
        return this.session['sessionId'];
    }
    async query(spec) {
        const finalizedSpec = spec.finalizedCopy('CYPHER');
        const compiledSpec = new Neo4jSpecCompiler_1.Neo4jSpecCompiler(finalizedSpec).compile();
        const hrStart = process.hrtime();
        const logger = new StatementLogger_1.StatementLogger(this.sessionId());
        let result;
        if (!this.transaction) {
            result = await this.session.run(compiledSpec.statement, compiledSpec.parameters);
        }
        else {
            result = await this.transaction.run(compiledSpec.statement, compiledSpec.parameters);
        }
        logger.log(spec, hrStart);
        return this.resultMapper.mapQueryResults(result.records, finalizedSpec);
    }
    async openCursor(spec) {
        return Promise.resolve(new Neo4jCursor_1.Neo4jCursor(this.sessionId(), spec.finalizedCopy('CYPHER'), this));
    }
    async startTransaction() {
        this.transaction = this.session.beginTransaction();
        return Promise.resolve();
    }
    async commitTransaction() {
        if (!this.transaction) {
            throw new DrivineError_1.DrivineError(`There is no transaction to commit.`);
        }
        await this.transaction.commit();
    }
    async rollbackTransaction() {
        if (!this.transaction) {
            throw new DrivineError_1.DrivineError(`There is no transaction to commit.`);
        }
        await this.transaction.rollback();
    }
    async release(err) {
        if (err) {
            this.logger.warn(`Closing session with error: ${err}`);
        }
        return this.session.close();
    }
}
exports.Neo4jConnection = Neo4jConnection;
//# sourceMappingURL=Neo4jConnection.js.map