import { QuerySpecification } from './query/QuerySpecification';
export declare class DrivineError extends Error {
    readonly rootCause?: Error;
    readonly spec?: QuerySpecification<any>;
    static withRootCause(cause: Error, spec?: QuerySpecification<any>): DrivineError;
    constructor(message?: string, rootCause?: Error, spec?: QuerySpecification<any>);
}
