import schemaBuilder from '../libs/schemaBuilder'

schemaBuilder.queryField('userInfo', (t) =>
  t.prismaField({
    type: 'User',
    nullable: true,
    authScopes: {
      authenticated: true,
    },
    resolve: async (query, root, args, ctx, info) => {
      if (!ctx.user) return null
      const user = await ctx.UserService.getUserById(ctx.user.id)

      return user
    },
  }),
)

schemaBuilder.queryField('users', (t) =>
  t.prismaField({
    type: ['User'],
    authScopes: {
      authenticated: true,
    },
    resolve: async (query, root, args, ctx, info) => {
      const users = await ctx.UserService.getUsers()

      return users
    },
  }),
)

schemaBuilder.queryField('findUserById', (t) =>
  t.prismaField({
    type: 'User',
    nullable: true,
    args: {
      userId: t.arg.id({ required: true }),
    },
    authScopes: {
      authenticated: true,
    },
    resolve: async (query, root, args, ctx, info) => {
      const user = await ctx.UserService.getUserById(parseInt(args.userId))

      return user
    },
  }),
)
