"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrivineModuleBuilder = void 0;
const DrivineInjectionDecorators_1 = require("./DrivineInjectionDecorators");
const TransactonContextHolder_1 = require("./transaction/TransactonContextHolder");
const TransactionContextMiddleware_1 = require("./transaction/TransactionContextMiddleware");
const TransactionalPersistenceManager_1 = require("./manager/TransactionalPersistenceManager");
const NonTransactionalPersistenceManager_1 = require("./manager/NonTransactionalPersistenceManager");
const Statement_1 = require("./query/Statement");
const DatabaseRegistry_1 = require("./connection/DatabaseRegistry");
const PersistenceManagerFactory_1 = require("./manager/PersistenceManagerFactory");
const logger_1 = require("./logger");
const fs = require('fs');
class DrivineModuleBuilder {
    constructor(options) {
        this.options = options;
        this.logger = new logger_1.DrivineLogger(DrivineModuleBuilder.name);
    }
    get providers() {
        if (!this._providers) {
            this._providers = [
                ...this.infrastructureProviders(),
                ...this.persistenceManagers(),
                ...this.cypherStatementProviders(),
                ...this.sqlStatementProviders(),
                ...this.fileResourceProviders()
            ];
        }
        return this._providers;
    }
    infrastructureProviders() {
        return [
            { provide: DatabaseRegistry_1.DatabaseRegistry, useFactory: () => DatabaseRegistry_1.DatabaseRegistry.getInstance() },
            { provide: TransactonContextHolder_1.TransactionContextHolder, useFactory: () => TransactonContextHolder_1.TransactionContextHolder.getInstance() },
            PersistenceManagerFactory_1.PersistenceManagerFactory,
            TransactionContextMiddleware_1.TransactionContextMiddleware,
            TransactionalPersistenceManager_1.TransactionalPersistenceManager,
            NonTransactionalPersistenceManager_1.NonTransactionalPersistenceManager
        ];
    }
    persistenceManagers() {
        const providers = DatabaseRegistry_1.DatabaseRegistry.getInstance().providers.map((provider) => provider.name);
        return providers.map((database) => {
            return {
                provide: `PersistenceManager:${database}`,
                inject: [PersistenceManagerFactory_1.PersistenceManagerFactory],
                useFactory: (persistenceManagerFactory) => {
                    return persistenceManagerFactory.get(database);
                }
            };
        });
    }
    fileResourceProviders() {
        return DrivineInjectionDecorators_1.fileContentInjections.map((path) => {
            const token = `FileContents:${path}`;
            return {
                provide: token,
                useFactory: () => {
                    return this.fileContents(path);
                }
            };
        });
    }
    cypherStatementProviders() {
        return DrivineInjectionDecorators_1.cypherInjections.map((path) => {
            const token = `CYPHER:${path}`;
            return {
                provide: token,
                useFactory: () => (0, Statement_1.cypherStatement)(this.fileContents(path))
            };
        });
    }
    sqlStatementProviders() {
        return DrivineInjectionDecorators_1.sqlInjections.map((path) => {
            const token = `SQL:${path}`;
            return {
                provide: token,
                useFactory: () => (0, Statement_1.sqlStatement)(this.fileContents(path))
            };
        });
    }
    fileContents(path) {
        return fs.readFileSync(path, { encoding: 'UTF8' });
    }
}
exports.DrivineModuleBuilder = DrivineModuleBuilder;
//# sourceMappingURL=DrivineModuleBuilder.js.map