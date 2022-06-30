"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuerySpecification = void 0;
const Statement_1 = require("./Statement");
const assert = require("assert");
const MapPostProcessor_1 = require("../mapper/MapPostProcessor");
const TransformPostProcessor_1 = require("../mapper/TransformPostProcessor");
const FilterPostProcessor_1 = require("../mapper/FilterPostProcessor");
class QuerySpecification {
    constructor(statement) {
        this.parameters = [];
        this.postProcessors = [];
        if (statement) {
            this.withStatement(statement);
        }
    }
    static withStatement(statement) {
        return new QuerySpecification(statement);
    }
    withStatement(statement) {
        if (typeof statement === 'string') {
            this.statement = { text: statement, language: 'PLATFORM_DEFAULT' };
        }
        else {
            assert(statement.text, 'statement text is required');
            assert(statement.language, 'statement language is require');
            this.statement = statement;
        }
        return this;
    }
    bind(parameters) {
        if (parameters) {
            this.parameters = parameters;
        }
        return this;
    }
    addPostProcessors(...postProcessors) {
        postProcessors.forEach((processor) => {
            this.postProcessors.push(processor);
        });
        return this;
    }
    map(mapper) {
        this.postProcessors.push(new MapPostProcessor_1.MapPostProcessor(mapper));
        return this;
    }
    transform(type) {
        this.postProcessors.push(new TransformPostProcessor_1.TransformPostProcessor(type));
        return this;
    }
    filter(filter) {
        this.postProcessors.push(new FilterPostProcessor_1.FilterPostProcessor(filter));
        return this;
    }
    skip(results) {
        this._skip = results;
        return this;
    }
    limit(results) {
        this._limit = results;
        return this;
    }
    finalizedCopy(language) {
        return Object.freeze(new QuerySpecification()
            .withStatement((0, Statement_1.toPlatformDefault)(language, this.statement))
            .skip(this._skip)
            .limit(this._limit)
            .bind(this.parameters)
            .addPostProcessors(...this.postProcessors));
    }
}
exports.QuerySpecification = QuerySpecification;
//# sourceMappingURL=QuerySpecification.js.map