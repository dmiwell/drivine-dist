"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStorageAls = void 0;
const async_hooks_1 = require("async_hooks");
class LocalStorageAls {
    constructor() {
        this.asyncLocalStorage = new async_hooks_1.AsyncLocalStorage();
    }
    run(fn) {
        this.asyncLocalStorage.run(new Map(), fn);
    }
    runAndReturn(fn) {
        this.asyncLocalStorage.enterWith(new Map());
        const result = fn();
        this.asyncLocalStorage.exit(() => {
        });
        return result;
    }
    async runPromise(fn) {
        let result;
        await this.asyncLocalStorage.run(new Map(), async () => {
            result = await fn();
            return result;
        });
        return result;
    }
    isInsideRun() {
        return this.asyncLocalStorage.getStore() !== undefined;
    }
    get(key) {
        var _a;
        return (_a = this.asyncLocalStorage.getStore()) === null || _a === void 0 ? void 0 : _a.get(key);
    }
    set(key, object) {
        if (!this.isInsideRun()) {
            throw new Error(`Trying to write to LocalStorage outside "run" method. Use LocalStorage inside "run" methods, or check and ignore this write using "isInsideRun()".`);
        }
        const store = this.asyncLocalStorage.getStore();
        store === null || store === void 0 ? void 0 : store.set(key, object);
    }
    tearDown() {
        this.asyncLocalStorage.disable();
    }
}
exports.LocalStorageAls = LocalStorageAls;
//# sourceMappingURL=LocalStorageAls.js.map