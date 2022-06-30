import { Propagation } from './Propagation';
export interface TransactionOptions {
    rollback?: boolean;
    propagation?: Propagation;
}
export declare function Transactional(options?: TransactionOptions): MethodDecorator;
export declare type AsyncFunction = (...args: any[]) => Promise<any>;
export declare function runInTransaction(fn: AsyncFunction, transactionOptions?: TransactionOptions, args?: any[]): Promise<any>;
export declare function optionsWithDefaults(options: TransactionOptions | undefined): TransactionOptions;
