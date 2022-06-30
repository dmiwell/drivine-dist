import { Connection } from './Connection';
import { PoolClient } from 'pg';
import { QuerySpecification } from '../query/QuerySpecification';
import { ResultMapper } from '../mapper/ResultMapper';
import { CursorSpecification } from '../cursor/CursorSpecification';
import { AgensGraphCursor } from '../cursor/AgensGraphCursor';
import { QueryLanguage } from '../query';
export declare class AgensGraphConnection implements Connection {
    readonly client: PoolClient;
    readonly resultMapper: ResultMapper;
    readonly defaultLanguage: QueryLanguage;
    private logger;
    constructor(client: PoolClient, resultMapper: ResultMapper, defaultLanguage: QueryLanguage);
    sessionId(): string;
    query<T>(spec: QuerySpecification<T>): Promise<any[]>;
    openCursor<T>(spec: CursorSpecification<T>): Promise<AgensGraphCursor<T>>;
    startTransaction(): Promise<void>;
    commitTransaction(): Promise<void>;
    rollbackTransaction(): Promise<void>;
    release(err?: Error): Promise<void>;
}
