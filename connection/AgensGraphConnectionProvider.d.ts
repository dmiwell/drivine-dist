import { DatabaseType } from './DatabaseType';
import { PoolConfig } from 'pg';
import { Connection } from './Connection';
import { ConnectionProvider } from './ConnectionProvider';
export declare class AgensGraphConnectionProvider implements ConnectionProvider {
    readonly name: string;
    readonly type: DatabaseType;
    readonly defaultGraphPath: string | undefined;
    readonly connectionProperties: PoolConfig;
    private readonly pool;
    constructor(name: string, type: DatabaseType, defaultGraphPath: string | undefined, connectionProperties: PoolConfig);
    connect(): Promise<Connection>;
    end(): Promise<void>;
    private setSessionId;
    private setGraphPath;
    private defaultLanguageFor;
}
