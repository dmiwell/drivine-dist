"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgensResultMapper = void 0;
const AgensRowResultMapper_1 = require("./AgensRowResultMapper");
const AgensGraphResultMapper_1 = require("./AgensGraphResultMapper");
const DrivineError_1 = require("../DrivineError");
class AgensResultMapper {
    constructor() {
        this.graphMapper = new AgensGraphResultMapper_1.AgensGraphResultMapper();
        this.rowMapper = new AgensRowResultMapper_1.AgensRowResultMapper();
    }
    mapQueryResults(results, spec) {
        switch (spec.statement.language) {
            case 'CYPHER':
                return this.graphMapper.mapQueryResults(results, spec);
            case 'SQL':
                return this.rowMapper.mapQueryResults(results, spec);
            default:
                throw new DrivineError_1.DrivineError(`${spec.statement.language} does not have a supported result mapper.`);
        }
    }
}
exports.AgensResultMapper = AgensResultMapper;
//# sourceMappingURL=AgensResultMapper.js.map