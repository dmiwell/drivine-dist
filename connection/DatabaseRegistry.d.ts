import { ConnectionProvider } from './ConnectionProvider';
import { ConnectionProviderBuilder } from './ConnectionProviderBuilder';
export declare class DatabaseRegistry {
    private static instance;
    private _providers;
    static buildOrResolveFromEnv(name?: string): ConnectionProvider;
    static getInstance(): DatabaseRegistry;
    static tearDown(): void;
    private constructor();
    get providers(): ConnectionProvider[];
    builder(): ConnectionProviderBuilder;
    connectionProvider(name?: string): ConnectionProvider | undefined;
    register(connectionProvider: ConnectionProvider): void;
}
