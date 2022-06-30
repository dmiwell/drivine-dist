"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NonTransactionalPersistenceManager = void 0;
const DrivineError_1 = require("../DrivineError");
const FinderOperations_1 = require("./FinderOperations");
const logger_1 = require("../logger");
class NonTransactionalPersistenceManager {
    constructor(connectionProvider, database, type) {
        this.connectionProvider = connectionProvider;
        this.database = database;
        this.type = type;
        this.logger = new logger_1.DrivineLogger(NonTransactionalPersistenceManager.name);
        this.finderOperations = new FinderOperations_1.FinderOperations(this);
    }
    async query(spec) {
        const connection = await this.connectionProvider.connect();
        try {
            return await connection.query(spec);
        }
        catch (e) {
            throw DrivineError_1.DrivineError.withRootCause(e, spec);
        }
        finally {
            await connection.release();
        }
    }
    async execute(spec) {
        await this.query(spec);
    }
    async getOne(spec) {
        return await this.finderOperations.getOne(spec);
    }
    async maybeGetOne(spec) {
        return await this.finderOperations.maybeGetOne(spec);
    }
    async openCursor(spec) {
        this.logger.verbose(`Open consumer for ${spec}`);
        return new Promise((resolve, reject) => {
            reject(new DrivineError_1.DrivineError(`Not implemented yet, please use TransactionalPersistenceManager`));
        });
    }
}
exports.NonTransactionalPersistenceManager = NonTransactionalPersistenceManager;
//# sourceMappingURL=NonTransactionalPersistenceManager.js.map