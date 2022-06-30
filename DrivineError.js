"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrivineError = void 0;
class DrivineError extends Error {
    constructor(message, rootCause, spec) {
        if (!message && rootCause && rootCause.message) {
            super(rootCause.message);
        }
        else {
            super(message);
        }
        this.rootCause = rootCause;
        this.spec = spec;
    }
    static withRootCause(cause, spec) {
        return new DrivineError(undefined, cause, spec);
    }
}
exports.DrivineError = DrivineError;
//# sourceMappingURL=DrivineError.js.map