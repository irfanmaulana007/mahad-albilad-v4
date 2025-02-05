"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schemaBuilder_1 = __importDefault(require("../libs/schemaBuilder"));
schemaBuilder_1.default.mutationField('createUser', (t) => t.prismaField({
    type: 'User',
    authScopes: {
        authenticated: true,
    },
    args: {
        name: t.arg.string({ required: true }),
        email: t.arg.string({ required: true }),
        username: t.arg.string({ required: true }),
        password: t.arg.string({ required: true }),
    },
    resolve: async (query, root, args, ctx, info) => {
        return await ctx.UserService.createUser(args.name, args.email, args.username, args.password);
    },
}));
schemaBuilder_1.default.mutationField('updateUser', (t) => t.prismaField({
    type: 'User',
    authScopes: {
        authenticated: true,
    },
    args: {
        id: t.arg.id({ required: true }),
        name: t.arg.string({ required: true }),
        email: t.arg.string({ required: true }),
        username: t.arg.string({ required: true }),
        password: t.arg.string({ required: true }),
    },
    resolve: async (query, root, args, ctx, info) => {
        return await ctx.UserService.updateUser(parseInt(args.id), args.name, args.email, args.username, args.password);
    },
}));
schemaBuilder_1.default.mutationField('deleteUser', (t) => t.prismaField({
    type: 'User',
    authScopes: {
        authenticated: true,
    },
    args: {
        id: t.arg.id({ required: true }),
    },
    resolve: async (query, root, args, ctx, info) => {
        return await ctx.UserService.deleteUser(parseInt(args.id));
    },
}));
//# sourceMappingURL=UserMutation.js.map