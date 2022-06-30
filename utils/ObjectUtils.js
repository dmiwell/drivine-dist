"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectUtils = void 0;
const class_transformer_1 = require("class-transformer");
class ObjectUtils {
}
exports.ObjectUtils = ObjectUtils;
ObjectUtils.primitiveProps = (object, options = { classToPlain: true }) => {
    const props = {};
    if (object) {
        const source = options.classToPlain ? (0, class_transformer_1.classToPlain)(object) : object;
        const strings = Object.keys(source);
        strings.forEach((key) => {
            const candidate = source[key];
            if (candidate != undefined &&
                candidate.constructor === Array &&
                candidate.filter((it) => typeof it === 'object').length === 0) {
                props[key] = candidate;
            }
            else if (candidate != undefined && typeof candidate !== 'object') {
                props[key] = candidate;
            }
        });
    }
    return props;
};
//# sourceMappingURL=ObjectUtils.js.map