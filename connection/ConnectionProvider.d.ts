import { Connection } from './Connection';
import { DatabaseType } from './DatabaseType';
export interface ConnectionProvider {
    name: string;
    type: DatabaseType;
    connect(): Promise<Connection>;
    end(): Promise<void>;
}
