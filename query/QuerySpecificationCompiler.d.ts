import { QuerySpecification } from './index';
import { CompiledQuery } from './CompiledQuery';
export declare abstract class QuerySpecificationCompiler {
    readonly spec: QuerySpecification<any>;
    protected constructor(spec: QuerySpecification<any>);
    compile(): CompiledQuery;
    protected appliedStatement(): string;
    protected skipClause(): string;
    protected limitClause(): string;
    abstract formattedStatement(): string;
    abstract formattedParams(): any;
}
