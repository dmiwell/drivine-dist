"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinderOperations = void 0;
const assert = require("assert");
const DrivineError_1 = require("../DrivineError");
class FinderOperations {
    constructor(persistenceManager) {
        this.persistenceManager = persistenceManager;
    }
    async getOne(spec) {
        const results = await this.persistenceManager.query(spec);
        assert(results.length === 1, `Expected exactly one result`);
        return results[0];
    }
    async maybeGetOne(spec) {
        const results = await this.persistenceManager.query(spec);
        if (results.length === 0) {
            return undefined;
        }
        else if (results.length === 1) {
            return results[0];
        }
        else {
            throw new DrivineError_1.DrivineError(`Expected one result, received ${results.length}.`);
        }
    }
}
exports.FinderOperations = FinderOperations;
//# sourceMappingURL=FinderOperations.js.map