import { GraphResultMapper } from './GraphResultMapper';
export declare class AgensGraphResultMapper extends GraphResultMapper {
    keys(record: any): string[];
    itemAtIndex(record: any, index: number): any;
    toNative(val: any): any;
}
