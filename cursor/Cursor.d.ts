/// <reference types="node" />
import { CursorStreamOptions } from './CursorStreamOptions';
import { Readable } from 'stream';
export interface Cursor<T> {
    [Symbol.asyncIterator](): AsyncIterator<T>;
    asStream(options?: CursorStreamOptions<T>): Readable;
    close(): Promise<void>;
}
