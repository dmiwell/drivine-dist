import { QuerySpecification } from '../query';
import { ResultMapper } from './ResultMapper';
export declare abstract class GraphResultMapper implements ResultMapper {
    mapQueryResults<T>(records: any[], spec: QuerySpecification<T>): T[];
    private mapToNative;
    abstract keys(record: any): string[];
    abstract itemAtIndex(record: any, index: number): any;
    abstract toNative(val: any): any;
}
