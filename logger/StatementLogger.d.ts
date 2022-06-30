import { QuerySpecification } from '../query/QuerySpecification';
export declare class StatementLogger {
    readonly sessionId: string;
    private logger;
    constructor(sessionId: string);
    log(query: QuerySpecification<any>, hrStart: [number, number]): void;
}
