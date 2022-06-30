"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformPostProcessor = void 0;
const class_transformer_1 = require("class-transformer");
class TransformPostProcessor {
    constructor(type) {
        this.type = type;
    }
    apply(results) {
        return (0, class_transformer_1.plainToClass)(this.type, results);
    }
}
exports.TransformPostProcessor = TransformPostProcessor;
//# sourceMappingURL=TransformPostProcessor.js.map