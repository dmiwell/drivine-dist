"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DelegatingPersistenceManager = void 0;
const logger_1 = require("../logger");
class DelegatingPersistenceManager {
    constructor(database, type, contextHolder, factory) {
        this.database = database;
        this.type = type;
        this.contextHolder = contextHolder;
        this.factory = factory;
        this.logger = new logger_1.DrivineLogger(DelegatingPersistenceManager.name);
    }
    async getOne(spec) {
        return this.persistenceManager().getOne(spec);
    }
    async maybeGetOne(spec) {
        return this.persistenceManager().maybeGetOne(spec);
    }
    async openCursor(spec) {
        return this.persistenceManager().openCursor(spec);
    }
    async query(spec) {
        return this.persistenceManager().query(spec);
    }
    async execute(spec) {
        return this.persistenceManager().execute(spec);
    }
    persistenceManager() {
        const type = this.contextHolder.currentTransaction ? 'TRANSACTIONAL' : 'NON_TRANSACTIONAL';
        this.logger.verbose(`Using persistence manager: ${type}`);
        return this.factory.get(this.database, type);
    }
}
exports.DelegatingPersistenceManager = DelegatingPersistenceManager;
//# sourceMappingURL=DelegatingPersistenceManager.js.map