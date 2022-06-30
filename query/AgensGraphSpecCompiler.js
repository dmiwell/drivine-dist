"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgensGraphSpecCompiler = void 0;
const QuerySpecificationCompiler_1 = require("./QuerySpecificationCompiler");
const DrivineError_1 = require("../DrivineError");
const assert = require('assert');
class AgensGraphSpecCompiler extends QuerySpecificationCompiler_1.QuerySpecificationCompiler {
    constructor(spec) {
        super(spec);
        this.paramKeys = [];
        assert(['CYPHER', 'SQL'].includes(this.spec.statement.language), `${this.spec.statement.language} is not supported on AgensGraph.`);
        if (!Array.isArray(this.spec.parameters)) {
            this.paramKeys = Object.keys(this.spec.parameters).sort();
            this.indexParams = this.paramKeys.map((it) => this.spec.parameters[it]);
        }
        else {
            this.indexParams = this.spec.parameters;
        }
    }
    formattedStatement() {
        let result = this.appliedStatement();
        for (let i = 0; i < this.paramKeys.length; i++) {
            const key = this.paramKeys[i];
            result = result.replace(`$${key}`, `$${i + 1}`);
        }
        return result;
    }
    formattedParams() {
        if (this.spec.statement.language === 'CYPHER') {
            return this.indexParams.map((it) => JSON.stringify(it));
        }
        else if (this.spec.statement.language === 'SQL') {
            return this.indexParams;
        }
        else {
            throw new DrivineError_1.DrivineError(`${this.spec.statement.language} is not supported on AgensGraph`);
        }
    }
}
exports.AgensGraphSpecCompiler = AgensGraphSpecCompiler;
//# sourceMappingURL=AgensGraphSpecCompiler.js.map