import { ResultPostProcessor } from './ResultPostProcessor';
export declare class MapPostProcessor implements ResultPostProcessor {
    readonly mapFunction: (result: any) => any;
    constructor(mapFunction: (result: any) => any);
    apply(results: any[]): any[];
}
