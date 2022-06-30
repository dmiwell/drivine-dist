"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Neo4jCursor = void 0;
const QuerySpecification_1 = require("../query/QuerySpecification");
const AbstractCursor_1 = require("./AbstractCursor");
class Neo4jCursor extends AbstractCursor_1.AbstractCursor {
    constructor(sessionId, spec, connection) {
        super(sessionId, spec);
        this.connection = connection;
        this.page = 0;
    }
    async read(count) {
        const results = await this.connection.query(new QuerySpecification_1.QuerySpecification()
            .withStatement(this.spec.statement)
            .skip(count * this.page)
            .limit(count)
            .bind(this.spec.parameters)
            .addPostProcessors(...this.spec.postProcessors));
        this.page++;
        return results;
    }
    async close() {
        return Promise.resolve();
    }
}
exports.Neo4jCursor = Neo4jCursor;
//# sourceMappingURL=Neo4jCursor.js.map