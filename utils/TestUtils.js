"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunWithDrivine = void 0;
const DrivineContext_1 = require("../context/DrivineContext");
const RunWithDrivine = (options) => {
    if (!global['$$runWithDrivine$$']) {
        const drivineContext = (0, DrivineContext_1.inDrivineContext)();
        drivineContext.withTransaction(options);
        hookLifecycleMethods(drivineContext);
        hookTestMethods(drivineContext);
        global['$$runWithDrivine$$'] = true;
    }
};
exports.RunWithDrivine = RunWithDrivine;
function hookLifecycleMethods(drivineContext) {
    const lifecycleMethodsToOverride = ['beforeAll', 'beforeEach', 'afterAll', 'afterEach'];
    lifecycleMethodsToOverride.forEach((methodName) => {
        const original = global[methodName];
        global[methodName] = (fn, timeout) => {
            original(async () => drivineContext.run(fn), timeout);
        };
    });
}
function hookTestMethods(drivineContext) {
    const testMethodsToOverride = ['it', 'test'];
    testMethodsToOverride.forEach((methodName) => {
        const original = global[methodName];
        global[methodName] = (name, fn, timeout) => {
            original(name, async () => drivineContext.run(fn), timeout);
        };
    });
}
//# sourceMappingURL=TestUtils.js.map