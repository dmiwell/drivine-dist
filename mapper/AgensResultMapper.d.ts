import { ResultMapper } from './ResultMapper';
import { QuerySpecification } from '../query/QuerySpecification';
export declare class AgensResultMapper implements ResultMapper {
    private readonly graphMapper;
    private readonly rowMapper;
    mapQueryResults<T>(results: any[], spec: QuerySpecification<T>): T[];
}
