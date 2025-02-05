"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const schemaBuilder_1 = __importDefault(require("../libs/schemaBuilder"));
schemaBuilder_1.default.enumType(client_1.ActivityTypeEnum, { name: 'ActivityType' });
//# sourceMappingURL=ActivityTypeEnum.js.map