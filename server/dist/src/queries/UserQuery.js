"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schemaBuilder_1 = __importDefault(require("../libs/schemaBuilder"));
schemaBuilder_1.default.queryField('userInfo', (t) => t.prismaField({
    type: 'User',
    nullable: true,
    authScopes: {
        authenticated: true,
    },
    resolve: async (query, root, args, ctx, info) => {
        if (!ctx.user)
            return null;
        const user = await ctx.UserService.getUserById(ctx.user.id);
        return user;
    },
}));
schemaBuilder_1.default.queryField('users', (t) => t.prismaField({
    type: ['User'],
    authScopes: {
        authenticated: true,
    },
    resolve: async (query, root, args, ctx, info) => {
        const users = await ctx.UserService.getUsers();
        return users;
    },
}));
schemaBuilder_1.default.queryField('findUserById', (t) => t.prismaField({
    type: 'User',
    nullable: true,
    args: {
        userId: t.arg.id({ required: true }),
    },
    authScopes: {
        authenticated: true,
    },
    resolve: async (query, root, args, ctx, info) => {
        const user = await ctx.UserService.getUserById(parseInt(args.userId));
        return user;
    },
}));
//# sourceMappingURL=UserQuery.js.map