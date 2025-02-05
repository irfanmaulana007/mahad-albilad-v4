"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schemaBuilder_1 = __importDefault(require("../libs/schemaBuilder"));
schemaBuilder_1.default.objectType('AuthUserResult', {
    fields: (t) => ({
        accessToken: t.exposeString('accessToken'),
        refreshToken: t.exposeString('refreshToken'),
    }),
});
//# sourceMappingURL=AuthUserResultSchema.js.map