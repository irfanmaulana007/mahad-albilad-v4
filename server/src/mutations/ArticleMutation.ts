import schemaBuilder from '../libs/schemaBuilder'

schemaBuilder.mutationField('createArticle', (t) =>
  t.prismaField({
    type: 'Article',
    authScopes: {
      authenticated: true,
    },
    args: {
      title: t.arg.string({ required: true }),
      content: t.arg.string({ required: true }),
      shortDescription: t.arg.string({ required: true }),
      thumbnail: t.arg.string({ required: true }),
    },
    resolve: async (query, root, args, ctx, info) => {
      return await ctx.ArticleService.createArticle(
        args.title,
        args.content,
        ctx.user?.id!,
        args.shortDescription,
        args.thumbnail,
      )
    },
  }),
)

schemaBuilder.mutationField('updateArticle', (t) =>
  t.prismaField({
    type: 'Article',
    authScopes: {
      authenticated: true,
    },
    args: {
      id: t.arg.id({ required: true }),
      title: t.arg.string({ required: true }),
      content: t.arg.string({ required: true }),
      shortDescription: t.arg.string({ required: true }),
      slug: t.arg.string({ required: true }),
      thumbnail: t.arg.string({ required: true }),
    },
    resolve: async (query, root, args, ctx, info) => {
      return await ctx.ArticleService.updateArticle(
        parseInt(args.id),
        args.title,
        args.content,
        ctx.user?.id!,
        args.slug,
        args.shortDescription,
        args.thumbnail,
      )
    },
  }),
)

schemaBuilder.mutationField('deleteArticle', (t) =>
  t.prismaField({
    type: 'Article',
    authScopes: {
      authenticated: true,
    },
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (query, root, args, ctx, info) => {
      return await ctx.ArticleService.deleteArticle(parseInt(args.id))
    },
  }),
)
