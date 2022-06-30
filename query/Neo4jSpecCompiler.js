"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Neo4jSpecCompiler = void 0;
const QuerySpecificationCompiler_1 = require("./QuerySpecificationCompiler");
const assert = require('assert');
class Neo4jSpecCompiler extends QuerySpecificationCompiler_1.QuerySpecificationCompiler {
    constructor(spec) {
        super(spec);
        assert(this.spec.statement.language === 'CYPHER', `${this.spec.statement.language} is not supported on Neo4j.`);
    }
    formattedStatement() {
        return this.appliedStatement();
    }
    formattedParams() {
        if (Array.isArray(this.spec.parameters)) {
            const mapped = this.spec.parameters.map((it, index) => ({ [index + 1]: it }));
            return Object.assign({}, ...mapped);
        }
        else {
            return this.spec.parameters;
        }
    }
}
exports.Neo4jSpecCompiler = Neo4jSpecCompiler;
//# sourceMappingURL=Neo4jSpecCompiler.js.map