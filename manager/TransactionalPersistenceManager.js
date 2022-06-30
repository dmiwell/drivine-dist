"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionalPersistenceManager = void 0;
const DrivineError_1 = require("../DrivineError");
const FinderOperations_1 = require("./FinderOperations");
class TransactionalPersistenceManager {
    constructor(contextHolder, database, type) {
        this.contextHolder = contextHolder;
        this.database = database;
        this.type = type;
        this.finderOperations = new FinderOperations_1.FinderOperations(this);
    }
    async query(spec) {
        const transaction = this.currentTransactionOrThrow();
        return transaction.query(spec, this.database);
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
        const transaction = this.currentTransactionOrThrow();
        return transaction.openCursor(spec, this.database);
    }
    currentTransactionOrThrow() {
        const transaction = this.contextHolder.currentTransaction;
        if (!transaction) {
            throw new DrivineError_1.DrivineError('TransactionalPersistenceManager ' +
                'requires a transaction. Mark the transactional method with the @Transactional() decorator, or use ' +
                'NonTransactionalPersistenceManager');
        }
        return transaction;
    }
}
exports.TransactionalPersistenceManager = TransactionalPersistenceManager;
//# sourceMappingURL=TransactionalPersistenceManager.js.map