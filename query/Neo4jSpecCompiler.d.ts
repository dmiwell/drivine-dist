import { QuerySpecificationCompiler } from './QuerySpecificationCompiler';
import { QuerySpecification } from './QuerySpecification';
export declare class Neo4jSpecCompiler extends QuerySpecificationCompiler {
    constructor(spec: QuerySpecification<any>);
    formattedStatement(): string;
    formattedParams(): any;
}
