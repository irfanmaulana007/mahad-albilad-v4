"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schemaBuilder_1 = __importDefault(require("../libs/schemaBuilder"));
schemaBuilder_1.default.queryField('articles', (t) => t.prismaField({
    type: ['Article'],
    resolve: async (query, root, args, ctx, info) => {
        const articles = await ctx.ArticleService.getArticles();
        return articles;
    },
}));
schemaBuilder_1.default.queryField('findArticleById', (t) => t.prismaField({
    type: 'Article',
    nullable: true,
    args: {
        articleId: t.arg.id({ required: true }),
    },
    authScopes: {
        authenticated: true,
    },
    resolve: async (query, root, args, ctx, info) => {
        const article = await ctx.ArticleService.getArticleById(parseInt(args.articleId));
        return article;
    },
}));
schemaBuilder_1.default.queryField('findArticleBySlug', (t) => t.prismaField({
    type: 'Article',
    nullable: true,
    args: {
        slug: t.arg.string({ required: true }),
    },
    resolve: async (query, root, args, ctx, info) => {
        const article = await ctx.ArticleService.getArticleBySlug(args.slug);
        return article;
    },
}));
//# sourceMappingURL=ArticleQuery.js.map