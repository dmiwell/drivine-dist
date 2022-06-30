"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgensGraphResultMapper = void 0;
const GraphResultMapper_1 = require("./GraphResultMapper");
class AgensGraphResultMapper extends GraphResultMapper_1.GraphResultMapper {
    keys(record) {
        return Object.keys(record);
    }
    itemAtIndex(record, index) {
        return record[this.keys(record)[index]];
    }
    toNative(val) {
        if (val == undefined) {
            return val;
        }
        else if ((val.constructor && val.constructor.name === 'Vertex') || val.constructor.name === 'Edge') {
            return val.props;
        }
        return val;
    }
}
exports.AgensGraphResultMapper = AgensGraphResultMapper;
//# sourceMappingURL=AgensGraphResultMapper.js.map