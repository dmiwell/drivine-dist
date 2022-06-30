"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrivineContext = exports.inDrivineContext = void 0;
const TransactonContextHolder_1 = require("../transaction/TransactonContextHolder");
const Transactional_1 = require("../transaction/Transactional");
const DatabaseRegistry_1 = require("../connection/DatabaseRegistry");
function inDrivineContext() {
    const contextHolder = TransactonContextHolder_1.TransactionContextHolder.getInstance();
    if (contextHolder.drivineContext) {
        return contextHolder.drivineContext;
    }
    else {
        return new DrivineContext(contextHolder, DatabaseRegistry_1.DatabaseRegistry.getInstance());
    }
}
exports.inDrivineContext = inDrivineContext;
class DrivineContext {
    constructor(contextHolder, databaseRegistry) {
        this.contextHolder = contextHolder;
        this.databaseRegistry = databaseRegistry;
    }
    withTransaction(options) {
        this.transactionOptions = (0, Transactional_1.optionsWithDefaults)(options);
        return this;
    }
    async run(fn) {
        if (this.contextHolder.drivineContext) {
            return this.transactionOptions ? (0, Transactional_1.runInTransaction)(fn, this.transactionOptions) : fn();
        }
        else {
            return this.contextHolder.runPromise(async () => {
                this.contextHolder.drivineContext = this;
                this.contextHolder.databaseRegistry = this.databaseRegistry;
                return this.transactionOptions ? (0, Transactional_1.runInTransaction)(fn, this.transactionOptions) : fn();
            });
        }
    }
}
exports.DrivineContext = DrivineContext;
//# sourceMappingURL=DrivineContext.js.map