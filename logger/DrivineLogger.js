"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrivineLogger = void 0;
const LogLevel_1 = require("./LogLevel");
const LogMessage_1 = require("./LogMessage");
class DrivineLogger {
    constructor(context) {
        this.context = context;
        this.enabledLevel = LogLevel_1.LogLevel.from(process.env.DRIVINE_LOG_LEVEL);
    }
    error(message, trace, context) {
        this.printMessage(message, LogLevel_1.LogLevel.ERROR, context || this.context);
        this.printStackTrace(trace);
    }
    fatal(message, error) {
        this.error(message, error ? error.stack : new Error().stack);
    }
    log(message, context) {
        this.printMessage(message, LogLevel_1.LogLevel.INFO, context || this.context);
    }
    warn(message, context) {
        this.printMessage(message, LogLevel_1.LogLevel.WARN, context || this.context);
    }
    debug(message, context) {
        this.printMessage(message, LogLevel_1.LogLevel.DEBUG, context || this.context);
    }
    verbose(message, context) {
        this.printMessage(message, LogLevel_1.LogLevel.VERBOSE, context || this.context);
    }
    printMessage(message, level, context = '') {
        if (level.value >= this.enabledLevel.value) {
            const logMessage = new LogMessage_1.LogMessage(level, new Date(), message, context);
            logMessage.write(process.stdout);
        }
    }
    printStackTrace(trace) {
        if (!trace) {
            return;
        }
        process.stdout.write(trace);
        process.stdout.write(`\n`);
    }
}
exports.DrivineLogger = DrivineLogger;
//# sourceMappingURL=DrivineLogger.js.map