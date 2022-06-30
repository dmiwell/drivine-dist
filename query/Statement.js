"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPlatformDefault = exports.sqlStatement = exports.cypherStatement = void 0;
const cypherStatement = (text) => ({ text: text, language: 'CYPHER' });
exports.cypherStatement = cypherStatement;
const sqlStatement = (text) => ({ text: text, language: 'SQL' });
exports.sqlStatement = sqlStatement;
const toPlatformDefault = (language, statement) => ({
    text: statement.text,
    language: statement.language == 'PLATFORM_DEFAULT' ? language : statement.language
});
exports.toPlatformDefault = toPlatformDefault;
//# sourceMappingURL=Statement.js.map