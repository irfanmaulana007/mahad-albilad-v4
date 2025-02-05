"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schemaBuilder_1 = __importDefault(require("../libs/schemaBuilder"));
schemaBuilder_1.default.objectType('ActivityMetrics', {
    fields: (t) => ({
        views: t.int({
            nullable: false,
            resolve: (parent) => { var _a; return (_a = parent.views) !== null && _a !== void 0 ? _a : 0; },
        }),
        likes: t.int({
            nullable: false,
            resolve: (parent) => { var _a; return (_a = parent.likes) !== null && _a !== void 0 ? _a : 0; },
        }),
        shares: t.int({
            nullable: false,
            resolve: (parent) => { var _a; return (_a = parent.shares) !== null && _a !== void 0 ? _a : 0; },
        }),
    }),
});
schemaBuilder_1.default.objectType('ActivityDataset', {
    fields: (t) => ({
        date: t.exposeString('date', { nullable: false }),
        metrics: t.field({
            type: 'ActivityMetrics',
            resolve: (parent) => parent.metrics,
        }),
    }),
});
schemaBuilder_1.default.objectType('ArticleAnalyticsResult', {
    fields: (t) => ({
        article: t.field({
            type: 'ArticleAnalytics',
            nullable: false,
            resolve: (parent) => parent.article,
        }),
        dataset: t.field({
            type: ['ActivityDataset'],
            nullable: false,
            resolve: (parent) => parent.dataset,
        }),
    }),
});
schemaBuilder_1.default.objectType('ArticleAnalytics', {
    fields: (t) => ({
        id: t.exposeID('id', { nullable: false }),
        title: t.exposeString('title', { nullable: false }),
        slug: t.exposeString('slug', { nullable: false }),
    }),
});
schemaBuilder_1.default.objectType('AnalyticsOverview', {
    fields: (t) => ({
        totalViews: t.int({
            nullable: false,
            resolve: (parent) => { var _a; return (_a = parent.totalViews) !== null && _a !== void 0 ? _a : 0; },
        }),
        totalLikes: t.int({
            nullable: false,
            resolve: (parent) => { var _a; return (_a = parent.totalLikes) !== null && _a !== void 0 ? _a : 0; },
        }),
        totalShares: t.int({
            nullable: false,
            resolve: (parent) => { var _a; return (_a = parent.totalShares) !== null && _a !== void 0 ? _a : 0; },
        }),
    }),
});
//# sourceMappingURL=ArticleAnalyticsSchema.js.map