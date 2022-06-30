"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursorSpecification = void 0;
const QuerySpecification_1 = require("../query/QuerySpecification");
const query_1 = require("../query");
class CursorSpecification extends QuerySpecification_1.QuerySpecification {
    constructor() {
        super(...arguments);
        this.batch = 100;
    }
    batchSize(size) {
        this.batch = size;
        return this;
    }
    finalizedCopy(language) {
        return Object.freeze(new CursorSpecification()
            .withStatement((0, query_1.toPlatformDefault)(language, this.statement))
            .batchSize(this.batch)
            .skip(this._skip)
            .limit(this._limit)
            .bind(this.parameters)
            .addPostProcessors(...this.postProcessors));
    }
}
exports.CursorSpecification = CursorSpecification;
//# sourceMappingURL=CursorSpecification.js.map