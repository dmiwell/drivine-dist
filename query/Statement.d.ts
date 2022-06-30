import { QueryLanguage } from './QueryLanguage';
export interface Statement {
    text: string;
    language: QueryLanguage;
}
export interface CypherStatement extends Statement {
    text: string;
    language: 'CYPHER';
}
export declare const cypherStatement: (text: string) => CypherStatement;
export interface SqlStatement extends Statement {
    text: string;
    language: 'SQL';
}
export declare const sqlStatement: (text: string) => SqlStatement;
export declare const toPlatformDefault: (language: QueryLanguage, statement: Statement) => Statement;
