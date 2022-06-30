"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseRegistry = void 0;
const ConnectionProviderBuilder_1 = require("./ConnectionProviderBuilder");
const ConnectionProperties_1 = require("./ConnectionProperties");
class DatabaseRegistry {
    constructor() {
        this._providers = new Map();
    }
    static buildOrResolveFromEnv(name) {
        return DatabaseRegistry.getInstance()
            .builder()
            .withProperties((0, ConnectionProperties_1.ConnectionPropertiesFromEnv)(name))
            .register(name);
    }
    static getInstance() {
        if (!DatabaseRegistry.instance) {
            DatabaseRegistry.instance = new DatabaseRegistry();
        }
        return DatabaseRegistry.instance;
    }
    static tearDown() {
        delete DatabaseRegistry.instance;
    }
    get providers() {
        return Array.from(this._providers.values());
    }
    builder() {
        return new ConnectionProviderBuilder_1.ConnectionProviderBuilder(this);
    }
    connectionProvider(name = 'default') {
        if (name === 'default') {
            return this._providers.values().next().value;
        }
        return this._providers.get(name);
    }
    register(connectionProvider) {
        this._providers.set(connectionProvider.name, connectionProvider);
    }
}
exports.DatabaseRegistry = DatabaseRegistry;
//# sourceMappingURL=DatabaseRegistry.js.map