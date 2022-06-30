import { TransactionContextHolder } from '../transaction/TransactonContextHolder';
import { PersistenceManager } from './PersistenceManager';
import { CursorSpecification } from '../cursor/CursorSpecification';
import { QuerySpecification } from '../query/QuerySpecification';
import { Cursor } from '../cursor/Cursor';
import { DatabaseType } from '../connection';
export declare class TransactionalPersistenceManager implements PersistenceManager {
    readonly contextHolder: TransactionContextHolder;
    readonly database: string;
    readonly type: DatabaseType;
    private finderOperations;
    constructor(contextHolder: TransactionContextHolder, database: string, type: DatabaseType);
    query<T>(spec: QuerySpecification<T>): Promise<T[]>;
    execute(spec: QuerySpecification<void>): Promise<void>;
    getOne<T>(spec: QuerySpecification<T>): Promise<T>;
    maybeGetOne<T>(spec: QuerySpecification<T>): Promise<T | undefined>;
    openCursor<T>(spec: CursorSpecification<T>): Promise<Cursor<T>>;
    private currentTransactionOrThrow;
}
