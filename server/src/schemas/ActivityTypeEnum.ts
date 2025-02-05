import { ActivityTypeEnum } from '@prisma/client'

import schemaBuilder from '../libs/schemaBuilder'

schemaBuilder.enumType(ActivityTypeEnum, { name: 'ActivityType' })
