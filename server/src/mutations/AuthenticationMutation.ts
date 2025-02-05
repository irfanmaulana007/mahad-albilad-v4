import schemaBuilder from '../libs/schemaBuilder'

schemaBuilder.mutationField('loginUser', (t) =>
  t.field({
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
      const { accessToken, refreshToken } = await ctx.AuthService.login(
        args.emailOrUsername,
        args.password,
      )

      return {
        accessToken,
        refreshToken,
      }
    },
  }),
)

schemaBuilder.mutationField('refreshTokenUser', (t) =>
  t.field({
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
      const { accessToken, refreshToken } = await ctx.AuthService.refreshToken(args.refreshToken)

      return {
        accessToken,
        refreshToken,
      }
    },
  }),
)
