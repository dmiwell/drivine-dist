/// <reference types="node" />
import { Readable, Writable } from 'stream';
export declare class StreamUtils {
    static untilClosed(stream: Readable | Writable): Promise<void>;
}
