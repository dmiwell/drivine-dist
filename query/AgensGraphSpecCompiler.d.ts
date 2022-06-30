import { QuerySpecificationCompiler } from './QuerySpecificationCompiler';
import { QuerySpecification } from './QuerySpecification';
export declare class AgensGraphSpecCompiler extends QuerySpecificationCompiler {
    private readonly paramKeys;
    private readonly indexParams;
    constructor(spec: QuerySpecification<any>);
    formattedStatement(): string;
    formattedParams(): any;
}
