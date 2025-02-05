import { ActivityTypeEnum } from '@prisma/client'

import schemaBuilder from '../libs/schemaBuilder'

schemaBuilder.mutationField('createActivity', (t) =>
  t.prismaField({
    type: 'Activity',
    args: {
      articleId: t.arg.id({ required: true }),
      action: t.arg({
        type: ActivityTypeEnum,
        required: true,
      }),
    },
    resolve: async (query, root, args, ctx, info) => {
      return await ctx.ActivityService.createActivity(parseInt(args.articleId), args.action)
    },
  }),
)
