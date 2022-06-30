export declare class DrivineLogger {
    readonly context: string;
    private readonly enabledLevel;
    constructor(context: string);
    error(message: any, trace?: string, context?: string): void;
    fatal(message: any, error?: Error): void;
    log(message: any, context?: string): void;
    warn(message: any, context?: string): void;
    debug(message: any, context?: string): void;
    verbose(message: any, context?: string): void;
    private printMessage;
    private printStackTrace;
}
