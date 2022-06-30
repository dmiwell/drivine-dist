"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TransactionContextHolder_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionContextHolder = void 0;
const common_1 = require("@nestjs/common");
const TransactionContextKeys_1 = require("./TransactionContextKeys");
const LocalStorageFactory_1 = require("../utils/LocalStorageFactory");
let TransactionContextHolder = TransactionContextHolder_1 = class TransactionContextHolder {
    constructor() {
        this.localStorage = (0, LocalStorageFactory_1.MakeLocalStorage)();
    }
    static getInstance() {
        if (!TransactionContextHolder_1.instance) {
            TransactionContextHolder_1.instance = new TransactionContextHolder_1();
        }
        return TransactionContextHolder_1.instance;
    }
    static tearDown() {
        var _a;
        void ((_a = this.instance) === null || _a === void 0 ? void 0 : _a.tearDown());
        delete TransactionContextHolder_1.instance;
    }
    run(fn) {
        return this.localStorage.run(fn);
    }
    runAndReturn(fn) {
        return this.localStorage.runAndReturn(fn);
    }
    async runPromise(fn) {
        return this.localStorage.runPromise(fn);
    }
    get drivineContext() {
        return this.localStorage.get(TransactionContextKeys_1.TransactionContextKeys.DRIVINE_CONTEXT);
    }
    set drivineContext(context) {
        this.localStorage.set(TransactionContextKeys_1.TransactionContextKeys.DRIVINE_CONTEXT, context);
    }
    get currentTransaction() {
        return this.localStorage.get(TransactionContextKeys_1.TransactionContextKeys.TRANSACTION);
    }
    set currentTransaction(transaction) {
        this.localStorage.set(TransactionContextKeys_1.TransactionContextKeys.TRANSACTION, transaction);
    }
    get databaseRegistry() {
        return this.localStorage.get(TransactionContextKeys_1.TransactionContextKeys.DATABASE_REGISTRY);
    }
    set databaseRegistry(registry) {
        this.localStorage.set(TransactionContextKeys_1.TransactionContextKeys.DATABASE_REGISTRY, registry);
    }
    tearDown() {
        this.localStorage.tearDown();
    }
};
TransactionContextHolder = TransactionContextHolder_1 = __decorate([
    (0, common_1.Injectable)()
], TransactionContextHolder);
exports.TransactionContextHolder = TransactionContextHolder;
//# sourceMappingURL=TransactonContextHolder.js.map