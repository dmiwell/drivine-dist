import { ResultMapper } from './ResultMapper';
import { QuerySpecification } from '../query';
export declare class AgensRowResultMapper implements ResultMapper {
    mapQueryResults<T>(results: any[], spec: QuerySpecification<T>): T[];
}
