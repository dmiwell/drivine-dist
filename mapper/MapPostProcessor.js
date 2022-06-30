"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapPostProcessor = void 0;
class MapPostProcessor {
    constructor(mapFunction) {
        this.mapFunction = mapFunction;
    }
    apply(results) {
        return results.map((it) => this.mapFunction(it));
    }
}
exports.MapPostProcessor = MapPostProcessor;
//# sourceMappingURL=MapPostProcessor.js.map