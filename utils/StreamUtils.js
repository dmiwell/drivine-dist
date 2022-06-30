"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamUtils = void 0;
class StreamUtils {
    static async untilClosed(stream) {
        return new Promise((resolve, reject) => {
            stream.on('close', () => {
                resolve();
            });
            stream.on('error', (e) => {
                reject(e);
            });
        });
    }
}
exports.StreamUtils = StreamUtils;
//# sourceMappingURL=StreamUtils.js.map