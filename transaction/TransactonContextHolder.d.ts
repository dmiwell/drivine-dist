import { Transaction } from './Transaction';
import { DatabaseRegistry } from '../connection/DatabaseRegistry';
import { DrivineContext } from '../context/DrivineContext';
export declare class TransactionContextHolder {
    static instance: TransactionContextHolder | undefined;
    readonly localStorage: import("../utils/LocalStorage").LocalStorage;
    static getInstance(): TransactionContextHolder;
    static tearDown(): void;
    run(fn: (...args: any[]) => void): void;
    runAndReturn<T>(fn: (...args: any[]) => T): T;
    runPromise<T>(fn: (...args: any[]) => Promise<T>): Promise<T>;
    get drivineContext(): DrivineContext | undefined;
    set drivineContext(context: DrivineContext | undefined);
    get currentTransaction(): Transaction | undefined;
    set currentTransaction(transaction: Transaction | undefined);
    get databaseRegistry(): DatabaseRegistry;
    set databaseRegistry(registry: DatabaseRegistry);
    private tearDown;
}
