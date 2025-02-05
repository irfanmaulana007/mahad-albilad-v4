"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const schemaBuilder_1 = __importDefault(require("../libs/schemaBuilder"));
schemaBuilder_1.default.prismaObject('Activity', {
    fields: (t) => ({
        id: t.exposeID('id', { nullable: false }),
        articleId: t.exposeID('articleId', { nullable: false }),
        action: t.field({
            type: client_1.ActivityTypeEnum,
            nullable: false,
            resolve: (parent) => parent.action,
        }),
        createdAt: t.expose('createdAt', {
            type: 'Timestamp',
            nullable: false,
        }),
    }),
});
//# sourceMappingURL=ActivitySchema.js.map