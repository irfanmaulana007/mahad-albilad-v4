"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prismaClient_1 = __importDefault(require("../libs/prismaClient"));
const schemaBuilder_1 = __importDefault(require("../libs/schemaBuilder"));
schemaBuilder_1.default.prismaObject('Article', {
    fields: (t) => ({
        id: t.exposeID('id', { nullable: false }),
        slug: t.exposeString('slug', { nullable: false }),
        title: t.exposeString('title', { nullable: false }),
        shortDescription: t.exposeString('shortDescription', { nullable: false }),
        content: t.exposeString('content', { nullable: false }),
        author: t.relation('author', { nullable: false }),
        thumbnail: t.exposeString('thumbnail', { nullable: false }),
        totalViews: t.field({
            type: 'Int',
            nullable: false,
            resolve: async (parent, _, context) => {
                const count = await prismaClient_1.default.activity.count({
                    where: {
                        articleId: parent.id,
                        action: client_1.ActivityTypeEnum.VIEW_ARTICLE,
                    },
                });
                return count;
            },
        }),
        totalLikes: t.field({
            type: 'Int',
            nullable: false,
            resolve: async (parent, _, context) => {
                const count = await prismaClient_1.default.activity.count({
                    where: {
                        articleId: parent.id,
                        action: client_1.ActivityTypeEnum.LIKE_ARTICLE,
                    },
                });
                return count;
            },
        }),
        totalShares: t.field({
            type: 'Int',
            nullable: false,
            resolve: async (parent, _, context) => {
                const count = await prismaClient_1.default.activity.count({
                    where: { articleId: parent.id, action: client_1.ActivityTypeEnum.SHARE_ARTICLE },
                });
                return count;
            },
        }),
        createdAt: t.expose('createdAt', {
            type: 'Timestamp',
            nullable: false,
        }),
    }),
});
//# sourceMappingURL=ArticleSchema.js.map