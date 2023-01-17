"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const ts_data_stack_1 = require("ts-data.stack");
const assert = require("assert");
const DrivineError_1 = require("../DrivineError");
const logger_1 = require("../logger");
const short_unique_id_1 = require("short-unique-id");
const shortId = new short_unique_id_1.default({ length: 7 });
class Transaction {
    constructor(options, contextHolder) {
        this.contextHolder = contextHolder;
        this.logger = new logger_1.DrivineLogger(Transaction.name);
        this.id = shortId();
        this.callStack = new ts_data_stack_1.default();
        this.connectionRegistry = new Map();
        this.cursors = [];
        this.options = options;
        this.contextHolder.currentTransaction = this;
    }
    get description() {
        return `${this.id} [${this.databases}]`;
    }
    get databases() {
        return Array.from(this.connectionRegistry.keys());
    }
    get connections() {
        return Array.from(this.connectionRegistry.values());
    }
    async query(spec, database) {
        assert(this.callStack.count(), `pushContext() must be called running a query`);
        try {
            const connection = await this.connectionFor(database);
            const results = await connection.query(spec);
            return results;
        }
        catch (e) {
            throw DrivineError_1.DrivineError.withRootCause(e, spec);
        }
    }
    async openCursor(spec, database) {
        assert(this.callStack.count(), `pushContext() must be called running a query`);
        const connection = await this.connectionFor(database);
        const cursor = await connection.openCursor(spec);
        this.cursors.push(cursor);
        return cursor;
    }
    async pushContext(context) {
        if (this.callStack.isEmpty()) {
            this.logger.verbose(`Starting transaction: ${this.id}`);
        }
        this.callStack.push(String(context));
        return Promise.resolve();
    }
    async popContext() {
        this.callStack.pop();
        if (this.callStack.isEmpty()) {
            this.logger.verbose(`Closing ${this.cursors.length} open cursors.`);
            await Promise.all(this.cursors.map(async (it) => it.close()));
            if (this.options.rollback) {
                this.logger.verbose(`Transaction: ${this.description} successful, but is marked ROLLBACK. Rolling back.`);
                await Promise.all(this.connections.map(async (it) => it.rollbackTransaction()));
            }
            else {
                this.logger.verbose(`Committing transaction: ${this.description}.`);
                await Promise.all(this.connections.map(async (it) => it.commitTransaction()));
            }
            await this.releaseClient();
        }
    }
    async popContextWithError(e) {
        if (this.callStack.isEmpty()) {
            throw e;
        }
        this.callStack.pop();
        if (this.callStack.isEmpty()) {
            this.logger.verbose(`Rolling back transaction: ${this.description} due to error: ${e.message}.`);
            await Promise.all(this.connections.map(async (it) => it.rollbackTransaction()));
            await this.releaseClient(e);
        }
    }
    markAsRollback() {
        this._options = { ...this._options, rollback: true };
    }
    get options() {
        return this._options;
    }
    set options(options) {
        assert(this.callStack.isEmpty(), `Can't set options if the transaction is already in flight`);
        this._options = options;
    }
    async connectionFor(database) {
        if (!this.connectionRegistry.get(database)) {
            const databaseRegistry = this.contextHolder.databaseRegistry;
            const connectionProvider = databaseRegistry.connectionProvider(database);
            if (!connectionProvider) {
                throw new DrivineError_1.DrivineError(`There is no database registered with key: ${database}`);
            }
            const connection = await connectionProvider.connect();
            this.connectionRegistry.set(database, connection);
            await connection.startTransaction();
        }
        return this.connectionRegistry.get(database);
    }
    async releaseClient(error) {
        this.logger.verbose(`Releasing connection(s) for transaction: ${this.id}`);
        await Promise.all(this.connections.map(async (it) => it.release(error)));
        this.contextHolder.currentTransaction = undefined;
    }
}
exports.Transaction = Transaction;
//# sourceMappingURL=Transaction.js.map