"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schemaBuilder_1 = __importDefault(require("../libs/schemaBuilder"));
schemaBuilder_1.default.objectType('MediaUploadResult', {
    fields: (t) => ({
        status: t.exposeString('status', { nullable: false }),
        url: t.exposeString('url', { nullable: false }),
    }),
});
//# sourceMappingURL=MediaSchema.js.map