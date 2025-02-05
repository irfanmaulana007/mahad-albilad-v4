"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schemaBuilder_1 = __importDefault(require("../libs/schemaBuilder"));
schemaBuilder_1.default.mutationField('loginUser', (t) => t.field({
    type: 'AuthUserResult',
    args: {
        emailOrUsername: t.arg.string({
            required: true,
        }),
        password: t.arg.string({
            required: true,
        }),
    },
    authScopes: {
        anonymous: true,
    },
    resolve: async (parent, args, ctx) => {
        const { accessToken, refreshToken } = await ctx.AuthService.login(args.emailOrUsername, args.password);
        return {
            accessToken,
            refreshToken,
        };
    },
}));
schemaBuilder_1.default.mutationField('refreshTokenUser', (t) => t.field({
    type: 'AuthUserResult',
    args: {
        refreshToken: t.arg.string({
            required: true,
        }),
    },
    authScopes: {
        anonymous: true,
    },
    resolve: async (parent, args, ctx) => {
        const { accessToken, refreshToken } = await ctx.AuthService.refreshToken(args.refreshToken);
        return {
            accessToken,
            refreshToken,
        };
    },
}));
//# sourceMappingURL=AuthenticationMutation.js.map