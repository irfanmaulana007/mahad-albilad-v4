"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const schemaBuilder_1 = __importDefault(require("../libs/schemaBuilder"));
schemaBuilder_1.default.queryField('getArticleAnalyticsByDate', (t) => t.field({
    type: ['ArticleAnalyticsResult'],
    args: {
        startDate: t.arg.string({ required: true }),
        endDate: t.arg.string({ required: true }),
        dimension: t.arg({
            type: client_1.ActivityTypeEnum,
            required: true,
        }),
    },
    resolve: async (query, args, ctx, info) => {
        const startDateTime = new Date(args.startDate);
        startDateTime.setHours(0, 0, 0, 0);
        const endDateTime = new Date(args.endDate);
        endDateTime.setHours(23, 59, 59, 999);
        const articles = await ctx.ActivityService.getArticleAnalyticsByDate(startDateTime, endDateTime, args.dimension);
        return articles;
    },
}));
schemaBuilder_1.default.queryField('getAnalyticsOverview', (t) => t.field({
    type: 'AnalyticsOverview',
    args: {
        startDate: t.arg.string({ required: true }),
        endDate: t.arg.string({ required: true }),
    },
    resolve: async (query, args, ctx, info) => {
        const startDateTime = new Date(args.startDate);
        startDateTime.setHours(0, 0, 0, 0);
        const endDateTime = new Date(args.endDate);
        endDateTime.setHours(23, 59, 59, 999);
        return ctx.ActivityService.getAnalyticsOverview(startDateTime, endDateTime);
    },
}));
//# sourceMappingURL=ActivityQuery.js.map