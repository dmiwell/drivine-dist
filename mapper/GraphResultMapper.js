"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphResultMapper = void 0;
class GraphResultMapper {
    mapQueryResults(records, spec) {
        let results = this.mapToNative(records);
        spec.postProcessors.forEach((processor) => {
            results = processor.apply(results);
        });
        return results;
    }
    mapToNative(records) {
        const data = new Array(records.length);
        for (let i = 0; i < records.length; i++) {
            const record = records[i];
            const keys = this.keys(record);
            let item;
            if (keys.length === 1) {
                item = this.toNative(this.itemAtIndex(record, 0));
            }
            else {
                const length = this.keys(record).length;
                item = new Array(length);
                for (let j = 0; j < length; j++) {
                    item[j] = this.toNative(this.itemAtIndex(record, j));
                }
            }
            data[i] = item;
        }
        return data;
    }
}
exports.GraphResultMapper = GraphResultMapper;
//# sourceMappingURL=GraphResultMapper.js.map