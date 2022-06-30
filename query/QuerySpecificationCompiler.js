"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuerySpecificationCompiler = void 0;
class QuerySpecificationCompiler {
    constructor(spec) {
        this.spec = spec;
    }
    compile() {
        return {
            statement: this.formattedStatement().trim(),
            parameters: this.formattedParams()
        };
    }
    appliedStatement() {
        return `${this.spec.statement.text} ${this.skipClause()} ${this.limitClause()}`;
    }
    skipClause() {
        if (this.spec._skip) {
            return `${this.spec.statement.language === 'CYPHER' ? `SKIP` : `OFFSET`} ${this.spec._skip}`;
        }
        return ``;
    }
    limitClause() {
        return this.spec._limit ? `LIMIT ${this.spec._limit}` : ``;
    }
}
exports.QuerySpecificationCompiler = QuerySpecificationCompiler;
//# sourceMappingURL=QuerySpecificationCompiler.js.map