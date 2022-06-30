"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgensRowResultMapper = void 0;
class AgensRowResultMapper {
    mapQueryResults(results, spec) {
        spec.postProcessors.forEach((processor) => {
            results = processor.apply(results);
        });
        return results;
    }
}
exports.AgensRowResultMapper = AgensRowResultMapper;
//# sourceMappingURL=AgensRowResultMapper.js.map