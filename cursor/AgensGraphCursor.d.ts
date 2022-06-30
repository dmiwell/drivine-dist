import { CursorSpecification } from './CursorSpecification';
import { ResultMapper } from '../mapper/ResultMapper';
import { AbstractCursor } from './AbstractCursor';
export declare class AgensGraphCursor<T> extends AbstractCursor<T> implements AsyncIterable<T> {
    private readonly pgCursor;
    private readonly resultMapper;
    constructor(sessionId: string, spec: CursorSpecification<T>, pgCursor: any, resultMapper: ResultMapper);
    read(count: number): Promise<T[]>;
    close(): Promise<void>;
}
