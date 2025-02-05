import { ActivityTypeEnum } from '@prisma/client'

import schemaBuilder from '../libs/schemaBuilder'

schemaBuilder.prismaObject('Activity', {
  fields: (t) => ({
    id: t.exposeID('id', { nullable: false }),
    articleId: t.exposeID('articleId', { nullable: false }),
    action: t.field({
      type: ActivityTypeEnum,
      nullable: false,
      resolve: (parent) => parent.action as ActivityTypeEnum,
    }),
    createdAt: t.expose('createdAt', {
      type: 'Timestamp',
      nullable: false,
    }),
  }),
})
