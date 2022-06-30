"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterPostProcessor = void 0;
class FilterPostProcessor {
    constructor(filterFunction) {
        this.filterFunction = filterFunction;
    }
    apply(results) {
        return results.filter((it) => this.filterFunction(it));
    }
}
exports.FilterPostProcessor = FilterPostProcessor;
//# sourceMappingURL=FilterPostProcessor.js.map