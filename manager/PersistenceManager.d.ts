import { QuerySpecification } from '../query/QuerySpecification';
import { Cursor } from '../cursor/Cursor';
import { CursorSpecification } from '../cursor/CursorSpecification';
import { DatabaseType } from '../connection';
export interface PersistenceManager {
    readonly database: string;
    readonly type: DatabaseType;
    query<T>(spec: QuerySpecification<T>): Promise<T[]>;
    execute(spec: QuerySpecification<void>): Promise<void>;
    getOne<T>(spec: QuerySpecification<T>): Promise<T>;
    maybeGetOne<T>(spec: QuerySpecification<T>): Promise<T | undefined>;
    openCursor<T>(spec: CursorSpecification<T>): Promise<Cursor<T>>;
}
