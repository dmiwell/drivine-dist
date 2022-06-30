import Stack from 'ts-data.stack';
import { TransactionContextHolder } from './TransactonContextHolder';
import { CursorSpecification } from '../cursor/CursorSpecification';
import { QuerySpecification } from '../query/QuerySpecification';
import { Cursor } from '../cursor/Cursor';
import { Connection } from '../connection/Connection';
import { TransactionOptions } from './Transactional';
export declare class Transaction {
    readonly contextHolder: TransactionContextHolder;
    readonly id: string;
    readonly callStack: Stack<string>;
    readonly connectionRegistry: Map<string, Connection>;
    readonly cursors: Cursor<any>[];
    private readonly logger;
    private _options;
    constructor(options: TransactionOptions, contextHolder: TransactionContextHolder);
    get description(): string;
    get databases(): string[];
    get connections(): Connection[];
    query<T>(spec: QuerySpecification<T>, database: string): Promise<T[]>;
    openCursor<T>(spec: CursorSpecification<T>, database: string): Promise<Cursor<T>>;
    pushContext(context: string | symbol): Promise<void>;
    popContext(): Promise<void>;
    popContextWithError(e: Error): Promise<void>;
    markAsRollback(): void;
    get options(): TransactionOptions;
    set options(options: TransactionOptions);
    private connectionFor;
    private releaseClient;
}
