import { QuerySpecification } from '../query/QuerySpecification';
import { QueryLanguage } from '../query';
export declare class CursorSpecification<T> extends QuerySpecification<T> {
    batch: number;
    batchSize(size: number): this;
    finalizedCopy(language: QueryLanguage): CursorSpecification<T>;
}
