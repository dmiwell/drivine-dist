"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogLevel = void 0;
const clc = require("cli-color");
const typescript_cacheable_1 = require("typescript-cacheable");
const assert = require("assert");
class LogLevel {
    constructor(key, value, consoleString, color) {
        this.key = key;
        this.value = value;
        this.consoleString = consoleString;
        this.color = color;
    }
    static from(name = 'ERROR') {
        assert(name, `Log level name is required`);
        const result = LogLevel[name];
        if (result) {
            return result;
        }
        throw new Error(`No LogLevel for key: ${name}`);
    }
}
LogLevel.VERBOSE = new LogLevel('VERBOSE', 0, 'VERBOSE', clc.cyanBright);
LogLevel.DEBUG = new LogLevel('DEBUG', 1, ' DEBUG ', clc.magentaBright);
LogLevel.INFO = new LogLevel('INFO', 2, ' INFO  ', clc.green);
LogLevel.WARN = new LogLevel('WARN', 4, ' WARN  ', clc.red);
LogLevel.ERROR = new LogLevel('ERROR', 8, ' ERROR ', clc.redBright);
LogLevel.NONE = new LogLevel('NONE', 9, '', clc.redBright);
__decorate([
    (0, typescript_cacheable_1.Cacheable)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", LogLevel)
], LogLevel, "from", null);
exports.LogLevel = LogLevel;
//# sourceMappingURL=LogLevel.js.map