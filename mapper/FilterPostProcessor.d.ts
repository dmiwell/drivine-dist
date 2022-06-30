import { ResultPostProcessor } from './ResultPostProcessor';
export declare class FilterPostProcessor implements ResultPostProcessor {
    readonly filterFunction: (result: any) => boolean;
    constructor(filterFunction: (result: any) => boolean);
    apply(results: any[]): any[];
}
