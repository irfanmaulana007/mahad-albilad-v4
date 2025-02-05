import { ActivityTypeEnum } from '@prisma/client'

import prismaClient from '../libs/prismaClient'
import schemaBuilder from '../libs/schemaBuilder'

schemaBuilder.prismaObject('Article', {
  fields: (t) => ({
    id: t.exposeID('id', { nullable: false }),
    slug: t.exposeString('slug', { nullable: false }),
    title: t.exposeString('title', { nullable: false }),
    shortDescription: t.exposeString('shortDescription', { nullable: false }),
    content: t.exposeString('content', { nullable: false }),
    author: t.relation('author', { nullable: false }),
    thumbnail: t.exposeString('thumbnail', { nullable: false }),
    totalViews: t.field({
      type: 'Int',
      nullable: false,
      resolve: async (parent, _, context) => {
        const count = await prismaClient.activity.count({
          where: {
            articleId: parent.id,
            action: ActivityTypeEnum.VIEW_ARTICLE,
          },
        })
        return count
      },
    }),
    totalLikes: t.field({
      type: 'Int',
      nullable: false,
      resolve: async (parent, _, context) => {
        const count = await prismaClient.activity.count({
          where: {
            articleId: parent.id,
            action: ActivityTypeEnum.LIKE_ARTICLE,
          },
        })
        return count
      },
    }),
    totalShares: t.field({
      type: 'Int',
      nullable: false,
      resolve: async (parent, _, context) => {
        const count = await prismaClient.activity.count({
          where: { articleId: parent.id, action: ActivityTypeEnum.SHARE_ARTICLE },
        })
        return count
      },
    }),
    createdAt: t.expose('createdAt', {
      type: 'Timestamp',
      nullable: false,
    }),
  }),
})
