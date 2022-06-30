/// <reference types="node" />
import { LogLevel } from './LogLevel';
import { Writable } from 'stream';
export declare class LogMessage {
    readonly level: LogLevel;
    readonly time: Date;
    readonly message: any;
    readonly context?: string | undefined;
    constructor(level: LogLevel, time: Date, message: any, context?: string | undefined);
    write(stream: Writable): void;
    toConsole(): string;
}
