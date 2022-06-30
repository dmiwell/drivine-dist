"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersistenceManagerFactory = void 0;
const NonTransactionalPersistenceManager_1 = require("./NonTransactionalPersistenceManager");
const TransactionalPersistenceManager_1 = require("./TransactionalPersistenceManager");
const DatabaseRegistry_1 = require("../connection/DatabaseRegistry");
const TransactonContextHolder_1 = require("../transaction/TransactonContextHolder");
const DrivineError_1 = require("../DrivineError");
const common_1 = require("@nestjs/common");
const DelegatingPersistenceManager_1 = require("./DelegatingPersistenceManager");
let PersistenceManagerFactory = class PersistenceManagerFactory {
    constructor(registry, contextHolder) {
        this.registry = registry;
        this.contextHolder = contextHolder;
        this.managers = new Map();
    }
    get(database = 'default', type = 'DELEGATING') {
        if (!this.managers.get(database)) {
            this.register(database);
        }
        switch (type) {
            case 'TRANSACTIONAL':
                return this.managers.get(database).transactional;
            case 'NON_TRANSACTIONAL':
                return this.managers.get(database).nonTransactional;
            case 'DELEGATING':
                return this.managers.get(database).delegating;
            default:
                throw new DrivineError_1.DrivineError(`Invalid PersistenceManagerType: ${type}`);
        }
    }
    register(name) {
        const connectionProvider = this.registry.connectionProvider(name);
        if (!connectionProvider) {
            throw new DrivineError_1.DrivineError(`No database is registered under name: ${name}`);
        }
        this.managers.set(name, {
            transactional: new TransactionalPersistenceManager_1.TransactionalPersistenceManager(this.contextHolder, name, connectionProvider.type),
            nonTransactional: new NonTransactionalPersistenceManager_1.NonTransactionalPersistenceManager(connectionProvider, name, connectionProvider.type),
            delegating: new DelegatingPersistenceManager_1.DelegatingPersistenceManager(name, connectionProvider.type, this.contextHolder, this)
        });
    }
};
PersistenceManagerFactory = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [DatabaseRegistry_1.DatabaseRegistry, TransactonContextHolder_1.TransactionContextHolder])
], PersistenceManagerFactory);
exports.PersistenceManagerFactory = PersistenceManagerFactory;
//# sourceMappingURL=PersistenceManagerFactory.js.map