import { Statement } from './Statement';
import { ResultPostProcessor } from '../mapper/ResultPostProcessor';
import { QueryLanguage } from './QueryLanguage';
export declare type ClassType<T> = new (...args: any[]) => T;
export declare class QuerySpecification<T> {
    statement: Statement;
    parameters: any[];
    postProcessors: ResultPostProcessor[];
    _skip: number;
    _limit: number;
    static withStatement<T>(statement?: string | Statement): QuerySpecification<T>;
    constructor(statement?: string | Statement);
    withStatement(statement: string | Statement): this;
    bind(parameters?: any[] | any): this;
    addPostProcessors(...postProcessors: ResultPostProcessor[]): this;
    map(mapper: (result: any) => T): this;
    transform(type: ClassType<T>): this;
    filter(filter: (results: any) => boolean): this;
    skip(results: number): this;
    limit(results: number): this;
    finalizedCopy(language: QueryLanguage): QuerySpecification<T>;
}
