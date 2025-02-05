"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schemaBuilder_1 = __importDefault(require("../libs/schemaBuilder"));
schemaBuilder_1.default.mutationField('createArticle', (t) => t.prismaField({
    type: 'Article',
    authScopes: {
        authenticated: true,
    },
    args: {
        title: t.arg.string({ required: true }),
        content: t.arg.string({ required: true }),
        shortDescription: t.arg.string({ required: true }),
        thumbnail: t.arg.string({ required: true }),
    },
    resolve: async (query, root, args, ctx, info) => {
        var _a;
        return await ctx.ArticleService.createArticle(args.title, args.content, (_a = ctx.user) === null || _a === void 0 ? void 0 : _a.id, args.shortDescription, args.thumbnail);
    },
}));
schemaBuilder_1.default.mutationField('updateArticle', (t) => t.prismaField({
    type: 'Article',
    authScopes: {
        authenticated: true,
    },
    args: {
        id: t.arg.id({ required: true }),
        title: t.arg.string({ required: true }),
        content: t.arg.string({ required: true }),
        shortDescription: t.arg.string({ required: true }),
        slug: t.arg.string({ required: true }),
        thumbnail: t.arg.string({ required: true }),
    },
    resolve: async (query, root, args, ctx, info) => {
        var _a;
        return await ctx.ArticleService.updateArticle(parseInt(args.id), args.title, args.content, (_a = ctx.user) === null || _a === void 0 ? void 0 : _a.id, args.slug, args.shortDescription, args.thumbnail);
    },
}));
schemaBuilder_1.default.mutationField('deleteArticle', (t) => t.prismaField({
    type: 'Article',
    authScopes: {
        authenticated: true,
    },
    args: {
        id: t.arg.id({ required: true }),
    },
    resolve: async (query, root, args, ctx, info) => {
        return await ctx.ArticleService.deleteArticle(parseInt(args.id));
    },
}));
//# sourceMappingURL=ArticleMutation.js.map