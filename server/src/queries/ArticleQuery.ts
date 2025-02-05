import schemaBuilder from '../libs/schemaBuilder'

schemaBuilder.queryField('articles', (t) =>
  t.prismaField({
    type: ['Article'],
    resolve: async (query, root, args, ctx, info) => {
      const articles = await ctx.ArticleService.getArticles()

      return articles
    },
  }),
)

schemaBuilder.queryField('findArticleById', (t) =>
  t.prismaField({
    type: 'Article',
    nullable: true,
    args: {
      articleId: t.arg.id({ required: true }),
    },
    authScopes: {
      authenticated: true,
    },
    resolve: async (query, root, args, ctx, info) => {
      const article = await ctx.ArticleService.getArticleById(parseInt(args.articleId))

      return article
    },
  }),
)

schemaBuilder.queryField('findArticleBySlug', (t) =>
  t.prismaField({
    type: 'Article',
    nullable: true,
    args: {
      slug: t.arg.string({ required: true }),
    },
    resolve: async (query, root, args, ctx, info) => {
      const article = await ctx.ArticleService.getArticleBySlug(args.slug)

      return article
    },
  }),
)
