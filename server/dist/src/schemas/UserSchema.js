"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schemaBuilder_1 = __importDefault(require("../libs/schemaBuilder"));
schemaBuilder_1.default.prismaObject('User', {
    fields: (t) => ({
        id: t.exposeID('id', { nullable: false }),
        email: t.exposeString('email', { nullable: false }),
        name: t.exposeString('name', { nullable: false }),
        username: t.exposeString('username', { nullable: false }),
        articles: t.relation('articles', { nullable: false }),
    }),
});
//# sourceMappingURL=UserSchema.js.map