"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Neo4jResultMapper = void 0;
const GraphResultMapper_1 = require("./GraphResultMapper");
const neo4j = require('neo4j-driver');
class Neo4jResultMapper extends GraphResultMapper_1.GraphResultMapper {
    keys(record) {
        return record.keys;
    }
    itemAtIndex(record, index) {
        return record.get(index);
    }
    toNative(val) {
        if (val == undefined) {
            return val;
        }
        if (val instanceof neo4j.types.Node) {
            return this.toNative(val.properties);
        }
        if (val instanceof neo4j.types.Relationship) {
            return this.toNative(val.properties);
        }
        if (val instanceof neo4j.types.Point) {
            return val;
        }
        if (neo4j.isInt(val)) {
            return this.toNumberOrThrow(val);
        }
        if (Array.isArray(val)) {
            return val.map((a) => this.toNative(a));
        }
        if (this.isRecord(val)) {
            return this.toNative(this.recordToNative(val));
        }
        if (typeof val === 'object') {
            return this.mapObj(this.toNative.bind(this), val);
        }
        return val;
    }
    recordToNative(rec) {
        const out = {};
        rec.keys.forEach((key, index) => {
            out[key] = rec._fields[index];
        });
        return out;
    }
    isRecord(obj) {
        return typeof obj._fields !== 'undefined' && typeof obj.keys !== 'undefined';
    }
    mapObj(fn, obj) {
        const out = {};
        Object.keys(obj).forEach((key) => {
            out[key] = fn(obj[key]);
        });
        return out;
    }
    toNumberOrThrow(val) {
        if (val.inSafeRange()) {
            return val.toNumber();
        }
        throw new Error(`${val} is not in safe range to convert to number`);
    }
}
exports.Neo4jResultMapper = Neo4jResultMapper;
//# sourceMappingURL=Neo4jResultMapper.js.map