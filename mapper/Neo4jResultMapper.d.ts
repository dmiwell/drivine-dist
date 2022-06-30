import { GraphResultMapper } from './GraphResultMapper';
export declare class Neo4jResultMapper extends GraphResultMapper {
    keys(record: any): string[];
    itemAtIndex(record: any, index: number): any;
    toNative(val: any): any;
    private recordToNative;
    private isRecord;
    private mapObj;
    private toNumberOrThrow;
}
