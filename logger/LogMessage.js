"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogMessage = void 0;
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
require('source-map-support').install({
    environment: 'node'
});
class LogMessage {
    constructor(level, time, message, context) {
        this.level = level;
        this.time = time;
        this.message = message;
        this.context = context;
    }
    write(stream) {
        stream.write(this.toConsole());
    }
    toConsole() {
        let messageText;
        if ((0, shared_utils_1.isObject)(this.message)) {
            messageText = this.level.color(JSON.stringify(this.message, undefined, 2));
        }
        else {
            messageText = this.level.color(this.message);
        }
        let text = this.level.color(`[${this.level.consoleString}] [${this.time.toISOString()}] `);
        if (this.context) {
            text += this.level.color(`[${this.context}] `);
        }
        text += this.level.color(`${messageText}\n`);
        return text;
    }
}
exports.LogMessage = LogMessage;
//# sourceMappingURL=LogMessage.js.map