"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionsWithDefaults = exports.runInTransaction = exports.Transactional = void 0;
const TransactonContextHolder_1 = require("./TransactonContextHolder");
const Propagation_1 = require("./Propagation");
const DrivineError_1 = require("../DrivineError");
const Transaction_1 = require("./Transaction");
function Transactional(options) {
    return (target, methodName, descriptor) => {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args) {
            if (TransactonContextHolder_1.TransactionContextHolder.getInstance().drivineContext) {
                return runInTransaction(originalMethod.bind(this), options, args);
            }
            else {
                return originalMethod.bind(this)(...args);
            }
        };
    };
}
exports.Transactional = Transactional;
async function runInTransaction(fn, transactionOptions, args = []) {
    const options = optionsWithDefaults(transactionOptions);
    const contextHolder = TransactonContextHolder_1.TransactionContextHolder.getInstance();
    const transaction = contextHolder.currentTransaction || new Transaction_1.Transaction(options, contextHolder);
    try {
        await transaction.pushContext(fn.name || `[anonymous function]`);
        const result = await fn(...args);
        await transaction.popContext();
        return result;
    }
    catch (e) {
        await transaction.popContextWithError(e);
        throw e;
    }
}
exports.runInTransaction = runInTransaction;
function optionsWithDefaults(options) {
    if (options && options.propagation && options.propagation !== Propagation_1.Propagation.REQUIRED) {
        throw new DrivineError_1.DrivineError(`Only REQUIRED level of propagation is currently supported`);
    }
    return {
        rollback: (options && options.rollback) || false,
        propagation: options && options.propagation && options.propagation
    };
}
exports.optionsWithDefaults = optionsWithDefaults;
//# sourceMappingURL=Transactional.js.map