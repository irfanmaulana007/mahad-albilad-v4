import schemaBuilder from '../libs/schemaBuilder'

schemaBuilder.objectType('ActivityMetrics', {
  fields: (t) => ({
    views: t.int({
      nullable: false,
      resolve: (parent) => parent.views ?? 0,
    }),
    likes: t.int({
      nullable: false,
      resolve: (parent) => parent.likes ?? 0,
    }),
    shares: t.int({
      nullable: false,
      resolve: (parent) => parent.shares ?? 0,
    }),
  }),
})

schemaBuilder.objectType('ActivityDataset', {
  fields: (t) => ({
    date: t.exposeString('date', { nullable: false }),
    metrics: t.field({
      type: 'ActivityMetrics',
      resolve: (parent) => parent.metrics,
    }),
  }),
})

schemaBuilder.objectType('ArticleAnalyticsResult', {
  fields: (t) => ({
    article: t.field({
      type: 'ArticleAnalytics',
      nullable: false,
      resolve: (parent) => parent.article,
    }),
    dataset: t.field({
      type: ['ActivityDataset'],
      nullable: false,
      resolve: (parent) => parent.dataset,
    }),
  }),
})

schemaBuilder.objectType('ArticleAnalytics', {
  fields: (t) => ({
    id: t.exposeID('id', { nullable: false }),
    title: t.exposeString('title', { nullable: false }),
    slug: t.exposeString('slug', { nullable: false }),
  }),
})

schemaBuilder.objectType('AnalyticsOverview', {
  fields: (t) => ({
    totalViews: t.int({
      nullable: false,
      resolve: (parent) => parent.totalViews ?? 0,
    }),
    totalLikes: t.int({
      nullable: false,
      resolve: (parent) => parent.totalLikes ?? 0,
    }),
    totalShares: t.int({
      nullable: false,
      resolve: (parent) => parent.totalShares ?? 0,
    }),
  }),
})
