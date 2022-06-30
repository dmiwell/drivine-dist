import { Provider } from '@nestjs/common';
import { DrivineModuleOptions } from './DrivineModule';
export declare class DrivineModuleBuilder {
    readonly options: DrivineModuleOptions;
    private logger;
    private _providers;
    constructor(options: DrivineModuleOptions);
    get providers(): Provider[];
    infrastructureProviders(): Provider[];
    persistenceManagers(): Provider[];
    fileResourceProviders(): Provider[];
    cypherStatementProviders(): Provider[];
    sqlStatementProviders(): Provider[];
    private fileContents;
}
