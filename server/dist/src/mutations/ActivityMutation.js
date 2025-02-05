"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const schemaBuilder_1 = __importDefault(require("../libs/schemaBuilder"));
schemaBuilder_1.default.mutationField('createActivity', (t) => t.prismaField({
    type: 'Activity',
    args: {
        articleId: t.arg.id({ required: true }),
        action: t.arg({
            type: client_1.ActivityTypeEnum,
            required: true,
        }),
    },
    resolve: async (query, root, args, ctx, info) => {
        return await ctx.ActivityService.createActivity(parseInt(args.articleId), args.action);
    },
}));
//# sourceMappingURL=ActivityMutation.js.map