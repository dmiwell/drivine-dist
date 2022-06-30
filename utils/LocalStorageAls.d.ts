/// <reference types="node" />
import { LocalStorage } from './LocalStorage';
import { AsyncLocalStorage } from 'async_hooks';
export declare class LocalStorageAls implements LocalStorage {
    asyncLocalStorage: AsyncLocalStorage<Map<string, any>>;
    run(fn: (...args: any[]) => void): void;
    runAndReturn<T>(fn: (...args: any[]) => T): T;
    runPromise<T>(fn: (...args: any[]) => Promise<T>): Promise<T>;
    isInsideRun(): boolean;
    get<T>(key: string): T;
    set<T>(key: string, object: T): void;
    tearDown(): void;
}
