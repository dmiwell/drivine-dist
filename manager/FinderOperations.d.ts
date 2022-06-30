import { PersistenceManager } from './PersistenceManager';
import { QuerySpecification } from '../query/QuerySpecification';
export declare class FinderOperations {
    readonly persistenceManager: PersistenceManager;
    constructor(persistenceManager: PersistenceManager);
    getOne<T>(spec: QuerySpecification<T>): Promise<T>;
    maybeGetOne<T>(spec: QuerySpecification<T>): Promise<T | undefined>;
}
