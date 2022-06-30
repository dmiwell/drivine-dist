import { DynamicModule, MiddlewareConsumer, NestModule, OnModuleDestroy, Provider, Type } from '@nestjs/common';
import { ConnectionProvider } from './connection/ConnectionProvider';
import { DatabaseRegistry } from './connection/DatabaseRegistry';
export interface DrivineModuleOptions {
    connectionProviders: ConnectionProvider[];
}
export declare class DrivineModule implements DynamicModule, NestModule, OnModuleDestroy {
    readonly registry: DatabaseRegistry;
    readonly module: Type<DrivineModule>;
    readonly providers: Provider[];
    readonly exports: Provider[];
    static withOptions(options: DrivineModuleOptions): DynamicModule;
    static tearDownStaticData(): void;
    constructor(registry: DatabaseRegistry);
    configure(consumer: MiddlewareConsumer): any;
    onModuleDestroy(): Promise<any>;
}
