"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServiceBase_1 = __importDefault(require("./ServiceBase"));
class PrismaService extends ServiceBase_1.default {
    constructor(prismaClient) {
        super();
        this.prismaClient = prismaClient;
    }
}
exports.default = PrismaService;
//# sourceMappingURL=PrismaService.js.map