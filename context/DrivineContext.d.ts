import { TransactionContextHolder } from '../transaction/TransactonContextHolder';
import { TransactionOptions } from '../transaction/Transactional';
import { DatabaseRegistry } from '../connection/DatabaseRegistry';
export declare function inDrivineContext(): DrivineContext;
export declare class DrivineContext {
    readonly contextHolder: TransactionContextHolder;
    readonly databaseRegistry: DatabaseRegistry;
    private transactionOptions?;
    constructor(contextHolder: TransactionContextHolder, databaseRegistry: DatabaseRegistry);
    withTransaction(options?: TransactionOptions): DrivineContext;
    run(fn: () => Promise<any>): Promise<any>;
}
