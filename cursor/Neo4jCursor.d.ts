import { CursorSpecification } from './CursorSpecification';
import { Neo4jConnection } from '../connection/Neo4jConnection';
import { AbstractCursor } from './AbstractCursor';
export declare class Neo4jCursor<T> extends AbstractCursor<T> {
    private readonly connection;
    private page;
    constructor(sessionId: string, spec: CursorSpecification<T>, connection: Neo4jConnection);
    read(count: number): Promise<T[]>;
    close(): Promise<void>;
}
