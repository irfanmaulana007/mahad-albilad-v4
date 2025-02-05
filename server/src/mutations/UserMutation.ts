import schemaBuilder from '../libs/schemaBuilder'

schemaBuilder.mutationField('createUser', (t) =>
  t.prismaField({
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
      return await ctx.UserService.createUser(args.name, args.email, args.username, args.password)
    },
  }),
)

schemaBuilder.mutationField('updateUser', (t) =>
  t.prismaField({
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
      return await ctx.UserService.updateUser(
        parseInt(args.id),
        args.name,
        args.email,
        args.username,
        args.password,
      )
    },
  }),
)

schemaBuilder.mutationField('deleteUser', (t) =>
  t.prismaField({
    type: 'User',
    authScopes: {
      authenticated: true,
    },
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (query, root, args, ctx, info) => {
      return await ctx.UserService.deleteUser(parseInt(args.id))
    },
  }),
)
