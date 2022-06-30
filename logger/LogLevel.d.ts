import { Format } from 'cli-color';
export declare class LogLevel {
    readonly key: string;
    readonly value: number;
    readonly consoleString: string;
    readonly color: Format;
    static VERBOSE: LogLevel;
    static DEBUG: LogLevel;
    static INFO: LogLevel;
    static WARN: LogLevel;
    static ERROR: LogLevel;
    static NONE: LogLevel;
    static from(name?: string): LogLevel;
    private constructor();
}
