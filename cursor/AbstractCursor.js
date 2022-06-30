"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractCursor = void 0;
const assert = require("assert");
const StatementLogger_1 = require("../logger/StatementLogger");
const logger_1 = require("../logger");
const miss = require('mississippi');
class AbstractCursor {
    constructor(sessionId, spec) {
        this.sessionId = sessionId;
        this.spec = spec;
        this.logger = new logger_1.DrivineLogger(AbstractCursor.name);
        this.currentBatch = [];
        this.currentIndex = 0;
        this.stream = undefined;
        assert(this.spec.batch > 0, `batchSize must be more than zero`);
        this.logger.verbose(`Created cursor with batchSize: ${this.spec.batch}`);
        this.queryLogger = new StatementLogger_1.StatementLogger(this.sessionId);
    }
    [Symbol.asyncIterator]() {
        return {
            next: async () => {
                await this.readBatchIfExpired();
                const done = this.currentBatch.length <= this.currentIndex;
                const value = done ? undefined : this.currentBatch[this.currentIndex];
                this.currentIndex++;
                return {
                    value: value,
                    done: done
                };
            }
        };
    }
    asStream(options) {
        if (!this.stream) {
            this.stream = this.composeStreamWithOptions(options);
        }
        return this.stream;
    }
    composeStreamWithOptions(options) {
        const readable = miss.from({ objectMode: true }, async (size, next) => {
            await this.readBatchIfExpired();
            const done = this.currentBatch.length <= this.currentIndex;
            if (done) {
                return next(null, null);
            }
            return next(null, this.currentBatch[this.currentIndex++]);
        });
        return options && options.transform
            ? miss.pipeline.obj(readable, this.transformStream(options.transform))
            : readable;
    }
    transformStream(transform) {
        return miss.through.obj((chunk, enc, cb) => cb(null, transform(chunk)));
    }
    async readBatchIfExpired() {
        if (this.currentIndex === this.currentBatch.length) {
            this.currentBatch = await this.read(this.spec.batch);
            this.currentIndex = 0;
        }
    }
}
exports.AbstractCursor = AbstractCursor;
//# sourceMappingURL=AbstractCursor.js.map