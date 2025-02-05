import { ActivityTypeEnum } from '@prisma/client'

import schemaBuilder from '../libs/schemaBuilder'

schemaBuilder.queryField('getArticleAnalyticsByDate', (t) =>
  t.field({
    type: ['ArticleAnalyticsResult'],
    args: {
      startDate: t.arg.string({ required: true }),
      endDate: t.arg.string({ required: true }),
      dimension: t.arg({
        type: ActivityTypeEnum,
        required: true,
      }),
    },
    resolve: async (query, args, ctx, info) => {
      const startDateTime = new Date(args.startDate);
      startDateTime.setHours(0, 0, 0, 0);
      
      const endDateTime = new Date(args.endDate);
      endDateTime.setHours(23, 59, 59, 999);
      
      const articles = await ctx.ActivityService.getArticleAnalyticsByDate(
        startDateTime,
        endDateTime,
        args.dimension,
      )

      return articles
    },
  }),
)

schemaBuilder.queryField('getAnalyticsOverview', (t) =>
  t.field({
    type: 'AnalyticsOverview',
    args: {
      startDate: t.arg.string({ required: true }),
      endDate: t.arg.string({ required: true }),
    },
    resolve: async (query, args, ctx, info) => {
      const startDateTime = new Date(args.startDate);
      startDateTime.setHours(0, 0, 0, 0);
      
      const endDateTime = new Date(args.endDate);
      endDateTime.setHours(23, 59, 59, 999);
      
      return ctx.ActivityService.getAnalyticsOverview(
        startDateTime,
        endDateTime,
      )
    },
  }),
)
