import { Connection } from './Connection';
import { QuerySpecification } from '../query/QuerySpecification';
import { CursorSpecification } from '../cursor/CursorSpecification';
import { Session } from 'neo4j-driver';
import { ResultMapper } from '../mapper/ResultMapper';
import { Neo4jCursor } from '../cursor/Neo4jCursor';
export declare class Neo4jConnection implements Connection {
    readonly session: Session;
    readonly resultMapper: ResultMapper;
    private logger;
    private transaction?;
    constructor(session: Session, resultMapper: ResultMapper);
    sessionId(): string;
    query<T>(spec: QuerySpecification<T>): Promise<any[]>;
    openCursor<T>(spec: CursorSpecification<T>): Promise<Neo4jCursor<T>>;
    startTransaction(): Promise<void>;
    commitTransaction(): Promise<void>;
    rollbackTransaction(): Promise<void>;
    release(err?: Error): Promise<void>;
}
