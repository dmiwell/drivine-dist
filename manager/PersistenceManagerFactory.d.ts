import { NonTransactionalPersistenceManager } from './NonTransactionalPersistenceManager';
import { TransactionalPersistenceManager } from './TransactionalPersistenceManager';
import { PersistenceManager } from './PersistenceManager';
import { DatabaseRegistry } from '../connection/DatabaseRegistry';
import { TransactionContextHolder } from '../transaction/TransactonContextHolder';
import { PersistenceManagerType } from './PersistenceManagerType';
import { DelegatingPersistenceManager } from './DelegatingPersistenceManager';
interface PersistenceManagerEntry {
    transactional: TransactionalPersistenceManager;
    nonTransactional: NonTransactionalPersistenceManager;
    delegating: DelegatingPersistenceManager;
}
export declare class PersistenceManagerFactory {
    readonly registry: DatabaseRegistry;
    readonly contextHolder: TransactionContextHolder;
    readonly managers: Map<string, PersistenceManagerEntry>;
    constructor(registry: DatabaseRegistry, contextHolder: TransactionContextHolder);
    get(database?: string, type?: PersistenceManagerType): PersistenceManager;
    private register;
}
export {};
