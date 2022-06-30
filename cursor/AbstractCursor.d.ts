/// <reference types="node" />
import { Readable } from 'stream';
import { CursorStreamOptions } from './CursorStreamOptions';
import { CursorSpecification } from './CursorSpecification';
import { StatementLogger } from '../logger/StatementLogger';
import { Cursor } from './Cursor';
import { DrivineLogger } from '../logger';
export declare abstract class AbstractCursor<T> implements Cursor<T> {
    protected readonly sessionId: string;
    protected readonly spec: CursorSpecification<T>;
    protected logger: DrivineLogger;
    protected currentBatch: T[];
    protected currentIndex: number;
    protected stream?: Readable;
    protected queryLogger: StatementLogger;
    protected constructor(sessionId: string, spec: CursorSpecification<T>);
    [Symbol.asyncIterator](): AsyncIterator<T>;
    asStream(options?: CursorStreamOptions<T>): Readable;
    private composeStreamWithOptions;
    private transformStream;
    private readBatchIfExpired;
    abstract close(): Promise<void>;
    abstract read(count: number): Promise<T[]>;
}
