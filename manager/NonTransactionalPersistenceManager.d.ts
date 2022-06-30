import { PersistenceManager } from './PersistenceManager';
import { QuerySpecification } from '../query/QuerySpecification';
import { ConnectionProvider } from '../connection/ConnectionProvider';
import { Cursor } from '../cursor/Cursor';
import { CursorSpecification } from '../cursor/CursorSpecification';
import { DatabaseType } from '../connection';
export declare class NonTransactionalPersistenceManager implements PersistenceManager {
    readonly connectionProvider: ConnectionProvider;
    readonly database: string;
    readonly type: DatabaseType;
    private logger;
    private finderOperations;
    constructor(connectionProvider: ConnectionProvider, database: string, type: DatabaseType);
    query<T>(spec: QuerySpecification<T>): Promise<T[]>;
    execute(spec: QuerySpecification<void>): Promise<void>;
    getOne<T>(spec: QuerySpecification<T>): Promise<T>;
    maybeGetOne<T>(spec: QuerySpecification<T>): Promise<T | undefined>;
    openCursor<T>(spec: CursorSpecification<T>): Promise<Cursor<T>>;
}
