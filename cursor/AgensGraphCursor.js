"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgensGraphCursor = void 0;
const AbstractCursor_1 = require("./AbstractCursor");
class AgensGraphCursor extends AbstractCursor_1.AbstractCursor {
    constructor(sessionId, spec, pgCursor, resultMapper) {
        super(sessionId, spec);
        this.pgCursor = pgCursor;
        this.resultMapper = resultMapper;
    }
    async read(count) {
        this.logger.verbose(`Reading a batch of: ${count}`);
        return new Promise((resolve, reject) => {
            const hrStart = process.hrtime();
            this.pgCursor.read(count, (err, results) => {
                this.queryLogger.log(this.spec, hrStart);
                if (err) {
                    reject(err);
                }
                else {
                    resolve(this.resultMapper.mapQueryResults(results, this.spec));
                }
            });
        });
    }
    async close() {
        return new Promise((resolve) => {
            this.pgCursor.close(() => {
                resolve();
            });
        });
    }
}
exports.AgensGraphCursor = AgensGraphCursor;
//# sourceMappingURL=AgensGraphCursor.js.map