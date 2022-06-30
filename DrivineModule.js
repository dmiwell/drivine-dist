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
var DrivineModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrivineModule = void 0;
const DrivineModuleBuilder_1 = require("./DrivineModuleBuilder");
const common_1 = require("@nestjs/common");
const DatabaseRegistry_1 = require("./connection/DatabaseRegistry");
const TransactionContextMiddleware_1 = require("./transaction/TransactionContextMiddleware");
const transaction_1 = require("./transaction");
require('dotenv').config({
    path: process.env.DOTENV_CONFIG_PATH || require('find-config')('.env')
});
let DrivineModule = DrivineModule_1 = class DrivineModule {
    constructor(registry) {
        this.registry = registry;
    }
    static withOptions(options) {
        const builder = new DrivineModuleBuilder_1.DrivineModuleBuilder(options);
        return {
            module: DrivineModule_1,
            providers: builder.providers,
            exports: builder.providers
        };
    }
    static tearDownStaticData() {
        transaction_1.TransactionContextHolder.tearDown();
        DatabaseRegistry_1.DatabaseRegistry.tearDown();
    }
    configure(consumer) {
        consumer.apply(TransactionContextMiddleware_1.TransactionContextMiddleware).forRoutes('');
    }
    async onModuleDestroy() {
        await Promise.all(this.registry.providers.map(async (it) => it.end()));
    }
};
DrivineModule = DrivineModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({}),
    __metadata("design:paramtypes", [DatabaseRegistry_1.DatabaseRegistry])
], DrivineModule);
exports.DrivineModule = DrivineModule;
//# sourceMappingURL=DrivineModule.js.map