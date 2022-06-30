import { NestMiddleware } from '@nestjs/common';
import { TransactionContextHolder } from './TransactonContextHolder';
import * as express from 'express';
import { DatabaseRegistry } from '../connection/DatabaseRegistry';
export declare class TransactionContextMiddleware implements NestMiddleware {
    readonly transactionContext: TransactionContextHolder;
    readonly databaseRegistry: DatabaseRegistry;
    constructor(transactionContext: TransactionContextHolder, databaseRegistry: DatabaseRegistry);
    use(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any>;
}
