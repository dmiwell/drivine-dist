import { ConnectionProvider } from './ConnectionProvider';
import { Config } from 'neo4j-driver';
import { Connection } from './Connection';
import { DatabaseType } from './DatabaseType';
export declare class Neo4jConnectionProvider implements ConnectionProvider {
    readonly name: string;
    readonly type: DatabaseType;
    readonly host: string;
    readonly port: number;
    readonly user: string;
    readonly password: string | undefined;
    readonly database: string | undefined;
    readonly protocol: string;
    readonly config: Config;
    private driver;
    constructor(name: string, type: DatabaseType, host: string, port: number, user: string, password: string | undefined, database: string | undefined, protocol: string, config: Config);
    connect(): Promise<Connection>;
    end(): Promise<void>;
}
