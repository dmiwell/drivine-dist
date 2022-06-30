import { ResultPostProcessor } from './ResultPostProcessor';
import { ClassType } from '../query';
export declare class TransformPostProcessor implements ResultPostProcessor {
    readonly type: ClassType<any>;
    constructor(type: ClassType<any>);
    apply(results: any[]): any[];
}
